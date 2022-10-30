const express = require('express')
const {getnotes, createnote, getNoteById, updatenote, deletenote} = require('../controllers/notecontrollers');
const { authUserProtect } = require('../middlewares/authMiddleware');

const router = express.Router()

router.route('/').get(authUserProtect,getnotes)
router.route('/create').post(authUserProtect,createnote)
router.route('/:_id').get(getNoteById).put(authUserProtect,updatenote).delete(authUserProtect,deletenote)

module.exports = router;
