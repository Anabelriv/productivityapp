const { register, login } = require("../controllers/users.controller.js");
const express = require("express");
const { verifyToken } = require("../middlewares/verify.token.js");
const user_router = express.Router();

user_router.post("/signup", register);
user_router.post("/login", login);
user_router.get("/verify", verifyToken, (req, res) => {
    res.sendStatus(200);
});
user_router.get("/logout", (req, res) => {
    res.clearCookie("token");
    req.user = null;
    res.sendStatus(200);
});

module.exports = { user_router };