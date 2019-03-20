'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('send message', function () {
  it('should return error for user or users not signed up', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/message/messages').send({
      senderId: 1,
      receiverId: 53422,
      subject: 'Hello Dear',
      message: 'You have a new message',
      status: 'read'
    }).set('Accept', 'application/json').expect(401).expect('Content-Type', /json/).end(function (err, res) {
      if (err) done(err);
      (0, _expect2.default)(res.body.error).toContain('one or more users is not registered');
      (0, _expect2.default)(res.body.status).toBe(401);
    });
    done();
  });
});
//# sourceMappingURL=sendmessage.test.js.map