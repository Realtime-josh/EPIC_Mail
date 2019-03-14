import expect from 'expect';
import request from 'supertest';
import app from '../app';

describe('GET /messages', () => {
  it('should respond with all received messages', () => {
    request(app)
      .get('/api/v1/message/messages/2')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body.message).toContain('All received messages for Sally Marcus');
      });
  });

  it('should respond with all received messages', () => {
    request(app)
      .get('/api/v1/message/messages/1')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body.message).toContain('No messages found for user');
      });
  });

  it('should respond with all sent messages', () => {
    request(app)
      .get('/api/v1/message/messages/sent/1')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body.message).toContain('All Sent messages for Joshua Frankson');
      });
  });


  it('should respond with no record of sent messages', () => {
    request(app)
      .get('/api/v1/message/messages/sent/2')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body.message).toContain('No messages found for user');
      });
  });

  it('should respond with no record of unread messages', () => {
    request(app)
      .get('/api/v1/message/messages/unread/3')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body.message).toContain('No messages found for user');
      });
  });

  it('should respond with record of unread messages', () => {
    request(app)
      .get('/api/v1/message/messages/unread/2')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body.message).toContain('All unread messages for Sally Marcus');
      });
  });

  it('should respond with a valid email on fetch', () => {
    request(app)
      .get('/api/v1/message/email/2')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body.message).toContain('Email found');
      });
  });


  it('should delete email from inbox', () => {
    request(app)
      .delete('api/v1/message/messages/1/?userId=2')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body.message).toContain('Email successfully deleted');
      });
  });


  it('should return message for delete request without email', (done) => {
    request(app)
      .delete('/api/v1/message/messages/1?userId=1')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body.message).toContain('no email found');
      });
    done();
  });

  it('should return message for a specific email request', () => {
    request(app)
      .get('/api/v1/message/messages/specificmail/1?userId=2')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body.message).toContain('Email successfully fetched');
      });
  });

});
