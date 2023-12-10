// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv').config();

// const verifyToken = (req, res, next) => {
//     const token = req.cookies.token || req.data.token || req.headers.authorization
//     // const token = req.header('Authorization');

//     if (!token) {
//         return res.status(401).json({ msg: 'No token, authorization denied' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (e) {
//         res.status(400).json({ msg: 'Token is not valid' });
//     }
// };

// module.exports = { verifyToken };


//vlada try

const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization

    if (!token) return res.status(401).json({ msg: "not authorized" })
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) return res.status(403).json({ msg: "verify token failed" });
        req.user = decode;
        next();
    });
};

module.exports = { verifyToken };