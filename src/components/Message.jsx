import styles from "./css/Message.module.css"

export default function Messages({img, name, lastMsg, time}) {
  return (
    <div className={styles.msg}>
      <img src={img} className={styles.img} />
      <div className={styles.msgBox} style={{ paddingLeft: "5px" }}>
        <p>{name}</p>
        <p>{lastMsg} • {time}</p>
      </div>
    </div>
  );
}
