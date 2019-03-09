"use strict";

var _expect = require("expect");

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require("supertest");

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require("../app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("GET /messages", function () {
  it("should respond with all received messages", function () {
    (0, _supertest2.default)(_app2.default).get("/api/v1/message/receivedmessages/2").set("Accept", "application/json").expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain("All received messages for Sally Marcus");
    });
  });

  it("should respond with all received messages", function () {
    (0, _supertest2.default)(_app2.default).get("/api/v1/message/receivedmessages/1").set("Accept", "application/json").expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain("No messages found for user");
    });
  });

  it("should respond with all sent messages", function () {
    (0, _supertest2.default)(_app2.default).get("/api/v1/message/sentemails/1").set("Accept", "application/json").expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain("All Sent messages for Joshua Frankson");
    });
  });

  it("should respond with no record of sent messages", function () {
    (0, _supertest2.default)(_app2.default).get("/api/v1/message/sentemails/2").set("Accept", "application/json").expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain("No messages found for user");
    });
  });

  it("should respond with no record of unread messages", function () {
    (0, _supertest2.default)(_app2.default).get("/api/v1/message/unreadmails/3").set("Accept", "application/json").expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain("No messages found for user");
    });
  });

  it("should respond with record of unread messages", function () {
    (0, _supertest2.default)(_app2.default).get("/api/v1/message/unreadmails/2").set("Accept", "application/json").expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain("All unread messages for Sally Marcus");
    });
  });

  it("should respond with a valid email on fetch", function () {
    (0, _supertest2.default)(_app2.default).get("/api/v1/message/email/2").set("Accept", "application/json").expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain("Email found");
    });
  });

  it("should delete email from inbox", function () {
    (0, _supertest2.default)(_app2.default).delete("/api/v1/message/email/2?userMessageId=1").set("Accept", "application/json").expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain("Email successfully deleted");
    });
  });

  it("should return message for delete request without email", function () {
    (0, _supertest2.default)(_app2.default).delete("/api/v1/message/email/1?userMessageId=1").set("Accept", "application/json").expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain("no email found");
    });
  });
});
//# sourceMappingURL=getmessage.test.js.map