"use strict";

var _validators = require("../helpers/validators");

var _expect = require("expect");

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require("supertest");

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require("../app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("function tests", function () {
  it("should return a positive number", function () {
    var res = (0, _validators.isPositiveInteger)(2);
    var les = (0, _validators.isPositiveInteger)(1.09);
    var bless = (0, _validators.isPositiveInteger)(-3);
    var guess = (0, _validators.isPositiveInteger)("3");
    (0, _expect2.default)(res).toBe(true);
    (0, _expect2.default)(les).toBe(false);
    (0, _expect2.default)(bless).toBe(false);
    (0, _expect2.default)(guess).toBe(true);
  });

  it("should trim all white spaces", function () {
    var res = (0, _validators.trimAllSpace)("  kelvin    ");
    var les = (0, _validators.trimAllSpace)("ma  r k ");
    var bless = (0, _validators.trimAllSpace)("  j a  k  e");
    var guess = (0, _validators.trimAllSpace)("Cla rke");
    (0, _expect2.default)(res).toBe("kelvin");
    (0, _expect2.default)(les).toBe("mark");
    (0, _expect2.default)(bless).toBe("jake");
    (0, _expect2.default)(guess).toBe("Clarke");
  });

  it("should flag special characters", function () {
    var firstCheck = (0, _validators.filterInput)("ke   lvin    %");
    var secondCheck = (0, _validators.filterInput)("ma  & r k ");
    var thridCheck = (0, _validators.filterInput)("  j a <  k  e");
    var fourthCheck = (0, _validators.filterInput)("Cla ~rke");
    (0, _expect2.default)(firstCheck).toBe(true);
    (0, _expect2.default)(secondCheck).toBe(true);
    (0, _expect2.default)(thridCheck).toBe(true);
    (0, _expect2.default)(fourthCheck).toBe(true);
  });
});

