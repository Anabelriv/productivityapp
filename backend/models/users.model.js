const { db } = require("../config/db.js");

const _register = (user_email, password) => {
    return db("users")
        .insert({ user_email, password })
        .returning(["id", "user_email"]);
};

const _login = (user_email) => {
    return db("users")
        .select("id", "user_email", "password")
        .where({ user_email });
};

module.exports = {
    _register,
    _login
};