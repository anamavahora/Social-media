const User = require('../models/User');

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: 'User not found' });
  }
};

exports.followUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const current = await User.findById(req.user.id);

    if (!user.followers.includes(req.user.id)) {
      user.followers.push(req.user.id);
      current.following.push(user._id);
      await user.save();
      await current.save();
    }

    res.json({ message: 'Followed user' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const current = await User.findById(req.user.id);

    user.followers = user.followers.filter(id => id.toString() !== req.user.id);
    current.following = current.following.filter(id => id.toString() !== user._id.toString());

    await user.save();
    await current.save();

    res.json({ message: 'Unfollowed user' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
