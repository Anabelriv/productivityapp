const { _register, _login } = require("../models/users.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
    try {
        const row = await _login(req.body.user_email.toLowerCase());
        // email
        if (row.length === 0)
            return res.status(404).json({ msg: "email not found" });
        // password
        const match = await bcrypt.compare(req.body.password + "", row[0].password);
        if (!match) return res.status(404).json({ msg: "wrong password" });
        // succesful login
        const id = row[0].id;
        const user_email = row[0].user_email;
        // my secret
        const secret = process.env.ACCESS_TOKEN_SECRET;
        // token
        const accessToken = jwt.sign({ id, user_email }, secret, {
            expiresIn: "60s",
        });
        // server cookies
        res.cookie("token", accessToken, {
            httpOnly: true,
            maxAge: 60 * 1000,
        });
        // response with token
        res.json({ token: accessToken });
    } catch (err) {
        console.log(err);
        res.status(404).json({ msg: "something went wrong" });
    }
};

const register = async (req, res) => {
    const { user_email, password } = req.body;
    if (!user_email) {
        return res.status(400).json({ msg: 'user_email is required' });
    }
    const lower_email = user_email.toLowerCase();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password + "", salt);

    try {
        const row = await _register(lower_email, hash);
        res.json(row);
    } catch (err) {
        console.log(err);
        res.status(404).json({ msg: 'email already exists' });
    }
};

module.exports = {
    register,
    login,
};