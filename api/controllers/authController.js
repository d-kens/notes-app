const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler =require('express-async-handler');


const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({message: "all fields are required"})
    }

    const foundUser = await User.findOne({ username }).exec();

    if(!foundUser || !foundUser.active) {
        return res.status(401).json({message: "unauthorized"})
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if(!match) return res.status(401).json({message: "unauthorized"})


});

const refresh = (req, res) => {

}

const logout = (req, res) => {

}

module.exports = {
    login,
    refresh,
    logout
}