import { expect } from 'chai';
import request from 'supertest';


import app from '../../src/index';

describe('Fundoo Notes Integration testing', () => {
  describe('User APIs Test', () => {
    let userDetails: { firstName: string; lastName: string; password: string; email: string }
      = {
      "firstName": "bheem12",
      "lastName": "kumar",
      "password": "bheem@123",
      "email": "bheem@gmail.com"
    }
    describe('Register A User', () => {
      it('Registration Of User', (done) => {
        request(app.getApp())
          .post('/api/v1/users/signup')
          .send(userDetails)
          .end((err, res) => {
            console.log(res.body);
            expect(res.statusCode).to.be.equal(201);
            done();
          });
      });
    });

  })
})