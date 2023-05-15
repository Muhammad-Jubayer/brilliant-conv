import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // signup function
  async function signup(email, passwordn) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);

		const signUpWithGoogle = () => {
  auth.signInWithPopup(googleProvider)
    .then((result) => {
      // User sign-up with Google successful
      const user = result.user;
      // Additional code after successful sign-up
    })

    .catch((error) => {
      // User sign-up with Google failed
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle the error
    });
};

    // update profile
    await updateProfile(auth.currentUser, {
      displayName: username,
    });

    const user = auth.currentUser;
    setCurrentUser({
      ...user,
    });
  }

  // login function
  function login(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

const loginWithGoogle = () => {
  auth.signInWithPopup(googleProvider)
    .then((result) => {
      // User login with Google successful
      const user = result.user;
      // Additional code after successful login
    })
    .catch((error) => {
      // User login with Google failed
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle the error
    });
};

  // logout function
  function logout() {
    const auth = getAuth();
    return signOut(auth);
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
