import { useAuth } from "../../contexts/AuthContext";
import { getDatabase, ref, set, push } from "firebase/database";
import { LogoutButton, SignInButton, SignUpButton } from "../Authenticate";
import { MdAdd, MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import logo from "../../assets/images.jpeg";
import styles from "../css/Message.module.css";
import { useNavigate } from "react-router-dom";
import { formatTimestamp } from "../../func";

export default function Home() {
  const { currentUser } = useAuth();
  const datac = useFetch("conversations");
  console.log(datac);
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
            lastMsg={ ""}
            time={ ""}
            id={datac[key].id}
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
          <p>{currentUser.uid}</p>
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

function Message({ id, img, name, lastMsg, time }) {
  const navigate = useNavigate();
  return (
    <div className={styles.msg} onClick={() => navigate(`chat/${id}`)}>
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
    userId: "",
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
      participants: {
        [currentUser.uid]: true,
        [formValue.userId]: true,
      },
      name: formValue.conversationName,
      lastMessage: {
        senderId: currentUser.uid,
        content: "",
        timestamp: new Date().toISOString(),
      },
      timestamp:new  Date().toISOString(),
      id: newConversationRef.key,
    };

    // Add the new conversation to the database
    set(newConversationRef, newConversation);

    // Reset the form fields and state
    setEnable(false);
    setFormValue({ userId: "", conversationName: "" });
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
            placeholder="Enter conversation's name"
          />
          <input
            type="text"
            onChange={handleChange}
            name="userId"
            value={formValue.userId}
            placeholder="Enter participant ID"
          />
          <button onClick={handleSubmit}>Add</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
}
