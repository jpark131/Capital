const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
const users = await User.find().sort('name');
    res.send(users);
});

router.post('/', async (req, res) => {
    //login code here
});

module.exports = router;