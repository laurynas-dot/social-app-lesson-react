import "./messenger.css"
import Topbar from "../../components/topbar/Topbar"
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const {user} = useContext(AuthContext);

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
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getMessages();
  }, [currentChat]);

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
                  <Message message={m} own={m.sender === user._id}/>
                ))
              }
            </div>
            <div className="chatBoxBottom">
              <textarea className="chatMessageInput" placeholder="bark something!"></textarea>
              <button className="chatSubmitButton">Bark!</button>
            </div>
            </> : <span className="noConversationText">Open a conversation to start barking!</span>}
          </div>
        </div>
        <div className="chatOnline">
          <div className="onlineWrapper">
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
          </div>
        </div>
      </div>
    </>
  );
}
