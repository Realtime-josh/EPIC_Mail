'use strict';

Object.defineProperty(exports, "__esModule", {
     value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _validators = require('../helpers/validators');

var _responses = require('../helpers/responses');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _db = require('../crud/db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();


var messageRouter = _express2.default.Router();

messageRouter.post('/messages', _validators.senderItem, _validators.verifyToken, function (req, res) {
     var _req$body = req.body,
         userDetails = _req$body.userDetails,
         receiverEmail = _req$body.receiverEmail,
         subject = _req$body.subject,
         message = _req$body.message,
         status = _req$body.status;
     var receiverId = req.receiverId;

     var senderId = userDetails[0].userid;
     (0, _db.getEmail)(receiverEmail).then(function (result) {
          if (result.length > 0) {
               var _receiverId = result[0].userid;
               var createdOn = new Date();
               (0, _db.insertMessage)(_receiverId, senderId, subject, message, status, createdOn);
               (0, _responses.sendResponse)(res, 200, 'message sent', null);
          } else {
               (0, _responses.sendResponse)(res, 400, null, 'Could not retrieve email');
          }
     }).catch(function (e) {
          (0, _responses.sendResponse)(res, 400, null, 'cannot process request');
     });
});

exports.default = messageRouter;
//# sourceMappingURL=message.js.map