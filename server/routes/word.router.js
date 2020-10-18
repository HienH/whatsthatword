express = require('express');
const router = express.Router();

// Word controller
const wordController = require('../controller/word.controller')
router.post('/addWord', wordController.addWord);

module.exports = router; 
