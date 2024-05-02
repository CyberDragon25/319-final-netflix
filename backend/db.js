const mysql = require('mysql2/promise')
const db = mysql. createPool({
host: "127.0.0.1",
user: "username",
password: "password",
database: "secoms319"
})
module.exports = db;