describe("middlewares for routes", function () {
  it("should return error if user has already signed up", function (done) {
    (0, _supertest2.default)(_app2.default).post("/api/v1/contacts/createaccount").send({ "email": "franksonjoshua@gmail.com",
      "firstName": "Joshua",
      "lastName": "Frankson",
      "password": "jddhehndhr" }).set("Accept", "application/json").expect(400).expect("Content-Type", /json/).end(function (err, res) {
      if (err) done(err);
      (0, _expect2.default)(res.body.error).toContain("email already exist.");
      (0, _expect2.default)(res.body.status).toBe(400);
    });
    done();
  });

  it("should check email validity", function (done) {
    (0, _supertest2.default)(_app2.default).post("/api/v1/contacts/createaccount").send({
      "email": "frankson#$%joshua@gmail.com",
      "firstName": "Joshua",
      "lastName": "Frankson",
      "password": "jddhehndhr"
    }).set("Accept", "application/json").expect(400).expect("Content-Type", /json/).end(function (err, res) {
      if (err) done(err);
      (0, _expect2.default)(res.body.error).toContain("Ensure username, email and password are valid entries");
      (0, _expect2.default)(res.body.status).toBe(400);
    });
    done();
  });

  it("should check firstName validity", function (done) {
    (0, _supertest2.default)(_app2.default).post("/api/v1/contacts/createaccount").send({
      "email": "franksonjoshua@gmail.com",
      "firstName": "Joshu%^$#@a",
      "lastName": "Frankson",
      "password": "jddhehndhr"
    }).set("Accept", "application/json").expect(400).expect("Content-Type", /json/).end(function (err, res) {
      if (err) done(err);
      (0, _expect2.default)(res.body.error).toContain("Ensure username, email and password are valid entries");
      (0, _expect2.default)(res.body.status).toBe(400);
    });
    done();
  });

  it("should check lastName validity", function (done) {
    (0, _supertest2.default)(_app2.default).post("/api/v1/contacts/createaccount").send({
      "email": "franksonjoshua@gmail.com",
      "firstName": "Joshua",
      "lastName": "Fra$%#@nkson",
      "password": "jddhehndhr"
    }).set("Accept", "application/json").expect(400).expect("Content-Type", /json/).end(function (err, res) {
      if (err) done(err);
      (0, _expect2.default)(res.body.error).toContain("Ensure username, email and password are valid entries");
      (0, _expect2.default)(res.body.status).toBe(400);
    });
    done();
  });

  it("should check password length is greater than 6", function (done) {
    (0, _supertest2.default)(_app2.default).post("/api/v1/contacts/createaccount").send({
      "email": "franksonjoshua@gmail.com",
      "firstName": "Joshua",
      "lastName": "Frankson",
      "password": "jddhe"
    }).set("Accept", "application/json").expect(400).expect("Content-Type", /json/).end(function (err, res) {
      if (err) done(err);
      (0, _expect2.default)(res.body.error).toContain("Ensure username, email and password are valid entries");
      (0, _expect2.default)(res.body.status).toBe(400);
    });
    done();
  });

  it("should return length of first name greater than 1", function (done) {
    (0, _supertest2.default)(_app2.default).post("/api/v1/contacts/createaccount").send({
      "email": "franksonjoshua@gmail.com",
      "firstName": " ",
      "lastName": "Frankson",
      "password": "jddhe"
    }).set("Accept", "application/json").expect(400).expect("Content-Type", /json/).end(function (err, res) {
      if (err) done(err);
      (0, _expect2.default)(res.body.error).toContain("Ensure username, email and password are valid entries");
      (0, _expect2.default)(res.body.status).toBe(400);
    });
    done();
  });

  it("should return length of lastName greater than 1", function (done) {
    (0, _supertest2.default)(_app2.default).post("/api/v1/contacts/createaccount").send({
      "email": "franksonjoshua@gmail.com",
      "firstName": "Joshua",
      "lastName": " ",
      "password": "jddhe"
    }).set("Accept", "application/json").expect(400).expect("Content-Type", /json/).end(function (err, res) {
      if (err) done(err);
      (0, _expect2.default)(res.body.error).toContain("Ensure username, email and password are valid entries");
      (0, _expect2.default)(res.body.status).toBe(400);
    });
    done();
  });

  it("should not return withspaces in names", function (done) {
    (0, _supertest2.default)(_app2.default).post("/api/v1/contacts/createaccount").send({
      "email": "franksonjoshua@gmail.com",
      "firstName": "     ",
      "lastName": " ",
      "password": "jddhert"
    }).set("Accept", "application/json").expect(400).expect("Content-Type", /json/).end(function (err, res) {
      if (err) done(err);
      (0, _expect2.default)(res.body.error).toContain("Ensure username, email and password are valid entries");
      (0, _expect2.default)(res.body.status).toBe(400);
    });
    done();
  });

  it("should return error for an unregistered email account", function (done) {
    (0, _supertest2.default)(_app2.default).post("/api/v1/contacts/signin").send({
      "email": "franksonjos@gmail.com",
      "password": "yettiyea"
    }).set("Accept", "application/json").expect(400).expect("Content-Type", /json/).end(function (err, res) {
      if (err) done(err);
      (0, _expect2.default)(res.body.error).toContain("email and password is not associated with a registered account");
      (0, _expect2.default)(res.body.status).toBe(400);
    });
    done();
  });

  it("should return error for an invalid email address", function (done) {
    (0, _supertest2.default)(_app2.default).post("/api/v1/contacts/signin").send({
      "email": "frankson$%#@jos@gmail.com",
      "password": "yettiyea"
    }).set("Accept", "application/json").expect(400).expect("Content-Type", /json/).end(function (err, res) {
      if (err) done(err);
      (0, _expect2.default)(res.body.error).toContain("Ensure email and password are valid entries");
      (0, _expect2.default)(res.body.status).toBe(400);
    });
    done();
  });

  it("should return error for a wrong password", function (done) {
    (0, _supertest2.default)(_app2.default).post("/api/v1/contacts/signin").send({
      "email": "franksonjoshua@gmail.com",
      "password": "yettdhtes"
    }).set("Accept", "application/json").expect(400).expect("Content-Type", /json/).end(function (err, res) {
      if (err) done(err);
      (0, _expect2.default)(res.body.error).toContain("email and password is not associated with a registered account");
      (0, _expect2.default)(res.body.status).toBe(400);
    });
    done();
  });

  it("should return error for an invalid password length", function (done) {
    (0, _supertest2.default)(_app2.default).post("/api/v1/contacts/signin").send({
      "email": "franksonjoshua@gmail.com",
      "password": "yet"
    }).set("Accept", "application/json").expect(400).expect("Content-Type", /json/).end(function (err, res) {
      if (err) done(err);
      (0, _expect2.default)(res.body.error).toContain("Ensure email and password are valid entries");
      (0, _expect2.default)(res.body.status).toBe(400);
    });
    done();
  });
});
//# sourceMappingURL=function.test.js.map