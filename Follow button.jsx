import { useState, useEffect } from "react";
import axios from "axios";

export default function FollowButton({ profileId, isFollowing }) {
  const [following, setFollowing] = useState(isFollowing);

  const handleClick = async () => {
    const token = localStorage.getItem("token");
    if (following) {
      await axios.put(`/api/users/unfollow/${profileId}`, {}, {
        headers: { Authorization: token }
      });
    } else {
      await axios.put(`/api/users/follow/${profileId}`, {}, {
        headers: { Authorization: token }
      });
    }
    setFollowing(!following);
  };

  return (
    <button onClick={handleClick} className="btn-primary mt-2">
      {following ? "Unfollow" : "Follow"}
    </button>
  );
}
