'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.senderItem = exports.verifyToken = exports.atEpicMail = exports.createMessage = exports.validateUserSignInn = exports.validateUserSignIn = exports.validateUserEntryy = exports.validateUserEntry = exports.trimAllSpace = exports.filterInput = exports.isPositiveInteger = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _users = require('../models/users');

var _messages = require('../models/messages');

var _responses = require('./responses');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _db = require('../crud/db');

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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


  var contactItem = { contact: [] };
  var trimFirstName = trimAllSpace(firstName);
  var trimLastName = trimAllSpace(lastName);
  var trimEmail = trimAllSpace(email);

  if (_validator2.default.isEmail(email) && !filterInput(trimFirstName) && trimFirstName.length > 2 && !filterInput(trimLastName) && trimLastName.length > 2 && !filterInput(trimEmail) && password.length > 6) {
    var checkEmail = _users.user.users.filter(function (result) {
      return result.email === email;
    });
    if (checkEmail.length < 1) {
      contactItem.userId = _users.user.lastUserId + 1;
      _users.user.lastUserId += 1;
      contactItem.firstName = trimFirstName;
      contactItem.lastName = trimLastName;
      contactItem.password = password;
      contactItem.email = email;
      contactItem.fullName = trimFirstName + ' ' + trimLastName;
      _users.usersList.set(String(contactItem.userId), contactItem);
      req.contactItem = contactItem;
      next();
    } else {
      (0, _responses.sendResponse)(res, 400, null, 'email already exist.');
    }
  } else {
    (0, _responses.sendResponse)(res, 400, null, 'Ensure username, email and password are valid entries');
  }
};

var validateUserSignIn = function validateUserSignIn(req, res, next) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;

  var trimEmail = trimAllSpace(email);
  if (_validator2.default.isEmail(email) && !filterInput(trimEmail) && password.length > 6) {
    var checkEmail = _users.user.users.filter(function (result) {
      return result.email === email;
    });

    if (checkEmail.length > 0 && checkEmail[0].password === password) {
      req.accountDetails = checkEmail[0];
      next();
    } else {
      (0, _responses.sendResponse)(res, 400, null, 'email and password is not associated with a registered account');
    }
  } else {
    (0, _responses.sendResponse)(res, 400, null, 'Ensure email and password are valid entries');
  }
};

var createMessage = function createMessage(req, res, next) {
  var _req$body3 = req.body,
      senderId = _req$body3.senderId,
      receiverId = _req$body3.receiverId,
      subject = _req$body3.subject,
      message = _req$body3.message,
      status = _req$body3.status;


  var verifyUsersExist = _users.user.users.filter(function (result) {
    return result.userId === senderId || result.userId === receiverId;
  });

  var verifyParentMessage = _messages.Message.messages.filter(function (result) {
    return result.senderId === senderId && result.receiverId === receiverId || result.senderId === receiverId && result.receiverId === senderId;
  });

  if (verifyUsersExist.length > 1) {
    if (verifyParentMessage.length > 0) {
      var getParentMessage = verifyParentMessage[0].parentMessageId;
      var messageDetails = {
        messageId: _messages.Message.lastMessageId + 1,
        senderId: senderId,
        receiverId: receiverId,
        parentMessageId: getParentMessage,
        subject: subject,
        message: message,
        status: status,
        createdOn: new Date()
      };
      _messages.Message.lastMessageId += 1;
      _messages.mapMessages.set(String(messageDetails.messageId), messageDetails);
      req.messageDetails = messageDetails;
      next();
    } else {
      var createParentMessageId = _messages.Message.lastParentMessageId + 1;
      var _messageDetails = {
        messageId: _messages.Message.lastMessageId + 1,
        senderId: senderId,
        receiverId: receiverId,
        parentMessageId: createParentMessageId,
        subject: subject,
        message: message,
        status: status,
        createdOn: new Date()
      };
      _messages.Message.lastMessageId += 1;
      _messages.Message.lastParentMessageId += 1;
      _messages.mapMessages.set(String(_messageDetails.messageId), _messageDetails);
      req.messageDetails = _messageDetails;
      next();
    }
  } else {
    (0, _responses.sendResponse)(res, 401, null, 'one or more users is not registered');
  }
};

// createMessage();


var validateUserEntryy = function validateUserEntryy(req, res, next) {
  var _req$body4 = req.body,
      email = _req$body4.email,
      firstName = _req$body4.firstName,
      lastName = _req$body4.lastName,
      password = _req$body4.password;


  if (typeof email === 'undefined' || typeof firstName === 'undefined' || typeof lastName === 'undefined' || typeof password === 'undefined') {
    (0, _responses.sendResponse)(res, 400, null, "Ensure that all fields are correctly filled out");
  } else {
    var trimFirstName = trimAllSpace(firstName);
    var trimLastName = trimAllSpace(lastName);
    var trimEmail = trimAllSpace(email);
    if (_validator2.default.isEmail(email) && atEpicMail(trimEmail) && !filterInput(trimFirstName) && trimFirstName.length > 2 && !filterInput(trimLastName) && trimLastName.length > 2 && !filterInput(trimEmail) && password.length > 6) {
      var _req$body5 = req.body,
          _firstName = _req$body5.firstName,
          _lastName = _req$body5.lastName,
          _email = _req$body5.email,
          _password = _req$body5.password;

      var payload = {
        firstName: _firstName,
        lastName: _lastName,
        email: _email
      };
      var token = _jsonwebtoken2.default.sign(payload, process.env.SECRET_KEY);
      req.token = token;
      (0, _db.getUserEmail)(_email).then(function (result) {
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

var validateUserSignInn = function validateUserSignInn(req, res, next) {
  var _req$body6 = req.body,
      email = _req$body6.email,
      password = _req$body6.password;

  if ((typeof email === 'undefined' ? 'undefined' : _typeof(email)) === undefined && (typeof password === 'undefined' ? 'undefined' : _typeof(password)) === undefined) {
    (0, _responses.sendResponse)(res, 400, null, 'Something went wrong');
  } else {
    var trimEmail = trimAllSpace(email);
    if (_validator2.default.isEmail(email) && atEpicMail(trimEmail) && !filterInput(trimEmail) && password.length > 6) {
      (0, _db.getUserEmail)(email).then(function (result) {
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
        (0, _db.getUserEmail)(req.body.decrypted.email).then(function (result) {
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
  var _req$body7 = req.body,
      receiverEmail = _req$body7.receiverEmail,
      subject = _req$body7.subject,
      message = _req$body7.message,
      status = _req$body7.status;

  if (typeof receiverEmail === 'undefined' || typeof subject === 'undefined' || typeof message === 'undefined' || typeof status === 'undefined') {
    (0, _responses.sendResponse)(res, 400, "All fields must be filled out correctly");
  } else {
    var trimEmail = trimAllSpace(receiverEmail);
    if (_validator2.default.isEmail(receiverEmail) && atEpicMail(trimEmail) && !filterInput(trimEmail)) {
      (0, _db.getUserEmail)(receiverEmail).then(function (result) {
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
exports.validateUserEntryy = validateUserEntryy;
exports.validateUserSignIn = validateUserSignIn;
exports.validateUserSignInn = validateUserSignInn;
exports.createMessage = createMessage;
exports.atEpicMail = atEpicMail;
exports.verifyToken = verifyToken;
exports.senderItem = senderItem;
//# sourceMappingURL=validators.js.map