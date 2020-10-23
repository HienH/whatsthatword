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

    getUser(req, res) {
        res.json({
            success: true,
            user: req.user
        });
    },

    favWord(req, res) {
        User.getUserById({ _id: req.body.id }, (err, user) => {
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
                    user.favWords.push(word);
                    user.save();
                    res.json({ success: true, message: 'added fav word' });
                });

            } else {
                res.json({ success: false, message: 'User does not exist' });
            }
        });
    }
}

module.exports = userController;