'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRouterv2 = exports.authRouter = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('../models/users');

var _validators = require('../helpers/validators');

var _responses = require('../helpers/responses');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _db = require('../crud/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authRouter = _express2.default.Router();
var authRouterv2 = _express2.default.Router();

authRouter.post('/signup', _validators.validateUserEntry, function (req, res) {
  var contactItem = req.contactItem;

  _users.user.users.push(contactItem);
  res.status(200).send({
    status: 200,
    message: 'User successfully created',
    contactItem: contactItem
  });
});

authRouter.post('/login', _validators.validateUserSignIn, function (req, res) {
  var accountDetails = req.accountDetails;

  res.status(200).send({
    status: 200,
    message: 'Successfully Signed In',
    UserDetails: accountDetails
  });
});

authRouterv2.post('/signup', _validators.validateUserEntryy, function (req, res) {
  var token = req.token;

  (0, _responses.sendResponse)(res, 200, token, null);
});

authRouterv2.post('/login', _validators.validateUserSignInn, _validators.verifyToken, function (req, res) {
  var payload = req.payload;

  var token = _jsonwebtoken2.default.sign(payload, process.env.SECRET_KEY);
  res.header('Authorization', 'Bearer ' + token);
  res.status(202).send({
    message: 'successfully logged in',
    token: token
  });
});

exports.authRouter = authRouter;
exports.authRouterv2 = authRouterv2;
//# sourceMappingURL=auth.js.map