'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMessage = exports.validateUserSignIn = exports.validateUserEntry = exports.trimAllSpace = exports.filterInput = exports.isPositiveInteger = undefined;

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _users = require('../models/users');

var _messages = require('../models/messages');

var _responses = require('./responses');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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


exports.isPositiveInteger = isPositiveInteger;
exports.filterInput = filterInput;
exports.trimAllSpace = trimAllSpace;
exports.validateUserEntry = validateUserEntry;
exports.validateUserSignIn = validateUserSignIn;
exports.createMessage = createMessage;
//# sourceMappingURL=validators.js.map