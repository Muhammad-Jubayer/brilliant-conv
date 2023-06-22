import { Routes, Route, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// import Menu from "./pages/Menu";
import Home from "./pages/Home";
import { SignIn, SignUp } from "./Authenticate";

import Chat from "./pages/Chat.js";
// import Messages from "./pages/Messages";

export default function Paths() {
  const { currentUser } = useAuth();
  if (currentUser) {
    return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/chat/:id" element={<Chat />} />
        <Route
          path="*"
          element={
            <>
              <h2 align="center">Page Not Found</h2>
              <Link to="/">Home</Link>
            </>
          }
        />
      </Routes>
    );
  } else {
    console.log("nnn");
    return (
      <Routes>
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/signin" element={<SignIn />} />{" "}
        <Route
          path="*"
          element={
            <>
              <h2 align="center">Page Not Found</h2>
              <Link to="/">Home</Link>
            </>
          }
        />
      </Routes>
    );
  }
}
