'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertUsers = exports.getEmail = undefined;

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
// let connectionString = process.env.DATABASE_URL;
// Database connection String
var connectionString = "postgres://Frank:jfrank@127.0.0.1:5432/epicmail";

var usersTable = 'users';

var getEmail = function getEmail(email) {
  return new Promise(function (resolve, reject) {
    var client = new _pg.Client(connectionString);
    client.connect().then(function () {
      var sql = 'SELECT * FROM ' + usersTable + ' WHERE email=$1';
      var params = [email];
      client.query(sql, params).then(function (result) {
        resolve(result.rows);
        client.end();
      }).catch(function (e) {
        reject(e);
      });
    }).catch(function (e) {
      reject(e);
    });
  });
};

var insertUsers = function insertUsers(firstName, lastName, email, password, token) {
  return new Promise(function (resolve, reject) {
    var client = new _pg.Client(connectionString);
    client.connect().then(function () {
      var sql = 'INSERT INTO ' + usersTable + '(firstname,lastname,email,password,token)VALUES($1,$2,$3,$4,$5)';
      var params = [firstName, lastName, email, password, token];
      client.query(sql, params).then(function (result) {
        resolve(result.rows);
        client.end();
      }).catch(function (e) {
        reject(e);
      });
    }).catch(function (e) {
      reject(e);
    });
  });
};

var clearTable = function clearTable(tableName) {
  return new Promise(function (resolve, reject) {
    var client = new _pg.Client(connectionString);
    client.connect().then(function () {
      var sql = 'DELETE FROM ' + tableName + ';';
      if (tableName === usersTable) {
        sql = 'DELETE FROM ' + tableName + ' WHERE user_level != 2;';
      }
      client.query(sql).then(function (result) {
        resolve(result.rowCount);
        client.end();
      }).catch(function (e) {
        return reject(e);
      });
    }).catch(function (e) {
      return reject(e);
    });
  });
};

exports.getEmail = getEmail;
exports.insertUsers = insertUsers;
//# sourceMappingURL=db.js.map