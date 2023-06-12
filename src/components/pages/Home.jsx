import { useAuth } from "../../contexts/AuthContext";
import { getDatabase, ref, set, push } from "firebase/database";
// import { uuidv4 } from "@firebase/util";
import { LogoutButton, SignInButton, SignUpButton } from "../Authenticate";
import { MdAdd, MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import logo from "../../assets/me.png";
import styles from "../css/Message.module.css";

export default function Home() {
  const { currentUser } = useAuth();
  const datac = useFetch("conversations");
  return currentUser ? (
    <div>
      <MainHeading />
      <Add />
      {datac &&
        Object.keys(datac).map((key) => (
          <Message
            key={key}
            img={logo}
            name={datac[key].name}
            lastMsg={datac[key].lastMessage.content}
            time={datac[key].lastMessage.timestamp}
          />
        ))}
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

function MainHeading() {
  const [contrac, setContrac] = useState(true);
  const { currentUser } = useAuth();
  return (
    <div>
      {!contrac && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <p>{currentUser.displayName}</p>
          <LogoutButton />
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <img src={logo} style={{ margin: "5px" }} height="40px" alt="Logo" />
          <h6>Brilliant Conversation</h6>
        </div>
        {contrac ? (
          <MdArrowDropDown
            size="25"
            color="black"
            onClick={() => setContrac(false)}
          />
        ) : (
          <MdArrowDropUp
            size="25"
            color="black"
            onClick={() => setContrac(true)}
          />
        )}
      </div>
    </div>
  );
}

function Message({ img, name, lastMsg, time }) {
  console.log("running");
  return (
    <div className={styles.msg}>
      <img alt="Avatar" src={img} className={styles.img} />
      <div className={styles.msgBox} style={{ paddingLeft: "5px" }}>
        <p>{name}</p>
        <p>
          {lastMsg.slice(0, 12)} • {time}
        </p>
      </div>
    </div>
  );
}

function Add() {
  const [enable, setEnable] = useState(false);

  const [formValue, setFormValue] = useState({
    userName: "",
    conversationName: "",
  });
  const { currentUser } = useAuth();

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };



const handleSubmit = (e) => {
  e.preventDefault();

  const db = getDatabase();
  const conversationsRef = ref(db, "conversations");
  const newConversationRef = push(conversationsRef);

  const newConversation = {
  id: newConversationRef.key,
    participants: {
      [currentUser.uid]: true,
      [formValue.userName]: true,
    },
    name: formValue.conversationName,
    lastMessage: {
      senderId: currentUser.uid,
      content: "",
      timestamp: 0,
    },
  };

  // Add the new conversation to the database
  set(newConversationRef, newConversation);

  // Reset the form fields and state
  setEnable(false);
  setFormValue({ userName: "", conversationName: "" });
};


  const handleCancel = () => {
    setEnable(false);
  };

  return (
    <div>
      <MdAdd size="40" onClick={() => setEnable(true)} />
      {enable && (
        <div>
          <input
            type="text"
            onChange={handleChange}
            name="conversationName"
            value={formValue.conversationName}
          />
          <input
            type="text"
            onChange={handleChange}
            name="userName"
            value={formValue.userName}
          />
          <button onClick={handleSubmit}>Add</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
}
