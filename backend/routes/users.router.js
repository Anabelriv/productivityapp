const express = require('express');
const { register, login, findUser } = require('../controllers/users.controller.js');
const { verifyToken } = require('../middlewares/verifyToken.js');
const user_router = express.Router();

user_router.post('/signup', register);
user_router.post('/login', login);
user_router.get('/user-info', verifyToken, findUser);
user_router.get('/verify', verifyToken, (req, res) => {
    res.sendStatus(200);
});
user_router.get('/logout', (req, res) => {
    res.clearCookie('token', 'userEmail');
    req.user = null;
    res.sendStatus(200);
});

module.exports = { user_router };