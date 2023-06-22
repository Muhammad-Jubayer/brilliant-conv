import { NavLink } from "react-router-dom";
import styles from "./css/header.module.css";
import {
  AiFillHome,
  AiFillMessage,
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlineMessage,
} from "react-icons/ai";
import { useState } from "react";

export default function Header() {
  const [activeNav, setActiveNav] = useState(null);
  return (
    <div className={styles.header}>
      <NavLink
        to="/"
        className={(navinfo) => {
          if (navinfo.isActive) {
            setActiveNav("Home");
            return styles.active;
          }
          return styles.tab;
        }}
      >
        {activeNav === "Home" ? (
          <AiFillHome size="25" />
        ) : (
          <AiOutlineHome size="25" />
        )}
      </NavLink>
      <NavLink
        to="/messages"
        className={(navinfo) => {
          if (navinfo.isActive) {
            setActiveNav("Messages");
            return styles.active;
          }
          return styles.tab;
        }}
        style={{ borderLeft: "0px" }}
      >
        {activeNav === "Messages" ? (
          <AiFillMessage size="25" />
        ) : (
          <AiOutlineMessage size="25" />
        )}
      </NavLink>
      <NavLink
        to="/menu"
        className={(navinfo) => {
          if (navinfo.isActive) {
            setActiveNav("Menu");
            return styles.active;
          }
          return styles.tab;
        }}
      >
        {activeNav === "Menu" ? (
          <AiOutlineMenu size="25" />
        ) : (
          <AiOutlineMenu size="25" />
        )}
      </NavLink>
    </div>
  );
}
