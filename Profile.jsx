import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FollowButton from "../components/FollowButton";

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/api/users/${id}`, {
        headers: { Authorization: token }
      });
      setProfile(res.data);
    };

    const fetchPosts = async () => {
      const res = await axios.get("/api/posts/feed", {
        headers: { Authorization: localStorage.getItem("token") }
      });
      setPosts(res.data.filter(post => post.user._id === id));
    };

    fetchProfile();
    fetchPosts();
  }, [id]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="text-center">
        <img src={profile.profilePic || "/default.jpg"} className="w-20 h-20 rounded-full mx-auto" />
        <h2 className="text-lg font-semibold">@{profile.username}</h2>
        <p className="text-sm">{profile.bio}</p>
        <FollowButton profileId={id} isFollowing={false} />
      </div>
      <hr className="my-4" />
      <h3 className="text-md font-semibold">Posts</h3>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {posts.map(post => (
          <img key={post._id} src={post.mediaUrl} className="w-full h-24 object-cover" />
        ))}
      </div>
    </div>
  );
}
