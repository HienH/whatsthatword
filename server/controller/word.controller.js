const Word = require('../models/words.model');
var ObjectID = require('mongodb').ObjectID;
const User = require('../models/user.model');


exports.addWord = function (req, res) {

    Word.getWord(req.body.word, (err, word) => {
        if (err) {
            console.log(error)
            res.json({ success: false, message: 'API save error' });
        }
        if (!word) {
            const newWord = new Word();
            newWord.word = req.body.word
            newWord.save();
            User.getUserById({ _id: req.body.id }, (err, user) => {
                if (err) {
                    console.log(err)
                    res.json({ success: false, message: 'API save error' });
                }
                if (user) {
                    user.addedWords.push(newWord);
                    user.save();
                    res.json({ success: true, message: 'added word' });
                } else {
                    res.json({ success: false, message: 'User does not exist' });
                }
            });

        } else {
            res.json({ success: false, message: 'word already exist' });
        }
    });
};

exports.getAllWord = function (req, res) {

    Word.find()
        .then(words => res.status(200).json({
            words: words
        }))
        .catch(err => res.status(400).json('Error:' + err));
};

