const { _register, _login } = require("../models/users.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
    const { user_email, password } = req.body;
    try {
        const user = await _login(user_email.toLowerCase(), password);

        if (!user) {
            return res.status(401).json({ msg: "Email or password is incorrect" });
        }

        const token = jwt.sign({ user_email }, process.env.JWT_SECRET, { expiresIn: '1hr' });
        res.json({ token, user_email: user.user_email });
    } catch (err) {
        console.log(err);
        res.status(404).json({ msg: "Something went wrong" });
    }
};

const register = async (req, res) => {
    const { user_email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    if (!user_email) {
        return res.status(400).json({ msg: 'User email is required' });
    }

    try {
        const newUser = await _register(user_email.toLowerCase(), hashedPassword);
        const token = jwt.sign({ user_email }, process.env.JWT_SECRET, { expiresIn: '1hr' });
        res.json({ user_email: newUser.user_email, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ detail: err.detail });
    }
};

module.exports = {
    register,
    login,
};
