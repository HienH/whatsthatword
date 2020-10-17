express = require('express');
const router = express.Router();

// UserController
const userController = require('../controller/user.controller')


// add playlist
router.post('/register', userController.register);

// playlist login
// router.post('/login', (req res)userController.login);

module.exports = router; 
