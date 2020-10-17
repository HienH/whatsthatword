const mongoose = require('mongoose');

const Word = mongoose.Schema({
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

const Word = module.exports = mongoose.model('Word', vocabularyWord);