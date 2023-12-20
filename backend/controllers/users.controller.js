const { _register, _login } = require("../models/users.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const findUser = async (req, res) => {
    console.log("user in controller ======>", req.user.user_email)
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    try {
        const data = await _getUser(req.user.user_email)
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: "something went wrong" })
    }
}
const login = async (req, res) => {
    const { user_email, password } = req.body;
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    try {
        const user = await _login(user_email, password);
        console.log('User:', user);
        if (!user) {
            return res.status(401).json({ msg: "Email or password is incorrect" });
        }
        const userid = user.id;
        const userEmail = user.user_email;
        const secret = process.env.JWT_SECRET;
        const accessToken = jwt.sign({ userid, userEmail }, secret, { expiresIn: "10000s" });
        res.cookie("token", accessToken, {
            httpOnly: true,
            maxAge: 1000 * 1000,
        });
        res.json({ token: accessToken, userEmail })
    } catch (err) {
        console.log(err);
        res.status(404).json({ msg: "Something went wrong" });
    }
};


const register = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    const {
        user_email,
        password
    } = req.body;
    const lower_email = user_email.toLowerCase();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password + '', salt);
    try {
        const row = await _register(lower_email, hash)
        res.json(row)
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: "user already exits" })
    }
};


module.exports = {
    register,
    login,
    findUser
};
