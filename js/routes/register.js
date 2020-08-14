const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
    //register code here
    // validates user by calling validate method.
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checks if user is already in the database by looking up email for
    // other registered users with the same email
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    await user.save();

    res.send(user);
});

module.exports = router;