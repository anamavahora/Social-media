import { useState } from "react";
import axios from "axios";

export default function UploadForm() {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a file");

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("media", file);

    const token = localStorage.getItem("token");
    await axios.post("/api/posts", formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data"
      }
    });

    window.location.reload();
  };

  return (
    <form onSubmit={handleUpload} className="space-y-2">
      <input type="file" accept="image/*,video/*" onChange={e => setFile(e.target.files[0])} />
      <input type="text" placeholder="Caption" className="input" value={caption} onChange={e => setCaption(e.target.value)} />
      <button type="submit" className="btn-primary">Upload</button>
    </form>
  );
}
