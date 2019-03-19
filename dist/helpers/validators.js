'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.senderItem = exports.atEpicMail = exports.verifyToken = exports.validateUserSignIn = exports.validateUserEntry = exports.trimAllSpace = exports.filterInput = exports.isPositiveInteger = undefined;

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _responses = require('./responses');

var _db = require('../crud/db');

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;


_dotenv2.default.config();
// let connectionString = process.env.DATABASE_URL;


var isPositiveInteger = function isPositiveInteger(s) {
  return (/^\+?[1-9][\d]*$/.test(s)
  );
};

var filterInput = function filterInput(input) {
  var pattern = /[~!#$%^&*()+={}:'"<>?;',]/;
  var result = pattern.test(input);
  return result;
};

var trimAllSpace = function trimAllSpace(str) {
  return str.replace(/\s+/g, '');
};

var atEpicMail = function atEpicMail(input) {
  var result = input.match(/@epicmail.com/g);
  if (result === null) {
    return false;
  } else if (result.length > 0) {
    return true;
  }
};

var validateUserEntry = function validateUserEntry(req, res, next) {
  var _req$body = req.body,
      email = _req$body.email,
      firstName = _req$body.firstName,
      lastName = _req$body.lastName,
      password = _req$body.password;


  if (typeof email === 'undefined' || typeof firstName === 'undefined' || typeof lastName === 'undefined' || typeof password === 'undefined') {
    (0, _responses.sendResponse)(res, 400, null, "Ensure that all fields are correctly filled out");
  } else {
    var trimFirstName = trimAllSpace(firstName);
    var trimLastName = trimAllSpace(lastName);
    var trimEmail = trimAllSpace(email);
    if (_validator2.default.isEmail(email) && atEpicMail(trimEmail) && !filterInput(trimFirstName) && trimFirstName.length > 2 && !filterInput(trimLastName) && trimLastName.length > 2 && !filterInput(trimEmail) && password.length > 6) {
      var _req$body2 = req.body,
          _firstName = _req$body2.firstName,
          _lastName = _req$body2.lastName,
          _email = _req$body2.email,
          _password = _req$body2.password;

      var payload = {
        firstName: _firstName,
        lastName: _lastName,
        email: _email
      };
      var token = _jsonwebtoken2.default.sign(payload, process.env.SECRET_KEY);
      req.token = token;
      (0, _db.getEmail)(_email).then(function (result) {
        if (result.length > 0) {
          (0, _responses.sendResponse)(res, 400, null, 'Not allowed to sign up');
        } else {
          var hashedPassword = _bcryptjs2.default.genSalt(10, function (err, salt) {
            _bcryptjs2.default.hash(_password, salt, function (err, hash) {
              (0, _db.insertUsers)(_firstName, _lastName, _email, hash, token);
              next();
            });
          });
        }
      }).catch(function (err) {
        res.send(err);
      });
    } else {
      (0, _responses.sendResponse)(res, 400, null, 'Ensure username, email and password are valid entries');
    }
  }
};

var validateUserSignIn = function validateUserSignIn(req, res, next) {
  var _req$body3 = req.body,
      email = _req$body3.email,
      password = _req$body3.password;

  if (typeof email === 'undefined' || typeof password === 'undefined') {
    (0, _responses.sendResponse)(res, 400, null, 'Something went wrong');
  } else {
    var trimEmail = trimAllSpace(email);
    if (_validator2.default.isEmail(email) && atEpicMail(trimEmail) && !filterInput(trimEmail) && password.length > 6) {
      (0, _db.getEmail)(email).then(function (result) {
        _bcryptjs2.default.compare(password, result[0].password, function (err, data) {
          if (!data) {
            (0, _responses.sendResponse)(res, 400, null, 'Password Incorrect');
          } else {
            var payload = {};
            payload.userId = result[0].id;
            payload.firstName = result[0].firstname;
            payload.lastName = result[0].lastname;
            payload.email = result[0].email;
            req.payload = payload;
            next();
          }
        });
      }).catch(function (e) {
        (0, _responses.sendResponse)(res, 400, null, "unable to login this user");
      });
    } else {
      (0, _responses.sendResponse)(res, 400, null, 'Ensure email and password are valid entries');
    }
  }
};

var verifyToken = function verifyToken(req, res, next) {
  var bearerHeader = req.get('Authorization');
  if (typeof bearerHeader !== "undefined") {
    var splitBearerHeader = bearerHeader.split(" ");
    var token = splitBearerHeader[1];
    _jsonwebtoken2.default.verify(token, process.env.SECRET_KEY, function (err, data) {
      if (err) {
        (0, _responses.sendResponse)(res, 400, null, "authentication failed!");
      } else {
        var decrypt = _jsonwebtoken2.default.verify(token, process.env.SECRET_KEY);
        req.body.decrypted = decrypt;
        (0, _db.getEmail)(req.body.decrypted.email).then(function (result) {
          req.body.userDetails = result;
          next();
        }).catch(function () {
          // console.log(e);
          (0, _responses.sendResponse)(res, 403, null, 'Invalid user');
        });
      };
    });
  } else {
    (0, _responses.sendResponse)(res, 404, null, "Cannot authenticate user");
  }
};

var senderItem = function senderItem(req, res, next) {
  var _req$body4 = req.body,
      receiverEmail = _req$body4.receiverEmail,
      subject = _req$body4.subject,
      message = _req$body4.message,
      status = _req$body4.status;

  if (typeof receiverEmail === 'undefined' || typeof subject === 'undefined' || typeof message === 'undefined' || typeof status === 'undefined') {
    (0, _responses.sendResponse)(res, 400, "All fields must be filled out correctly");
  } else {
    var trimEmail = trimAllSpace(receiverEmail);
    if (_validator2.default.isEmail(receiverEmail) && atEpicMail(trimEmail) && !filterInput(trimEmail)) {
      (0, _db.getEmail)(receiverEmail).then(function (result) {
        if (result.length > 0) {
          var receiverId = result[0].userid;
          req.receiverId = receiverId;
          next();
        } else {
          (0, _responses.sendResponse)(res, 404, null, 'could not fetch email');
        };
      }).catch(function (e) {
        (0, _responses.sendResponse)(res, 400, null, "unable to retrieve email");
      });
    } else {
      (0, _responses.sendResponse)(res, 400, null, 'unable process');
    };
  };
};

exports.isPositiveInteger = isPositiveInteger;
exports.filterInput = filterInput;
exports.trimAllSpace = trimAllSpace;
exports.validateUserEntry = validateUserEntry;
exports.validateUserSignIn = validateUserSignIn;
exports.verifyToken = verifyToken;
exports.atEpicMail = atEpicMail;
exports.senderItem = senderItem;
//# sourceMappingURL=validators.js.map