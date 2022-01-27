import { useEffect, useState } from "react";
import Share from "../share/Share"
import Post from "../post/Post"
import "./feed.css"
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({username}) {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username ? 
      await axios.get("/posts/profile/" + username) : 
      await axios.get("posts/timeline/" + user._id);
      setPosts(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
    
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share/>
        {
        posts.map(post => {
          return <Post key={post._id} post={post}/>
        })
      }
      </div>
    </div>
  )
}
