import axios from 'axios';
// config
import { HOST_API } from '../config';
import {auth} from '../hooks/useFirebase'

// ----------------------------------------------------------------------

export const basePath = process.env.NODE_ENV === 'production' ? HOST_API.production : HOST_API.dev;

// get the id token of the current user 
// let user = '';
// auth.onAuthStateChanged(res => {
//   res.getIdToken(true)
//   .then(idToken => (
//     console.log(idToken)
//   ))
// })

const axiosInstance = axios.create({
  baseURL: basePath,
  // headers: {
  //   authorization: `Bearer ${token}`
  // }
});

export default axiosInstance;