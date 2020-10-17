const express = require('express');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const passport = require('passport');

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
                        res.json({ success: false, msg: 'Failed to register User' });
                    } else {
                        res.json({ success: true, msg: 'User registered' })
                    }
                })
            } else {
                res.status(409).json({
                    message: "Email name already exist",
                    sucess: false
                })
            }
        });
    },
}

module.exports = userController;