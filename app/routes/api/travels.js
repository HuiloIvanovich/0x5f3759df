const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const vkValidate = require('../../../config/vkSign');
const jwt = require('jsonwebtoken');
const config = require('config');
const axios = require('axios');
const User = require('../../models/User');
const Travel = require('../../models/Travel');
const Hotel = require('../../models/Hotel');
const Checklist = require('../../models/Advisors/Checklist');
const Flight = require('../../models/Flight');
const popular = require('../../services/travels/popular');
const daily = require('../../services/travels/daily');
const custom = require('../../services/travels/custom');

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

// @route   GET api/travels/my
// @params  -
// @desc    Get user's travels
// @access  Private
// @return  Array of travel jsons
router.get('/my', auth, async (req, res) => {
    try {
        const user = await User.findOne({id: req.user.id});
        const travels = await Travel.find({"users.user": user})
            .populate('flight').populate('hotel').populate('users.user');
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
        // const travels = await popular.getPopular()
        //     .populate('flight').populate('hotel').populate('users.user');
        const travels = await Travel.find({isPopular: true})
            .populate('flight').populate('hotel').populate('users.user');
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
        // const travels = await daily.getDaily()
        //     .populate('flight').populate('hotel').populate('users.user');
        const travels = await Travel.find({isDaily: true})
            .populate('flight').populate('hotel').populate('users.user');
        res.json(travels);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/travels/new
// @params  Travel json
// @desc    Create new travel
// @access  Private
// @return  Travel json
router.post('/new', auth, async (req, res) => {
    if(!req.body.travel) {
        return res.status(400).json({err: "Invalid arguments"});
    }
    try {
        let travel = new Travel();
        const {name, hotel, flight, cost, minBudget, maxBudget, dateFrom, dateTo, visas, country, city, backgroundImage} = req.body.travel;
        travel.name = name;
        travel.cost = cost;
        travel.minBudget = minBudget;
        travel.maxBudget = maxBudget;
        travel.dateFrom = dateFrom;
        travel.dateTo = dateTo;
        travel.visas = visas;
        travel.city = city;
        travel.country = country;
        travel.backgroundImage = backgroundImage;
        const _users = await Promise.all(req.body.travel.users.map(async (element) => {
            const user = await User.findOne({id: element.user.id});
            return {user: user, isAdmin: true};
        }));
        travel.users = _users;
        travel.isPopular = false;
        travel.isDaily = false;
        const _flight = new Flight(flight);
        await _flight.save();
        const _hotel = new Hotel(hotel);
        await _hotel.save();
        travel.flight = _flight;
        travel.hotel = _hotel;

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

// @route   GET api/travels/generate
// @params  {budgetMin, budgetMax, dateTo, dateFrom, visas, airlines}
// @desc    Generate new travel based on query
// @access  Private
// @return  Travel json
router.get('/custom', auth, async (req, res) => {
    if(!req.query.budgetMin || !req.query.budgetMax || !req.query.dateTo || !req.query.dateFrom || !req.query.visas|| !req.query.airlines) {
        return res.status(400).json({err: "Invalid arguments"});
    }
    try {
        let data = custom.getCustom(req.query.budgetMin, req.query.budagetMax, req.query.dateTo, req.query.dateFrom, req.query.visas, req.query.airlines);

    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

