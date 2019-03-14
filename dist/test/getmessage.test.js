'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('GET /messages', function () {
  it('should respond with all received messages', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/message/messages/2').set('Accept', 'application/json').expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain('All received messages for Sally Marcus');
    });
    done();
  });

  it('should respond with all received messages', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/message/messages/1').set('Accept', 'application/json').expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain('No messages found for user');
    });
    done();
  });

  it('should respond with all sent messages', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/message/messages/sent/1').set('Accept', 'application/json').expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain('All Sent messages for Joshua Frankson');
    });
    done();
  });

  it('should respond with no record of sent messages', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/message/messages/sent/2').set('Accept', 'application/json').expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain('No messages found for user');
    });
    done();
  });

  it('should respond with no record of unread messages', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/message/messages/unread/3').set('Accept', 'application/json').expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain('No messages found for user');
    });
    done();
  });

  it('should respond with record of unread messages', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/message/messages/unread/2').set('Accept', 'application/json').expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain('All unread messages for Sally Marcus');
    });
    done();
  });

  it('should respond with a valid email on fetch', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/message/email/2').set('Accept', 'application/json').expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain('Email found');
    });
    done();
  });

  it('should delete email from inbox', function (done) {
    (0, _supertest2.default)(_app2.default).delete('api/v1/message/messages/1/?userId=2').set('Accept', 'application/json').expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain('Email successfully deleted');
    });
    done();
  });

  it('should return message for delete request without email', function (done) {
    (0, _supertest2.default)(_app2.default).delete('/api/v1/message/messages/1?userId=1').set('Accept', 'application/json').expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain('no email found');
    });
    done();
  });

  it('should return message for a specific email request', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/message/messages/specificmail/1?userId=2').set('Accept', 'application/json').expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain('Email successfully fetched');
    });
    done();
  });

  it('should return message for specific email request not found but valid', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/message/messages/specificmail/1?userId=1').set('Accept', 'application/json').expect(200).then(function (response) {
      (0, _expect2.default)(response.body.message).toContain('no email found');
    });
    done();
  });
});
//# sourceMappingURL=getmessage.test.js.map