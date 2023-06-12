import { Link, NavLink } from "react-router-dom";
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
		<p>
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
          <Link to="/messages" />
        )}
      </NavLink>
    </div>
  );
}
