import { NavLink } from "react-router-dom";
import styles from "./css/header.module.css";

export default function Header() {
  return (
    <div id={styles.header}>
      <NavLink
        to="/"
        className={(navinfo) => (navinfo.isActive ? styles.active : styles.tab)}
      >
        Feeds
      </NavLink>
      <NavLink
        to="/messages"
        className={(navinfo) => (navinfo.isActive ? styles.active : styles.tab)}
        style={{ borderLeft: "0px" }}
      >
        Messages
      </NavLink>
      <NavLink
        to="/menu"
        className={(navinfo) => (navinfo.isActive ? styles.active : styles.tab)}
        style={{ borderLeft: "0px" }}
      >
        Menu
      </NavLink>
    </div>
  );
}
