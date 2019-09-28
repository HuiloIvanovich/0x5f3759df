const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const vkValidate = require('../../../config/vkSign');
const jwt = require('jsonwebtoken');
const config = require('config');
const axios = require('axios');
const User = require('../../models/User');
const Travel = require('../../models/Travel');

// @route   GET api/travels/test
// @desc    Travels test route
// @access  Public
router.get('/test', async (req, res) => {
    res.json({msg: "Travels route"});
});
