require('dotenv').config();

const initOptions = {};
const pgp = require('pg-promise')(initOptions);

//console.log("DB_USER:", process.env.DB_USER);
//console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

const cn = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    port: 5432,
    database: 'metasapp'
};

const db = pgp(cn);

module.exports = db;