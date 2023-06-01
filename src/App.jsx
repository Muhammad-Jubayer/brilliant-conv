import Home from "./components/pages/Home";
import Messages from "./components/pages/Messages";
import Menu from "./components/pages/Menu.jsx";
import Header from "./components/Header";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  SignInButton,
  SignUpButton,
  SignIn,
  SignUp,
} from "./components/Authenticate";
import { token } from "./authInfo";

function App() {
  return (
    <Router>
      {token && <Header />}
      <Routes>
        {token ? (
          <>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/messages" element={<Messages />} />
            <Route exact path="/menu" element={<Menu />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route
              path="*"
              element={
                <>
                  <h2>Page Not Found</h2>
                </>
              }
            />
          </>
        ) : (
          <>
            <Route
              exact
              path="/"
              element={
                <>
                  <SignUpButton /> <SignInButton />
                </>
              }
            />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route
              path="*"
              element={
                <>
                  <h2 align="center">Page Not Found</h2>
                </>
              }
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

// 	if (isAuthenticated) {
//     return (
//       <Router>
//         <AuthProvider>
//           <Header />
//           <Routes>
//             <Route exact path="/" element={<Home />} />
//             <Route exact path="/messages" element={<Messages />} />
//             <Route exact path="/menu" element={<Menu />} />
//             <Route exact path="/signup" element={<SignUp />} />
//             <Route
//               path="*"
//               element={
//                 <>
//                   <h2>Page Not Found</h2>
//                 </>
//               }
//             />
//           </Routes>
//         </AuthProvider>
//       </Router>
//     );
//   } else {
//     return (
//       <Router>
//         <AuthProvider>
//           <Routes>
//                      </Routes>
//         </AuthProvider>
//       </Router>
//     );
//   }
// }

export default App;
