import "./profile.css"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      <Topbar/>
      <div className="profile">
        <Sidebar/>
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src={`${PF}posts/postD.png`} alt="" />
              <img className="profileUserImg" src={`${PF}person/dogD.png`} alt="" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName" >Bangy Matress</h4>
              <span className="profileInfoDesc" >Hello my buddies!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed/>
            <Rightbar profile/>
          </div>
        </div>
      </div>
    </>
  )
}
