import firebase from '../../firebase';


const signUpWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // User sign-up with Google successful
      const user = result.user;
      // Additional code after successful sign-up
			console.log(user)
    })
    .catch((error) => {
      // User sign-up with Google failed
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle the error

			console.log(errorCode, errorMessage)
    });
};


export default signUpWithGoogle;
