import "./conversation.css"

export default function Conversation() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="conversation">
      <img className="conversationImg" src={PF + "person/dogA.png"} alt="" />
      <span className="conversationName">Zeus</span>
    </div>
  );
}
