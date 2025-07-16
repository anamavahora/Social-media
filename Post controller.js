const Post = require('../models/Post');
const User = require('../models/User');
const cloudinary = require('../utils/cloudinary');

exports.uploadPost = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      async (error, result) => {
        if (error) return res.status(500).json({ message: 'Upload failed' });

        const post = new Post({
          user: req.user.id,
          caption: req.body.caption || '',
          mediaUrl: result.secure_url,
          mediaType: result.resource_type
        });

        await post.save();
        res.status(201).json(post);
      }
    );

    result.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const posts = await Post.find({
      user: { $in: [...user.following, req.user.id] }
    }).sort({ createdAt: -1 }).populate('user', 'username profilePic');

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
