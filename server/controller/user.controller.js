const express = require('express');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Word = require('../models/words.model');

const userController = {

    register(req, res) {
        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });

        User.findOne({ 'email': req.body.email }, (err, user) => {
            if (!user) {
                User.addUser(newUser, (err) => {
                    if (err) {
                        res.json({ success: false, message: 'Failed to register User' });
                    } else {
                        res.json({ success: true, message: 'User registered' })
                    }
                })
            } else {
                res.status(409).json({
                    message: "Email name already exist",
                    success: false
                })
            }
        });
    },

    login(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        User.findOne({ 'email': email }, (err, user) => {
            if (err) throw err;
            if (!user) return res.json({
                success: false,
                message: 'Email not found'
            })

            User.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign({ user: user }, process.env.SECRET, {
                        expiresIn: 604800 // 1 week
                    });
                    res.json({
                        success: true,
                        token: 'jwt ' + token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            username: user.username
                        }
                    })
                } else {
                    res.json({
                        success: false,
                        message: 'Wrong password'
                    });
                }
            })
        })
    },

    getProfile(req, res) {
        res.json({
            success: true,
            user: req.user
        });
    },

    getUserProfile(req, res) {
        const userId = req.params.userId
        User.findById({ _id: userId }).populate('addedWords').populate('favWords')
            .then(user => {
                res.status(200).json({ success: true, user: user });
            })
            .catch(err => { res.json({ success: false, message: 'API error getting user', err: err }); })
    },

    favWord(req, res) {
        User.getUserById({ _id: req.body.userId }, (err, user) => {
            if (err) {
                console.log(err)
                res.json({ success: false, message: 'API get user error' });
            }
            if (user) {
                Word.getWord(req.body.word, (err, word) => {
                    if (err) {
                        console.log(err)
                        res.json({ success: false, message: 'API get word error' });
                    }
                    if (word) {
                        user.favWords.push(word);
                        user.save();
                        res.status(200).json({ success: true, message: 'added fav word' });
                    }
                    else {
                        res.json({ success: false, message: 'Cannot find word' });
                    }
                });

            } else {
                res.json({ success: false, message: 'User does not exist' });
            }
        });
    },

    removeFavWord(req, res) {
        User.getUserById({ _id: req.body.userId }, (err, user) => {
            if (err) {
                console.log(err)
                res.json({ success: false, message: 'API get user error' });
            }
            if (user) {
                Word.getWord(req.body.word, (err, word) => {
                    if (err) {
                        console.log(err)
                        res.json({ success: false, message: 'API get word error' });
                    }
                    if (word) {
                        const wordId = word._id;
                        const updateFavWords = user.favWords;
                        const wordToDeleteIndex = updateFavWords.indexOf(wordId);
                        updateFavWords.splice(wordToDeleteIndex, 1)
                        user.favWords = updateFavWords;
                        user.save();
                        res.status(200).json({ success: true, message: 'Deleted fav word' });
                    } else {
                        res.json({ success: false, message: 'Cannot find word' });
                    }
                });

            } else {
                res.json({ success: false, message: 'User does not exist' });
            }
        });

    },

    getFriendUser(req, res) {
        const { friendId } = req.params;
        User.findById({ _id: friendId }).populate('addedWords').populate('favWords')
            .then(user => {
                res.status(200).json({ success: true, user: user });
            })
            .catch(err => { res.json({ success: false, message: 'API error getting user', err: err }); });
    },

    getAllUser(req, res) {
        User.find({}, function (err, users) {
            if (err) {
                console.log(err)
                res.status(500).json({ success: false, message: 'API get user error' });
            }
            else {
                var userMap = [];
                users.forEach(function (user) {
                    userMap.push({
                        userId: user._id,
                        username: user.username
                    })
                });

                res.send(userMap);
            }
        });
    }
}

module.exports = userController;