const express = require('express')
const {registerUser, authUser, updateUserProfile    } = require('../controllers/userControllers')
const { authUserProtect } = require('../middlewares/authMiddleware')

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(authUser)
router.route('/profile').post(authUserProtect,updateUserProfile)
 
module.exports = router;