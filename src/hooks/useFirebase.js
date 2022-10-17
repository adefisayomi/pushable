import { 
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword, 
    signOut, 
    getAdditionalUserInfo,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    deleteUser,
    updateProfile
} from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseErrors } from "../utils/firebaseErrors";
import useSettings from './useSettings'

// 

const app = initializeApp(process.env.firebaseConfig);
const auth = getAuth(app)

// 
async function googleAuthLogin (setAlert) {
    try {
        const currentUser = await auth.currentUser
        if(currentUser) throw new Error('You are already logged in!')
        // 
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        const res = await signInWithPopup(auth, provider)
        const user = res.user; 
        const { isNewUser } = getAdditionalUserInfo(res)
        // const credentials = GoogleAuthProvider.credentialFromResult(res)
        // const token = credentials.accessToken;
        
        if (isNewUser) {
            await deleteUser(user)
            throw new Error('Please create an account to continue.')
        }
        setAlert(`Logged in as ${user.displayName.split(" ")[0].toUpperCase()}`)
        return ({
            success: true,
            message: `users data`,
            data: user
        })
    }
    
  catch(error) {
    const errorCode = error.code
    setAlert(firebaseErrors[errorCode] || error.message, 'error')
    return errorMessage(error)
  }
}
// 
async function googleAuthSignup (setAlert) {
    try {
        const currentUser = await auth.currentUser
        if (currentUser) throw new Error(`Please logout to continue.`)
        // 
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        const res = await signInWithPopup(auth, provider)
        const user = res.user; 
        const { isNewUser } = getAdditionalUserInfo(res)
        // const credentials = GoogleAuthProvider.credentialFromResult(res)
        // const token = credentials.accessToken;
        if (!isNewUser) {
            await signOut(auth)
            throw new Error('This account already exist.')
        }
        setAlert(`${user.displayName} welcome to pushable!`)
        return ({
            success: true,
            message: `users data`,
            data: user
        })
    }
    
    catch(error) {
        const errorCode = error.code
        setAlert(firebaseErrors[errorCode] || error.message, 'error')
        return errorMessage(error)
      }
}

// <--Login With Email and Password -->
export async function loginWithEmailAndPassword ({email, password, setAlert}) {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        const user = res.user

        setAlert(`Logged in: ${user.displayName.split(" ")[0].toUpperCase()}`)
        return ({
            success: true,
            message: `Logged in as ${user.displayName}`,
            data: user
        })
    }
    catch(error) {
        const errorCode = error.code
        setAlert(firebaseErrors[errorCode] || error.message, 'error')
        return errorMessage(error)
      }
}

// <--Signup With Email and Password -->
export async function signupWithEmailAndPassword ({email, password, setAlert, fullName}) {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        let user = res.user
        await updateProfile(user, {displayName: fullName})

        setAlert(`${user.displayName.split(" ").shift()} welcome to pushable!`)
        return ({
            success: true,
            message: `Logged in as ${user.displayName}`,
            data: user
        })
    }
    catch(error) {
        const errorCode = error.code
        setAlert(firebaseErrors[errorCode] || error.message, 'error')
        return errorMessage(error)
      }
}

// <--Signout -->
const handleSignOut = async (setAlert) => {
    try {
        const user = await auth.currentUser
        if (user) {
            await signOut(auth)
            setAlert(`See you later ${user.displayName}!`)
            return ({
                success: true,
                message: `successfully signed out`,
                data: null
            })
        }
        
    }
    catch(error) {
        setAlert(error.message, 'error')
        return errorMessage(error)
    }
}

// <--Send reset Password Link -->
async function sendResetPasswordLink ({email, setAlert}) {
    try {
        await sendPasswordResetEmail(auth, email)
        setAlert(`Link sent to: ${email}`)
        return ({
            success: true,
            message: `Link sent to: ${email}`,
            data: null
        })
    }
    catch(error) {
        const errorCode = error.code
        setAlert(firebaseErrors[errorCode] || error.message, 'error')
        return errorMessage(error)
    }
}

export default function useFirebase () {

    const {setAlert} = useSettings()

    return {
        auth,
        signOut: () => handleSignOut(setAlert),
        googleAuthLogin: () => googleAuthLogin(setAlert),
        googleAuthSignup: () => googleAuthSignup(setAlert),
        loginWithEmailAndPassword: ({email, password}) => loginWithEmailAndPassword({email, password, setAlert}),
        signupWithEmailAndPassword: ({email, password, fullName}) => signupWithEmailAndPassword({email, password, setAlert, fullName}),
        sendResetPasswordLink: ({email}) => sendResetPasswordLink({email, setAlert})
    }
}

function errorMessage (error) {
    const errorCode = error.code
    return ({
        success: false,
        message: firebaseErrors[errorCode] || error.message,
        data: null
    })
}