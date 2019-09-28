const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const vkValidate = require('../../../config/vkSign');
const jwt = require('jsonwebtoken');
const config = require('config');
const axios = require('axios');
const User = require('../../models/User');
const Travel = require('../../models/Travel');

// @route   GET api/flights/test
// @params  -
// @desc    Travels flights route
// @access  Public
// @return  Message
router.get('/test', async (req, res) => {
    res.json({msg: "Flights route"});
});

// @route   GET api/flights/advisory
// @params  {}
// @desc    Get flights advise
// @access  Public
// @return  Message
router.get('/advisory', async (req, res) => {
    res.json({msg: "Flights route"});
});