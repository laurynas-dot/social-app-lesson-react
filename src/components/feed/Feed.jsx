import { useEffect, useState } from "react";
import Share from "../share/Share"
import Post from "../post/Post"
import "./feed.css"
import axios from "axios";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("posts/timeline/61e7b5c673f8f5a01fac5864");
      setPosts(res.data);
    }
    
    fetchPosts();
  }, []);

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
