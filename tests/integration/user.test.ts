import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/index';

let forgetToken: string;

describe('Fundoo Notes Integration Testing', () => {
  const userDetails = {
    firstName: 'Vishal',
    lastName: 'Shukla',
    password: 'Vishal@123',
    email: 'vishalshukla8310@gmail.com'
  };

  describe('User APIs Test', () => {

    // Register a user
    describe('Register A User', () => {
      it('should register a user successfully', (done) => {
        request(app.getApp())
          .post('/api/v1/users/signup')
          .send(userDetails)
          .end((err, res) => {
            if (err) return done(err);
            console.log(res.body);
            expect(res.statusCode).to.equal(201);
            done();
          });
      });
    });

    // Login a user
    describe('Login A User', () => {
      it('should log in a user successfully', (done) => {
        request(app.getApp())
          .post('/api/v1/users/login')
          .send({ email: userDetails.email, password: userDetails.password })
          .end((err, res) => {
            if (err) return done(err);
            console.log(res.body);
            expect(res.statusCode).to.equal(200);
            done();
          });
      });
    });

    // Request for password change
    describe('User forgot password', () => {
      it('should request password reset successfully', (done) => {
        request(app.getApp())
          .post('/api/v1/users/forget-password')
          .send({ email: userDetails.email }) // Use userDetails.email for consistency
          .end((err, res) => {
            if (err) return done(err);
            console.log(res.body);
            if (res.body.data) {
              forgetToken = res.body.data; // Store the token for later use
              console.log(forgetToken);
            } else {
              console.error('Reset token is undefined');
            }
            expect(res.statusCode).to.equal(200);
            done();
          });
      });
    });

    // Reset the password
    describe('User Profile Password Changing', () => {
      it('should change user password successfully', (done) => {
        if (!forgetToken) {
          return done(new Error('Forget token is not available'));
        }

        request(app.getApp())
          .post('/api/v1/users/reset-password')
          .set('Authorization', `Bearer ${forgetToken}`)
          .send({ newPassword: 'Sajan@123' })
          .end((err, res) => {
            if (err) return done(err);
            console.log(res.body);
            expect(res.statusCode).to.equal(200);
            expect(res.body.message).to.equal('Password has been changed successfully');
            done();
          });
      });
    });
  });
});
