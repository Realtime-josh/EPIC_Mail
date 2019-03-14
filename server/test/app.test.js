import expect from 'expect';
import request from 'supertest';
import app from '../app';

describe('GET /', () => {
  it('should respond with welcome message', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body.message).toContain('Welcome');
      });
    done();
  });
});

describe('*', () => {
  it('should respond with error message', (done) => {
    request(app)
      .get('/noroute')
      .set('Accept', 'application/json')
      .expect(404)
      .then((response) => {
        expect(response.body.error).toContain('Invalid');
      });
    done();
  });
});


describe('POST /signup route', () => {
  it('should successfully create user', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'kellyfeller@gmail.com',
        firstName: 'Kelly',
        lastName: 'Feller',
        password: 'jddhehndhr',
      })
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-type', /json/)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.message).toContain('User successfully created');
        expect(res.body.status).toBe(200);
      });
    done();
  });
});

describe('POST /sendmessage route', () => {
  it('should successfully send email to user', (done) => {
    request(app)
      .post('/api/v1/message/messages')
      .send({
        senderId: 1,
        receiverId: 2,
        subject: 'Hello Dear',
        message: 'bluseal',
        status: 'read',
      })
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-type', /json/)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.message).toContain('Message successfully sent');
        expect(res.body.status).toBe(200);
      });
    done();
  });
});
