"use strict";

Object.defineProperty(exports, "__esModule", {
      value: true
});
exports.contactRouter = undefined;

var _validators = require("../helpers/validators");

var _users = require("../models/users");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contactRouter = _express2.default.Router();

contactRouter.post("/createaccount", _validators.validateUserEntry, function (req, res) {
      var contactItem = req.contactItem;

      _users.user.users.push(contactItem);
      res.status(200).send({
            status: 200,
            message: "User successfully created",
            contactItem: contactItem
      });
});

contactRouter.post("/signin", _validators.validateUserSignIn, function (req, res) {
      var accountDetails = req.accountDetails;

      res.status(200).send({
            status: 200,
            message: "Scuccessfully Signed In",
            UserDetails: accountDetails
      });
});

exports.contactRouter = contactRouter;
//# sourceMappingURL=contacts.js.map