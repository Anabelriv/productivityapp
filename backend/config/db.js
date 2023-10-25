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
});

module.exports = { db };

/*
server
    |_ config
    |_ controllers
    |_ models
    |_ routes
*/


// const { Client } = require('pg')

// const client = new Client({
//     host: "dpg-ckfbsimafg7c739s9ukg-a",
//     user: "anabelapp_user",
//     port: 5432,
//     password: "QObaCz6N3774IosppI6yVstZ3CxdD0Va",
//     database: "anabelapp"
// })

// client.connect();

// client.query(`Select * from users`, (err, res) => {
//     if (!err) {
//         console.log(res.rows);
//     } else {
//         console.log(err.message);
//     }
//     client.end;
// })