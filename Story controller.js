const Story = require('../models/Story');
const User = require('../models/User');
const cloudinary = require('../utils/cloudinary');

exports.uploadStory = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      async (error, result) => {
        if (error) return res.status(500).json({ message: 'Upload failed' });

        const story = new Story({
          user: req.user.id,
          mediaUrl: result.secure_url,
          mediaType: result.resource_type
        });

        await story.save();
        res.status(201).json(story);
      }
    );

    result.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStories = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const stories = await Story.find({
      user: { $in: [...user.following, req.user.id] }
    }).sort({ createdAt: -1 }).populate('user', 'username profilePic');

    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
