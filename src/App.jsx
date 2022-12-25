import Home from "./components/pages/Home";
import Messages from "./components/pages/Messages";
import Menu from "./components/pages/Menu.jsx";
import Header from "./components/Header";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/messages" element={<Messages />} />
        <Route exact path="/Menu" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;
