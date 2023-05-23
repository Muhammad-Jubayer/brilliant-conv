import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

console.log(process.env.REACT_APP_API_KEY)


const app = initializeApp({
	apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MEASUREMENT_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
});

// Get Firebase Auth instance
const auth = getAuth(app);

// Create a GoogleAuthProvider instance
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
