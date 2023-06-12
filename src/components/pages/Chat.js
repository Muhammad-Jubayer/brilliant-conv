import React, { useState, useRef, useEffect } from "react";
import chatStyle from "../css/chatStyle.module.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messageListRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        isUserMessage: true,
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={chatStyle["chat-container"]}>
      <div className={chatStyle["message-list"]} ref={messageListRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${chatStyle.message} ${
              message.isUserMessage
                ? chatStyle["user-message"]
                : chatStyle["other-user-message"]
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form className={chatStyle["input-form"]} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatPage;