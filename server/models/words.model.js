const mongoose = require('mongoose');

const WordSchema = mongoose.Schema({
    word: {
        type: String,
        require: true,
        trim: true,
    },
    adjective: {
        definition: {
            type: String,

        },
        example: {
            type: String,

        }
    },
    noun: {
        definition: {
            type: String,

        },
        example: {
            type: String,

        }
    },
    verb: {
        definition: {
            type: String,

        },
        example: {
            type: String,

        }
    },
});

const Word = module.exports = mongoose.model('Word', WordSchema);

module.exports.getWord = function (word, callback) {
    const query = { word: word }
    Word.findOne(query, callback);
};

