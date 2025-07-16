import { useState } from "react";
import axios from "axios";

export default function StoryUpload() {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a story file");

    const formData = new FormData();
    formData.append("media", file);

    const token = localStorage.getItem("token");
    await axios.post("/api/stories", formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data"
      }
    });

    alert("Story uploaded!");
    window.location.reload();
  };

  return (
    <form onSubmit={handleUpload} className="mt-4">
      <input type="file" accept="image/*,video/*" onChange={e => setFile(e.target.files[0])} />
      <button type="submit" className="btn-primary mt-2">Post Story</button>
    </form>
  );
}
