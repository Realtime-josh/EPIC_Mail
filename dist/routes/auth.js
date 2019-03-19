'use strict';

Object.defineProperty(exports, "__esModule", {
     value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _validators = require('../helpers/validators');

var _responses = require('../helpers/responses');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authRouter = _express2.default.Router();
_dotenv2.default.config();

authRouter.post('/signup', _validators.validateUserEntry, function (req, res) {
     var token = req.token;

     (0, _responses.sendResponse)(res, 200, token, null);
});

authRouter.post('/login', _validators.validateUserSignIn, function (req, res) {
     var payload = req.payload;

     var token = _jsonwebtoken2.default.sign(payload, process.env.SECRET_KEY);
     res.header('Authorization', 'Bearer ' + token);
     (0, _responses.sendResponse)(res, 200, token, null);
});

exports.default = authRouter;
//# sourceMappingURL=auth.js.map