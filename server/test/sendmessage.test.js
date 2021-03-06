import expect from 'expect';
import request from 'supertest';
import app from '../app';


describe('send message', () => {
  it('should return error for user or users not signed up', (done) => {
    request(app)
      .post('/api/v1/message/messages')
      .send({
        senderId: 1,
        receiverId: 53422,
        subject: 'Hello Dear',
        message: 'You have a new message',
        status: 'read',
      })
      .set('Accept', 'application/json')
      .expect(401)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.error).toContain('one or more users is not registered');
        expect(res.body.status).toBe(401);
      });
    done();
  });
});
