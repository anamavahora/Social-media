import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import UploadForm from "../components/UploadForm";
import Post from "../components/Post";

export default function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/posts/feed", {
        headers: { Authorization: token }
      });
      setPosts(res.data);
    };
    fetchFeed();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Your Feed</h1>
      <UploadForm />
      <div className="mt-4 space-y-6">
        {posts.map(post => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
