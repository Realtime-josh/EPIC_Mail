"use strict";

Object.defineProperty(exports, "__esModule", {
      value: true
});
exports.authRouter = undefined;

var _validators = require("../helpers/validators");

var _users = require("../models/users");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authRouter = _express2.default.Router();

authRouter.post("/signup", _validators.validateUserEntry, function (req, res) {
      var contactItem = req.contactItem;

      _users.user.users.push(contactItem);
      res.status(200).send({
            status: 200,
            message: "User successfully created",
            contactItem: contactItem
      });
});

authRouter.post("/login", _validators.validateUserSignIn, function (req, res) {
      var accountDetails = req.accountDetails;

      res.status(200).send({
            status: 200,
            message: "Scuccessfully Signed In",
            UserDetails: accountDetails
      });
});

exports.authRouter = authRouter;
//# sourceMappingURL=contacts.js.map