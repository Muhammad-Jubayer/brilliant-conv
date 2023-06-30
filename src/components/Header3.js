import React, { useState } from "react";
import headerStyle from "./css/headerStyle.module.css";
import { MdAccountCircle, MdSettings, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/images.jpeg";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [showProfileInfo, setShowProfileInfo] = useState(false);

  const toggleProfileInfo = () => {
    setShowProfileInfo((prevShowProfileInfo) => !prevShowProfileInfo);
  };

 const navigate = useNavigate();

  return (
    <header className={headerStyle["header"]}>
      <div className={headerStyle["logo"]}>B</div>
      <span>Chat</span>
      <div className={headerStyle["user-profile"]} >
        <img
          onClick={toggleProfileInfo}
          className={headerStyle["profile-picture"]}
          src={logo}
          alt="Profile Picture"
        />
      </div>
      {showProfileInfo && (
         <div className={headerStyle["profile-info"]}>
         <div className={headerStyle["user-info"]}>
		   <img alt="Avater" src={logo} className={headerStyle["avater"]} />
           <p>{currentUser.displayName}</p>
         </div>
           <p className={headerStyle["items"]} onClick={() => navigate(`profile`)}>
             <MdAccountCircle size="25"/>
             <b>Profile</b>
           </p>
           <p className={headerStyle["items"]} onClick={() => navigate(`settings`)}>
             <MdSettings size="25"/>
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
