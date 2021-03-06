import "./messenger.css"
import Topbar from "../../components/topbar/Topbar"
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import {io} from "socket.io-client";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([])
  const socket = useRef();
  const {user} = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender))
      setMessages(prev => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", users => {
      const onlineUsers = user.followings.filter(f => users.some(u=>u.userId === f));
      setOnlineUsers(onlineUsers);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
      const res = await axios.get("/conversations/" + user._id);
      setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getConversations();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    
    const receiverId = currentChat.members.find(member => member !== user._id)

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"});
  }, [messages]);

  return (
    <>
      <Topbar/>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput"/>
            {conversations.map(c => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUserId={user._id}/>
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {
              currentChat ?
            <>
            <div className="chatBoxTop">
              {
                messages.map(m => (
                  <div ref={scrollRef}>
                    <Message message={m} own={m.sender === user._id}/>
                  </div>
                ))
              }
            </div>
            <div className="chatBoxBottom">
              <textarea 
                className="chatMessageInput" 
                placeholder="bark something!"
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}>
              </textarea>
              <button className="chatSubmitButton" onClick={handleSubmit}>Bark!</button>
            </div>
            </> : <span className="noConversationText">Open a conversation to start barking!</span>}
          </div>
        </div>
        <div className="chatOnline">
          <div className="onlineWrapper">
            <ChatOnline 
              onlineUsers={onlineUsers} 
              currentId={user._id} 
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
