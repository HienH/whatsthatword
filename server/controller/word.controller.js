const Word = require('../models/words.model');

const wordController = {

    addWord(req, res) {
        const newWord = new Word();

        Word.findOne({ 'word': req.body.word }, (err, word) => {
            if (!word) {
                newWord.word = req.body.word;
                newWord.save((err, word) => {
                    if (err) {
                        console.log(err);
                        res.json({
                            succuss: false, err: err
                        })
                    }
                    else {
                        res.status(200).json({
                            succuss: true,
                            word: word
                        })
                    };
                })
            } else {
                res.status(409).json({
                    message: "Word already exist",
                    success: false
                })
            }
        });
    }
}


module.exports = wordController;