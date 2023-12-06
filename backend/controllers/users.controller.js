const { _register, _login } = require("../models/users.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();


const login = async (req, res) => {
    try {
        const row = await _login(req.body.user_email)
        if (row.length === 0) return res.status(404).json({ msg: "user not found" })
        const match = await bcrypt.compare(req.body.password + '', row[0].password)
        if (!match) return res.status(404).json({ msg: "wrong password" })
        const userid = row[0].id;
        const userEmail = row[0].user_email;
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const accessToken = jwt.sign({ userid, userEmail }, secret, { expiresIn: "10000s" });
        res.cookie("token", accessToken, {
            httpOnly: true,
            maxAge: 1000 * 1000,
        });
        res.json({ token: accessToken })
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: "something went wrong" })
    }
};

// const login = async (req, res) => {
//     const { user_email, password } = req.body;
//     try {
//         const user = await _login(user_email.toLowerCase(), password);

//         if (!user) {
//             return res.status(401).json({ msg: "Email or password is incorrect" });
//         }

//         const token = jwt.sign({ user_email }, process.env.JWT_SECRET, { expiresIn: '1hr' });
//         res.json({ token, user_email: user.user_email });
//     } catch (err) {
//         console.log(err);
//         res.status(404).json({ msg: "Something went wrong" });
//     }
// };


const register = async (req, res) => {
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
// const register = async (req, res) => {
//     const { user_email, password } = req.body;
//     const salt = bcrypt.genSaltSync(10);
//     const hashedPassword = bcrypt.hashSync(password, salt);

//     if (!user_email) {
//         return res.status(400).json({ msg: 'User email is required' });
//     }

//     try {
//         const newUser = await _register(user_email.toLowerCase(), hashedPassword);
//         const token = jwt.sign({ user_email }, process.env.JWT_SECRET, { expiresIn: '1hr' });
//         res.json({ user_email: newUser.user_email, token });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ detail: err.detail });
//     }
// };

module.exports = {
    register,
    login,
};
