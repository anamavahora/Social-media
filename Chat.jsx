import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

export default function Chat() {
  const { user } = useAuth();
  const [receiverId, setReceiverId] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setMessages(prev => [...prev, data]);
    });
  }, []);

  const fetchMessages = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`/api/chat/${receiverId}`, {
      headers: { Authorization: token }
    });
    setMessages(res.data);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text
    });

    const token = localStorage.getItem("token");
    await axios.post("/api/chat", { receiver: receiverId, text }, {
      headers: { Authorization: token }
    });

    setText("");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold">Chat</h2>
      <input type="text" placeholder="Receiver ID" value={receiverId} onChange={e => setReceiverId(e.target.value)} className="input mt-2" />
      <button onClick={fetchMessages} className="btn-primary mt-2">Load Chat</button>
      <div className="mt-4 h-64 overflow-y-auto border p-2 rounded">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === user._id ? "text-right" : "text-left"}>
            <span className="inline-block bg-blue-100 rounded px-3 py-1 my-1">{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="mt-4 flex">
        <input type="text" className="input flex-1" value={text} onChange={e => setText(e.target.value)} />
        <button className="btn-primary ml-2">Send</button>
      </form>
    </div>
  );
}
