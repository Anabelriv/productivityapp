const { db } = require("../config/db.js");

const _register = (email, password) => {
    return db("signinusers")
        .insert({ email, password })
        .returning(["id", "email"]);
};

const _login = (email) => {
    return db("signinusers")
        .select("id", "email", "password")
        .where({ email });
};

module.exports = {
    _register,
    _login
};