const knex = require("knex");
require('dotenv').config();

const db = knex({
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        port: process.env.PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    },
    pool: {
        min: 2,
        max: 20,
    },
});

module.exports = { db };