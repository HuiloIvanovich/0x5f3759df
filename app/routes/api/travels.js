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
const daily = require('../../services/travels/daily');

// @route   GET api/travels/test
// @params  -
// @desc    Travels test route
// @access  Public
// @return  Message
router.get('/test', async (req, res) => {
    res.json({msg: "Travels route"});
});

// @route   GET api/travels/test2
// @params  -
// @desc    Travels test2 route
// @access  Public
// @return  Travel json
router.get('/test2', async (req, res) => {
    let travel = new Travel();
    travel.users.push({id: "123", isAdmin: true});
    const data = {name: "test", dateFrom: Date.now(), dateTo: Date.now() + 20, country: {iata: "test"}, city: {iata: "test"}};
    travel.data = data;
    res.json(travel);
    await travel.save();
});

// @route   GET api/travels/
// @params  -
// @desc    Get user's travels
// @access  Private
// @return  Array of travel jsons
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findOne({id: req.user.id});
        const travels = await Travel.find({"users.user": user});
        res.json(travels);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/travels/popular
// @params  -
// @desc    Get popular travels
// @access  Private
// @return  Array of travel jsons
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
// @params  -
// @desc    Get popular travels
// @access  Private
// @return  Array of travel jsons
router.get('/daily', auth, async (req, res) => {
    try {
        const travels = daily.getDaily();
        res.json(travels);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/travels/
// @params  Travel json
// @desc    Create new travel
// @access  Private
// @return  Travel json
router.post('/', auth, async (req, res) => {
    if(!req.body.travel) {
        return res.status(400).json({err: "Invalid arguments"});
    }
    try {
        let travel = new Travel();
        travel.data = req.body.travel.data;
        travel.users = req.body.travel.users;
        await travel.save();
        res.json(travel);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/travels/update
// @params  {travel json, travel _id}
// @desc    Update existing travel
// @access  Private
// @return  Travel json
router.post('/update', auth, async (req, res) => {
    if(!req.body.travel || !req.body._id) {
        return res.status(400).json({err: "Invalid arguments"});
    }
    try {
        await Travel.findByIdAndUpdate(req.body._id, {data: req.body.travel.data, users: req.body.travel.users});
        res.json(Travel.findById(req.body._id));
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/travels/delete
// @params  Travel _id
// @desc    Delete existing travel
// @access  Private
// @return  -
router.post('/delete', auth, async (req, res) => {
    if(!req.body._id) {
        return res.status(400).json({err: "Invalid arguments"});
    }
    try {
        await Travel.findByIdAndDelete(req.body._id);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

