'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessagesByUnread = exports.getMessagesById = exports.insertMessage = exports.getUserEmail = undefined;

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
// let connectionString = process.env.DATABASE_URL;
// Database connection String
var connectionString = "postgres://Frank:jfrank@127.0.0.1:5432/epicmail";

var usersTable = 'users';
var messageTable = 'message';

var getUserEmail = function getUserEmail(email) {
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

var getMessagesById = function getMessagesById(userId) {
  return new Promise(function (resolve, reject) {
    var client = new _pg.Client(connectionString);
    client.connect().then(function () {
      var sql = 'SELECT message,subject FROM ' + messageTable + ' WHERE receiverid=$1';
      var params = [userId];
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

var getMessagesByUnread = function getMessagesByUnread(userId) {
  return new Promise(function (resolve, reject) {
    var client = new _pg.Client(connectionString);
    client.connect().then(function () {
      var sql = 'SELECT message,subject,status FROM ' + messageTable + ' WHERE receiverid=$1';
      var params = [userId];
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

var insertMessage = function insertMessage(receiverid, senderid, subject, message, status, createdon) {
  return new Promise(function (resolve, reject) {
    var client = new _pg.Client(connectionString);
    client.connect().then(function () {
      var sql = 'INSERT INTO ' + messageTable + '(receiverid,senderid,subject,message,status,createdon)VALUES($1,$2,$3,$4,$5,$6)';
      var params = [receiverid, senderid, subject, message, status, createdon];
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

exports.getUserEmail = getUserEmail;
exports.insertMessage = insertMessage;
exports.getMessagesById = getMessagesById;
exports.getMessagesByUnread = getMessagesByUnread;
//# sourceMappingURL=db.js.map