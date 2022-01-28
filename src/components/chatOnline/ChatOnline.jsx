import "./chatOnline.css";

export default function ChatOnline() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img className="chatOnlineImg" src={PF + "person/dogA.png"} alt="" />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Jackyl</span>
      </div>
    </div>
  );
}