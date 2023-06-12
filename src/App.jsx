import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext.js";

import "./App.css";
import Paths from "./components/Paths";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Paths />
      </AuthProvider>
    </Router>
  );
}

export default App;
