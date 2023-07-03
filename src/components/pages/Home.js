import { useAuth } from "../../contexts/AuthContext";
import { getDatabase, ref, set } from "firebase/database";
import { SignInButton, SignUpButton } from "../Authenticate";
import { MdAdd } from "react-icons/md";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import logo from "../../assets/images.jpeg";
import styles from "../css/home.module.css";
import { useNavigate } from "react-router-dom";
import { uuidv4 } from "@firebase/util";
import Header from "../Header3";
import formatTimestamp from "../../func";

export default function Home() {
  const { currentUser } = useAuth();
  const datac = useFetch(`users/${currentUser.uid}/conversations`);
  return currentUser ? (
    <div className={styles["container"]}>
      <Header />
      <Add />
      {datac &&
        Object.keys(datac).map((key) => {
          const last =
            datac[key]["lastMessage"]?.content.length >= 12
              ? datac[key]["lastMessage"]?.content.slice(0, 12) + "..."
              : datac[key]["lastMessage"]?.content;
          return (
            <Message
              key={datac[key].id}
              img={logo}
              name={datac[key].name}
              lastMsg={last}
              time={formatTimestamp(datac[key]["lastMessage"]?.timestamp)}
              id={datac[key].id}
            />
          );
        })}
    </div>
  ) : (
    <div>
      <p>You have not logged in. Please login or signup</p>
      <SignInButton />
      <p>Or,</p>
      <SignUpButton />
    </div>
  );
}

function Message({ id, img, name, lastMsg, time }) {
  const navigate = useNavigate();
  return (
    <div className={styles.msg} onClick={() => navigate(`chat/${id}`)}>
      <img alt="Avatar" src={img} className={styles.img} />
      <div className={styles.msgBox} style={{ paddingLeft: "5px" }}>
        <p>{name}</p>
        <p className={styles["msg-info"]}>
          {lastMsg} | {time}
        </p>
      </div>
    </div>
  );
}

function Add() {
  const { currentUser } = useAuth();

  const [enable, setEnable] = useState(false);
  const [formValue, setFormValue] = useState({
    userId: "",
    conversationName: "",
  });

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const db = getDatabase();
    const uuid = uuidv4();

    // paths
    const convPath = `conversations/${uuid}`;
    const usersConvPath = `users/${currentUser.uid}/conversations/${uuid}`;
    const otherConvPath = `users/${formValue.userId}/conversations/${uuid}`;

    // refs
    const convRef = ref(db, convPath);
    const userConvRef = ref(db, usersConvPath);
    const otherConvRef = ref(db, otherConvPath);

    // data
    const newConv = {
      participants: {
        [currentUser.uid]: true,
        [formValue.userId]: true,
      },
      id: uuid,
    };

    const newUserConv = {
      active: true,
      name: formValue.conversationName,
      lastMessage: {
        content: "Just created",
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
      id: uuid,
    };

    // Add the new conversation to the database
    set(convRef, newConv);
    set(userConvRef, newUserConv);
    set(otherConvRef, newUserConv);

    // Reset the form fields and state
    setEnable(false);
    setFormValue({ userId: "", conversationName: "" });
  };

  const handleCancel = () => {
    setEnable(false);
  };

  return (
    <div>
      <MdAdd
        className={styles["add"]}
        size="40"
        onClick={() => setEnable(true)}
        align="center"
      />
      {enable && (
        <div className={styles["add-container"]}>
          <input
            type="text"
            onChange={handleChange}
            name="conversationName"
            value={formValue.conversationName}
            placeholder="Enter conversation's name"
          />
          <input
            type="text"
            onChange={handleChange}
            name="userId"
            value={formValue.userId}
            placeholder="Enter participant ID"
          />
          <div>
            <button onClick={handleSubmit}>Add</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
