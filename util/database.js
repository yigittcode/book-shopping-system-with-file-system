const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host : '127.0.0.1',
    password: 'root',
    database : 'book-shop',
    user: 'root'
});

module.exports = pool;