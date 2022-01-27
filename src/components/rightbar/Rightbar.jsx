import "./rightbar.css"
import { Users } from "../../dummyData"
import Online from "../online/Online"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Rightbar({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      if (user._id === undefined)
        return;

      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user._id]);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today</span>
        </div>
        <img src="assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(user => { 
            return <Online key={user.id} user={user} />
            })}
        </ul>
      </>
    );
  }

  const ProfileRightBar = () => {
    return (
    <>
      <h4 className="rightbarTitle">User information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoKey">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoKey">{user.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoKey">{user.relationship === 1 ? "Single" : "Empty"}</span>
        </div>
      </div>
      <h4 className="rightBarTitle">User Friends</h4>
      <div className="rightbarFollowings">
        {friends.map(friend => (
          <div className="rightbarFollowing">
            <img 
              src={PF + friend.profilePicture || "person/noAvatar.png"} 
              alt="" 
              className="rightbarFollowingImg" 
            />
            <span className="rightbarFollowingName">{friend.username}</span>
          </div>
        ))}
      </div>
    </>);
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar/> : <HomeRightbar/>}
      </div>
    </div>
  )
}
