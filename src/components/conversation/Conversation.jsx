import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./conversation.css"

export default function Conversation({conversation, currentUserId}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find(m => m !== currentUserId);

    const getUser = async () => {
      try {
      const res = await axios("/users?userId=" + friendId);
      setUser(res.data);
      console.log(res);
      } catch (err) {
        console.log(err);
      }
    }

    getUser();
  }, [currentUserId, conversation]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="conversation">
      <img className="conversationImg" src={PF + user?.profilePicture || "noAvatar.png"} alt="" />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
