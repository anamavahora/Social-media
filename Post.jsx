export default function Post({ post }) {
  return (
    <div className="bg-gray-100 p-3 rounded-md">
      <div className="text-sm font-bold mb-1">@{post.user.username}</div>
      {post.mediaType === "image" ? (
        <img src={post.mediaUrl} alt="post" className="rounded-md w-full" />
      ) : (
        <video controls className="w-full rounded-md">
          <source src={post.mediaUrl} type="video/mp4" />
        </video>
      )}
      <div className="mt-2 text-sm">{post.caption}</div>
    </div>
  );
}
