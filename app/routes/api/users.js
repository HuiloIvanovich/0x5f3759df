const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const vkValidate = require('../../../config/vkSign');
const jwt = require('jsonwebtoken');
const config = require('config');
const axios = require('axios');
const User = require('../../models/User');

// @route   GET api/users/paersonal
// @desc    Get current user's travels
// @access  Private
router.get('/personal', auth, async (req, res) => {
    res.json({msg: "Auth route"});
});

// @route   GET api/users/auth
// @desc    Auth user
// @access  Public
router.get('/auth', async (req, res) => {
    if(!req.body.user_id || !req.body.params) {
        return res.status(400).json({err: "Invalid arguments"});
    }
    if(!vkValidate(req.params)) {
        res.status(401).json({err: "Authorization failed"});
    }
    try {
        const user = await User.findOne({id: req.body.user_id});

        if (!user) {
            return res.status(400).json({err: "User doesn't exist"});
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 360000}, (err, token) => {
            if(err) {
                throw err;
            }
            else {
                res.json({user: user, token: token});
            }
        });

    } catch(err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

// @route   GET api/users/register
// @desc    Register new user
// @access  Public
router.post('/register', async (req, res) => {
    if(!req.body.user_id || !req.body.params) {
        return res.status(400).json({err: "Invalid arguments"});
    }
    if(!vkValidate(req.params)) {
        res.status(401).json({err: "Authorization failed"});
    }
    try {
        let user = await User.findOne({id: req.user_id});

        if (user) {
            return res.status(400).json({err: "User already exist"});
        }

        user = new User({id: req.body.user_id});

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 360000}, (err, token) => {
            if(err) {
                throw err;
            }
            else {
                res.json({token});
            }
        });

    } catch(err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

// @route   GET api/users/update
// @desc    Register new user
// @access  Private
router.post('/update', auth, async (req, res) => {
    if(!req.user) {
        return res.status(400).json({err: "Invalid arguments"});
    }
    try {
        //await User.findOneAndUpdate({id: req.user.id}, {});

    } catch(err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;