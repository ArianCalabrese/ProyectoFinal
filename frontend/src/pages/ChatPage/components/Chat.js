import React, { useState, useEffect, useRef, useContext } from "react";
import { db } from "../../../firebase";
import { UserContext } from "../../../shared/context/UserContext";
import SendMessage from "./SendMessage";
import "./Chat.css";

function Chat() {
  const scroll = useRef();
  const auth = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);
  return (
    <div>
      <div className="msgs">
        {messages.map(({ id, text, photoURL, uid }) => (
          <div>
            <div
              key={id}
              className={`msg ${uid === auth.userId ? "sent" : "received"}`}
            >
              <img src={photoURL} alt="" className="image-message"/>
              <p className="text-message">{text}</p>
            </div>
          </div>
        ))}
      </div>
      <SendMessage scroll={scroll} />
      <div ref={scroll}></div>
    </div>
  );
}

export default Chat;
