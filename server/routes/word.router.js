express = require('express');
const passport = require('passport');
const router = express.Router();

// Word controller
const wordController = require('../controller/word.controller')
router.post('/addWord', wordController.addWord);

router.get('/allWords', wordController.getAllWord);

// get other playlist songs
router.get('/:word', wordController.getWord);

module.exports = router; 
