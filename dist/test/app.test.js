"use strict";

var _app = require("../app");

var _app2 = _interopRequireDefault(_app);

var _expect = require("expect");

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require("supertest");

var _supertest2 = _interopRequireDefault(_supertest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("GET /", function () {
  it("should respond with welcome message", function () {
    (0, _supertest2.default)(_app2.default).get("/").set("Accept", "application/json").expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain("Welcome");
    });
  });
});

describe("*", function () {
  it("should respond with error message", function () {
    (0, _supertest2.default)(_app2.default).get("/noroute").set("Accept", "application/json").expect(404).then(function (response) {
      (0, _expect2.default)(response.body.error).toContain("Invalid");
    });
  });
});

describe("POST /signup route", function () {
  it("should successfully create user", function (done) {
    (0, _supertest2.default)(_app2.default).post("/api/v1/contacts/createaccount").send({
      "email": "kellyfeller@gmail.com",
      "firstName": "Kelly",
      "lastName": "Feller",
      "password": "jddhehndhr"
    }).set("Accept", "application/json").expect(200).expect("Content-type", /json/).end(function (err, res) {
      if (err) done(err);
      (0, _expect2.default)(res.body.message).toContain("User successfully created");
      (0, _expect2.default)(res.body.status).toBe(200);
    });
    done();
  });
});

describe("POST /sendmessage route", function () {
  it("should successfully send email to user", function (done) {
    (0, _supertest2.default)(_app2.default).post("/api/v1/message/sendmessage").send({
      "senderId": 1,
      "receiverId": 2,
      "subject": "Hello Dear",
      "message": "bluseal",
      "status": "read"
    }).set("Accept", "application/json").expect(200).expect("Content-type", /json/).end(function (err, res) {
      if (err) done(err);
      (0, _expect2.default)(res.body.message).toContain("Message successfully sent");
      (0, _expect2.default)(res.body.status).toBe(200);
    });
    done();
  });
});
//# sourceMappingURL=app.test.js.map