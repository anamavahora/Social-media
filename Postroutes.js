const router = require('express').Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const { uploadPost, getFeed } = require('../controllers/postController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', auth, upload.single('media'), uploadPost);
router.get('/feed', auth, getFeed);

module.exports = router;
