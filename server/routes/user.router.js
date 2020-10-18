express = require('express');
const router = express.Router();

// User controller
const userController = require('../controller/user.controller')


router.post('/register', userController.register);
router.post('/login', userController.login);


module.exports = router; 
