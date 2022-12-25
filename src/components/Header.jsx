import { NavLink } from "react-router-dom";
import styles from "./css/header.module.css";
import { AiOutlineHome, AiOutlineMenu, AiOutlineMessage } from "react-icons/ai";

export default function Header() {
  return (
    <div className={styles.header}>
      <NavLink
        to="/"
        className={(navinfo) => (navinfo.isActive ? styles.active : styles.tab)}
      >
        <AiOutlineHome size="25" />
      </NavLink>
      <NavLink
        to="/messages"
        className={(navinfo) => (navinfo.isActive ? styles.active : styles.tab)}
        style={{ borderLeft: "0px" }}
      >
        <AiOutlineMessage size="25" />
      </NavLink>
      <NavLink
        to="/menu"
        className={(navinfo) => (navinfo.isActive ? styles.active : styles.tab)}
        style={{ borderLeft: "0px" }}
      >
        <AiOutlineMenu size="25" />
      </NavLink>
    </div>
  );
}
