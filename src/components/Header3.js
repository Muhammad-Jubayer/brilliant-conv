import React, { useState } from "react";
import headerStyle from "./css/headerStyle.module.css";
import { MdAccountCircle, MdSettings, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import Demo from "../assets/images.jpeg";
import useFetch from "../hooks/useFetch";
import Logo from "../assets/b.png";


const Header = () => {
  const { currentUser, logout } = useAuth();
  const profileUrl = useFetch(`users/${currentUser.uid}/profile-picture`);
  const logo = profileUrl || Demo;
  const [showProfileInfo, setShowProfileInfo] = useState(false);

  const toggleProfileInfo = () => {
    setShowProfileInfo((prevShowProfileInfo) => !prevShowProfileInfo);
  };

  const navigate = useNavigate();

  const loc = useLocation();

  const currentRoute = loc.pathname;

  let displayText = "";

  if (currentRoute === "/") {
    displayText = "Home";
  } else {
    const routeParts = currentRoute.split("/");
    const routeName = routeParts[1].toLowerCase();
    displayText = routeName.charAt(0).toUpperCase() + routeName.slice(1);
  }

  return (
    <header className={headerStyle["header"]}>
      <div className={headerStyle["logo"]}>
        <img src={Logo} alt="Logo" onClick={() => navigate("/")} />
      </div>
      
      <span>{displayText}</span>
      <div className={headerStyle["user-profile"]}>
        <img
          onClick={toggleProfileInfo}
          className={headerStyle["profile-picture"]}
          src={logo}
          alt="Profile"
        />
      </div>
      {showProfileInfo && (
        <div className={headerStyle["profile-info"]}>
          <div className={headerStyle["user-info"]}>
            <img alt="Avater" src={logo} className={headerStyle["avater"]} />
            <p>{currentUser.displayName}</p>
          </div>
          <div className={headerStyle["horizontal-line"]}></div>
          <p
            className={headerStyle["items"]}
            onClick={() => navigate(`/profile`)}
          >
            <MdAccountCircle size="25" />
            <b>Profile</b>
          </p>
          <p
            className={headerStyle["items"]}
            onClick={() => navigate(`settings`)}
          >
            <MdSettings size="25" />
            <b>Settings</b>
          </p>
          <p className={headerStyle["items"]} onClick={() => logout()}>
            <MdLogout size="25" />
            <b>Log Out</b>
          </p>
        </div>
      )}
    </header>
  );
};

export default Header;
