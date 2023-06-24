import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import chatStyle from "../css/chatStyle.module.css";
import {
  onValue,
  getDatabase,
  ref,
  push,
  set,
  query,
  orderByChild,
} from "firebase/database";

import { useAuth } from "../../contexts/AuthContext";

const ChatPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();

  const [messages, setMessages] = useState();
  const [inputValue, setInputValue] = useState("");
  const messageListRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const db = getDatabase();
    const msgRef = ref(db, `conversations/${id}/messages`);
    const newMsgRef = push(msgRef);

    const newMsg = {
      id: newMsgRef.key,
      content: inputValue,
      senderId: currentUser.uid,
      timestamp: new Date().toISOString(),
    };

    set(newMsgRef, newMsg);
    setInputValue("");
  };

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }

    const db = getDatabase();
    const msgs = query(
      ref(db, `conversations/${id}/messages`),
      orderByChild("timestamp")
    );
    onValue(msgs, (snapshot) => {
      setMessages(snapshot.val());
    });
  }, [id]);

  return (
    <div>
      {messages ? (
        <div className={chatStyle["chat-container"]}>
          <div className={chatStyle["message-list"]} ref={messageListRef}>
            {Object.keys(messages).map((messageId) => {
              const message = messages[messageId];
              const isCurrentUserMessage = message.senderId === currentUser.uid;
              const messageClass = isCurrentUserMessage
                ? chatStyle["user-message"]
                : chatStyle["other-user-message"];

              return (
                <div
                  key={messageId}
                  className={`${chatStyle.message} ${messageClass}`}
                >
                  {message.content}
                </div>
              );
            })}
          </div>
          <form className={chatStyle["input-form"]} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <button type="submit" onClick={handleSubmit}>
              Send
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p>Loading...</p>
          <form className={chatStyle["input-form"]} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <button type="submit" onClick={handleSubmit}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
