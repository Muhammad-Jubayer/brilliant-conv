import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdCopyAll, MdSend } from "react-icons/md";
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
import formatTimestamp, { copyText } from "../../func";
import { setData } from "../../firebaseUtils";
import Loading from "../Loading";
import { useAuth } from "../../contexts/AuthContext";

const ChatPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();

  const [messages, setMessages] = useState();
  const [participants, setParticipants] = useState();
  const [inputValue, setInputValue] = useState("");
  const messageListRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const db = getDatabase();

    if (inputValue.length >= 2) {
      const msgRef = ref(db, `conversations/${id}/messages`);
      const newMsgRef = push(msgRef);

      const newMsg = {
        id: newMsgRef.key,
        content: inputValue,
        senderId: currentUser.uid,
        timestamp: new Date().toISOString(),
      };

      set(newMsgRef, newMsg);
      setData(`conversations/${id}/lastMessage`, inputValue);
      setInputValue("");
    }

    Object.keys(participants).map((participant) => {
      if (participants[participant]) {
        set(
          ref(db, `users/${participant}/conversations/${id}/lastMessage/content`),
          inputValue
        );
        set(
          ref(db, `users/${participant}/conversations/${id}/lastMessage/timestamp`),
          new Date().toISOString()
        );
      }
      return null;
    });

    setTimeout(() => {
      if (messageListRef.current) {
        messageListRef.current.scrollTo({
          top: messageListRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  useEffect(() => {
    setTimeout(() => {
      if (messageListRef.current) {
        messageListRef.current.scrollTo({
          top: messageListRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);

    const db = getDatabase();
    const msgs = query(
      ref(db, `conversations/${id}/messages`),
      orderByChild("timestamp")
    );

    // fetch messages
    onValue(msgs, (snapshot) => {
      setMessages(snapshot.val());
    });

    // fetch participants
    onValue(ref(db, `conversations/${id}/participants`), (snapshot) =>
      setParticipants(snapshot.val())
    );
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
                <MessageContainer
                  isUserMsg={isCurrentUserMessage}
                  key={messageId}
                  msgClass={messageClass}
                  id={message.id}
                  content={message.content}
                  timestamp={message.timestamp}
                  convId={id}
                  reactionObject={message.reactions}
                />
              );
            })}
          </div>
          <div className={chatStyle["input-form"]}>
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <MdSend size="40" onClick={handleSubmit} />
          </div>
        </div>
      ) : (
        <div>
          <Loading />
          <div className={chatStyle["input-form"]}>
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <MdSend size="40" onClick={handleSubmit} />
          </div>
        </div>
      )}
    </div>
  );
};

const MessageContainer = ({
  reactionObject,
  convId,
  id,
  isUserMsg,
  content,
  timestamp,
  msgClass,
}) => {
  const { currentUser } = useAuth();
  const [selectMessage, setSelectMessage] = useState(false);
  const [msgReact, setMsgReact] = useState("");

  const reactions = "👍👎� 😯😡😢😅🥰🤫🙁😵❤️� 🖤👌🤦";
  const reaction = Array.from(reactions);

  const reactionClass = isUserMsg
    ? chatStyle["user-message-reaction"]
    : chatStyle["other-message-reaction"];

  useEffect(() => {
    if (reactionObject) {
      const emojis = Object.values(reactionObject);
      setMsgReact(emojis.join(""));
    }
  }, [reactionObject]);

  const handleClick = (e) => {
    setData(
      `conversations/${convId}/messages/${id}/reactions/${currentUser.uid}`,
      e.target.innerText
    );
    setSelectMessage(false);
  };

  return (
    <div>
      {selectMessage && (
        <div className={chatStyle["reaction-container"]}>
          <MdCopyAll
            onClick={() => copyText(content)}
            className={chatStyle["copy"]}
          />
          <div className={chatStyle["reactions"]}>
            {reaction.map((value, index) => {
              return (
                <span
                  key={index}
                  onClick={handleClick}
                  role="img"
                  aria-label={`reaction-${index}`}
                >
                  {value}
                </span>
              );
            })}
          </div>
        </div>
      )}
      <div
        key={id}
        onClick={() => setSelectMessage(!selectMessage)}
        className={`${chatStyle.message} ${msgClass}`}
      >
        {content}
      </div>
      {msgReact && (
        <span className={`${reactionClass} ${chatStyle["active-reactions"]}`}>
          {msgReact}
        </span>
      )}
      {selectMessage && (
        <span className={chatStyle["timestamp"]}>
          {formatTimestamp(timestamp)}
        </span>
      )}
    </div>
  );
};

export default ChatPage;
