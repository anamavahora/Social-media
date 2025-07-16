const router = require('express').Router();
const auth = require('../middleware/auth');
const { sendMessage, getMessages } = require('../controllers/chatController');

router.post('/', auth, sendMessage);
router.get('/:userId', auth, getMessages);

module.exports = router;
