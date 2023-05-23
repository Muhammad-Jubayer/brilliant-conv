import { auth, googleProvider } from "../../firebase";

function Menu() {
  const handleGoogleSignIn = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((result) => {
        // Handle successful sign-in
        const user = result.user;
        console.log("Signed in user:", user);
      })
      .catch((error) => {
        // Handle sign-in error
        console.error("Error signing in:", error);
      });
  };

  return (
    <div>
      <button
        style={{
          padding: "10px",
          fontSize: "15px",
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default Menu;
