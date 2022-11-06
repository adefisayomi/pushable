import { initializeApp} from 'firebase/app'
import {getAuth, GoogleAuthProvider, signOut, getAdditionalUserInfo, signInWithPopup,deleteUser, signInWithEmailAndPassword,createUserWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth'
import useSettings from './useSettings'
import { errorMessage } from '../constants'
import { firebaseErrors } from '../utils/firebaseErrors'

// <- initialization ->
const firebaseConfig = process.env.firebaseConfig
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
// 

async function handleSignOut (setAlert) {
    try {
        const currentUser = await auth.currentUser
        if (currentUser) {
            await signOut(auth)
            setAlert(`See you later: ${currentUser.displayName}`)
            return;
        }
        else {
            return setAlert(`But 😲 ! You are not logged in`)
        }
    }
    catch(err) {
        const {message, code} = err
        setAlert(firebaseErrors[code] || message, 'error')
        return errorMessage(err)
    }
}

async function handleGoogleLogin (setAlert) {
    try {
        
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        // 
        const res = await signInWithPopup(auth, provider)
        const user = res.user; 
        const isNewUser = getAdditionalUserInfo(res)?.isNewUser
        const credentials = GoogleAuthProvider.credentialFromResult(res)
        const token = credentials?.accessToken;
        // 
        if (isNewUser) {
            await deleteUser(user)
            setAlert(`Buddy 😉 ! You are new here.`)
            return
        }
        setAlert(`Welcome 😊 ${user.displayName}`)
        return ({
            success: true,
            message: `users data`,
            data: user
        })
    }
    catch(err) {
        const {message, code} = err
        setAlert(firebaseErrors[code] || message, 'error')
        return errorMessage(err)
    }
}

async function handleGoogleSignup (setAlert) {
    try {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        // 
        const res = await signInWithPopup(auth, provider)
        const user = res.user;
        const isNewUser = getAdditionalUserInfo(res)?.isNewUser
        const credentials = GoogleAuthProvider.credentialFromResult(res)
        const token = credentials?.accessToken;
        // 
        if (!isNewUser) {
            await signOut(auth)
            setAlert('Buddy 😉 ! You already have an account here.')
            setAlert('So, Loggin to continue.')
            return
        }
        setAlert(`Welcome 😊 ${user.displayName} to the family.`)
        return ({
            success: true,
            message: `users data`,
            data: user
        })
    }
    catch(err) {
        const {message, code} = err
        setAlert(firebaseErrors[code] || message, 'error')
        return errorMessage(err)
    }
}


async function handleLoginWithEmailAndPassword (email, password, setAlert) {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        const user = res.user

        setAlert(`Welcome back ${user.displayName} 😊`)
        return ({
            success: true,
            message: `welcome ${user.displayName}`,
            data: user
        })
    }
    catch(err) {
        const {message, code} = err
        setAlert(firebaseErrors[code] || message, 'error')
        return errorMessage(err)
    }
}


export async function handleSignupWithEmailAndPassword (email, password, setAlert) {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user

        setAlert(`Welcome 😊 ${user.displayName} to the family.`)
        return ({
            success: true,
            message: `Logged in as ${user.displayName}`,
            data: user
        })
    }
    catch(err) {
        const {message, code} = err
        setAlert(firebaseErrors[code] || message, 'error')
        return errorMessage(err)
    }
}


async function sendResetPasswordLink (email, setAlert) {
    try {
        await sendPasswordResetEmail(auth, email)
        setAlert({message: `Password reset link sent to ${email}`})
        return ({
            success: true,
            email
        })
    }
    catch(err) {
        const {message, code} = err
        setAlert(firebaseErrors[code] || message, 'error')
        return errorMessage(err)
    }
}

// export defaults
export default function useFirebase () {

    const {setAlert} = useSettings()

    return ({
        auth,
        signOut: () => handleSignOut(setAlert),
        googleLogin: () => handleGoogleLogin(setAlert),
        googleSignup: () => handleGoogleSignup(setAlert),
        signinWithEmailAndPassword: (email, password) => handleLoginWithEmailAndPassword(email, password, setAlert),
        sendResetPasswordLink: (email) => sendResetPasswordLink(email, setAlert),
        signupWithEmailAndPassword: (email, password) => handleSignupWithEmailAndPassword(email, password, setAlert)
    })
}