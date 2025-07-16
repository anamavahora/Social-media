import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function StoryView() {
  const [stories, setStories] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStories = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/stories", {
        headers: { Authorization: token }
      });
      setStories(res.data);
    };
    fetchStories();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Stories</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {stories.map(story => (
          <div key={story._id} className="text-center">
            <div className="w-20 h-20 rounded-full border-2 border-blue-500 overflow-hidden">
              {story.mediaType === "image" ? (
                <img src={story.mediaUrl} className="object-cover w-full h-full" />
              ) : (
                <video src={story.mediaUrl} className="w-full h-full" muted autoPlay loop />
              )}
            </div>
            <div className="text-xs mt-1">@{story.user.username}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
