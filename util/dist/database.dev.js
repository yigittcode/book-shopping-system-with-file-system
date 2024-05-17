"use strict";

var mysql = require('mysql2/promise');

var pool = mysql.createPool({
  host: 'localhost',
  password: 'root',
  database: 'products'
});

exports.getConnection = function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(pool.getConnection());

        case 3:
          console.log('Connection is succesfull');
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error("olmadı baboli");

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};