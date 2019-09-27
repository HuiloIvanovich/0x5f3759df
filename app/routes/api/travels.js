const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const vkValidate = require('../../../config/vkSign');
const jwt = require('jsonwebtoken');
const config = require('config');
const axios = require('axios');
const User = require('../../models/User');
const Travel = require('../../models/Travel');
const popular = require('../../services/travels/popular');

// @route   GET api/travels/test
// @desc    Travels test route
// @access  Public
router.get('/test', async (req, res) => {
    res.json({msg: "Travels route"});
});

// @route   GET api/travels/test
// @desc    Travels test route
// @access  Public
router.get('/test2', async (req, res) => {
    let travel = new Travel();
    travel.users.push({id: "123", isAdmin: true});
    const data = {name: "test", dateFrom: Date.now(), dateTo: Date.now() + 20, country: {iata: "test"}, city: {iata: "test"}};
    travel.data = data;
    res.json(travel);
    await travel.save();
});

// @route   GET api/travels/my
// @desc    Get user's travels
// @access  Private
router.get('/my', auth, async (req, res) => {
    try {
        const travels = await Travel.find({"users.id": req.user.id});
        res.json(travels);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/travels/my
// @desc    Get user's travels
// @access  Private
router.get('/my', async (req, res) => {
    console.log(req.headers);
    try {
        const travels = await Travel.find({"users.id": req.user.id});
        res.json(travels);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/travels/popular
// @desc    Get popular travels
// @access  Private
router.get('/popular', auth, async (req, res) => {
    try {
        const travels = popular.getPopular();
        res.json(travels);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/travels/popular
// @desc    Get popular travels
// @access  Private
router.get('/popular', auth, async (req, res) => {
    try {
        const travels = popular.getPopular();
        res.json(travels);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

