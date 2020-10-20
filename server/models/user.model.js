const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    addedWords: [{
        type: Schema.Types.ObjectId,
        ref: 'Word'
    }],
    favWords: [{
        type: Schema.Types.ObjectId,
        ref: 'Word'
    }]

});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.getByEmail = function (email, callback) {
    const query = { email: email }
    User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    })
};

module.exports.comparePassword = function (enteredPassword, hashPassword, callback) {
    bcrypt.compare(enteredPassword, hashPassword, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch)
    });
}


