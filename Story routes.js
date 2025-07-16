const router = require('express').Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const { uploadStory, getStories } = require('../controllers/storyController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', auth, upload.single('media'), uploadStory);
router.get('/', auth, getStories);

module.exports = router;
