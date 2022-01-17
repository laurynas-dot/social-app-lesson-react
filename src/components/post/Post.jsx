import { MoreVert } from "@material-ui/icons"
import "./post.css"
import { Users } from "../../dummyData";

const getUser = (userId) => {
  const user = Users.filter(entry => entry.id === userId);
  return user[0].username;
}

const getUserPhoto = (userId) => {
  const user = Users.filter(entry => entry.id === userId);
  return user[0].profilePicture;
}

export default function Post({post}) {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src={getUserPhoto(post.userId)} alt="" />
            <span className="postUsername">{getUser(post.userId)}</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.photo} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" alt="" />
            <img className="likeIcon" src="assets/heart.png" alt="" />
            <span className="postLikeCounter">{post.like} dogs like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
