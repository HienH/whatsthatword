express = require('express');
const router = express.Router();
const passport = require('passport');

// User controller
const userController = require('../controller/user.controller')


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', passport.authenticate('jwt', { session: false }), userController.getProfile);
router.get('/profile/:userId', userController.getUserProfile);
router.get('/getFriends/:friendId', userController.getFriendUser);
router.get('/allUsers', userController.getAllUser);
router.post('/favWord', userController.favWord);
router.post('/favWord/remove', userController.removeFavWord);

module.exports = router; 
