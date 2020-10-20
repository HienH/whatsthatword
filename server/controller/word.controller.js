const Word = require('../models/words.model');
var ObjectID = require('mongodb').ObjectID;
const User = require('../models/user.model');
const googleDictionaryApi = require("google-dictionary-api")


exports.addWord = function (req, res) {

    Word.getWord(req.body.word, (err, word) => {
        if (err) {
            console.log(error)
            res.json({ success: false, message: 'API save error' });
        }
        if (!word) {
            const newWord = new Word();
            newWord.word = req.body.word
            getDefinition(req.body.word, newWord)
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

    Word.find().sort({ word: 1 })
        .then(words => res.status(200).json({
            allWords: words
        }))
        .catch(err => res.status(400).json('Error:' + err));
};

async function getDefinition(word, newWord) {
    let response = await googleDictionaryApi.search(word, 'en')
    if (response.err) { console.log('error'); }
    else {
        if (response[0]['meaning']['noun']) {
            const noun = response[0]['meaning']['noun'][0]['definition'];
            const nounExample = response[0]['meaning']['noun'][0]['example'];
            newWord.noun.definition = noun;
            newWord.noun.example = nounExample;
        }
        if (response[0]['meaning']['adjective']) {
            const adjective = response[0]['meaning']['adjective'][0]['definition'];
            const adjectiveExample = response[0]['meaning']['adjective'][0]['example'];
            newWord.adjective.definition = adjective;
            newWord.adjective.example = adjectiveExample;

        }
        if (response[0]['meaning']['verb']) {
            const verb = response[0]['meaning']['verb'][0]['definition'];
            const verbExample = response[0]['meaning']['verb'][0]['example'];
            newWord.verb.definition = verb;
            newWord.verb.example = verbExample;
        }
        return newWord.save();
    }
}
