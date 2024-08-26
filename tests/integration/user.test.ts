import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/index';

let forgetToken: string;
let loginToken:string;
let noteId: number | null = null;

describe('Fundoo Notes Integration Testing', () => {
  const userDetails = {
    firstName: 'Saurabh',
    lastName: 'Dwivedi',
    password: 'Dwivedi@123',
    email: 'saurabhdwivedi@gmail.com'
  };

  describe('User APIs Test', () => {

    //! Register a user
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

     //! Login a user to get a TOKEN for NOTES
     describe('Login A User', () => {
      it('Login Of User', (done) => {
        request(app.getApp())
          .post('/api/v1/users/login')
          .send({ email: userDetails.email, password: userDetails.password })
          .end((err, res) => {
            if (err) return done(err);
            console.log(res.body);
            if (res.body.data && res.body.data.token) {
              loginToken = res.body.data.token; // Storing the token for later use
              console.log('Login Token:', loginToken);
            } else {
              console.error('Login token is undefined');
            }
            expect(res.statusCode).to.equal(200);
            done();
          });
      });
    });


    //! Request for password change
    describe('User forgot password', () => {
      it('should request password reset successfully', (done) => {
        request(app.getApp())
          .post('/api/v1/users/forget-password')
          .send({ email: userDetails.email })
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

    //! Reset the password
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
//! Create a note using the login token
describe('Create Note', () => {
  it('Create a Note with Token', (done) => {
    if (!loginToken) {
      return done(new Error('Login token is not available'));
    }

    const newNote = {
      title: 'Test Note',
      description: 'This is a test note content'
    };

    request(app.getApp())
      .post('/api/v1/notes/create')
      .set('Authorization', `Bearer ${loginToken}`)
      .send(newNote)
      .end((err, res) => {
        if (err) return done(err);
        noteId=res.body.note.id;
        done();
      });
  });
});
//! Archiving a Note
describe('Archive Note', () => {
  it('should archive a note with the given ID', (done) => {
    if (!loginToken || noteId === null) {
      return done(new Error('Login token or note ID is not available'));
    }

    request(app.getApp())
      .post(`/api/v1/notes/${noteId}/archive`)
      .set('Authorization', `Bearer ${loginToken}`)
      .end((err, res) => {
        if (err) return done(err);
        done();
        console.log("Note Archived Successfully")
      });
  });
});
//! UNARCHIVE
describe('Unarchive Note', () => {
  it('should unarchive a note with the given ID', (done) => {
    if (!loginToken || noteId === null) {
      return done(new Error('Login token or note ID is not available'));
    }

    request(app.getApp())
      .post(`/api/v1/notes/${noteId}/unarchive`)
      .set('Authorization', `Bearer ${loginToken}`)
      .end((err, res) => {
        if (err) return done(err);
        done();
        console.log("Note Unarchived Successfully")
      });
  });
});
//! Moving to Trash
describe('MOving a Note to TRASH', () => {
  it('should move a note to TRASH with the given ID', (done) => {
    if (!loginToken || noteId === null) {
      return done(new Error('Login token or note ID is not available'));
    }

    request(app.getApp())
      .post(`/api/v1/notes/${noteId}/trash`)
      .set('Authorization', `Bearer ${loginToken}`)
      .end((err, res) => {
        if (err) return done(err);
        done();
        console.log("Note Moved To TRASH Successfully")
      });
  });
});
//! RESTORING a Note from the TRASH
describe('Restoring a Note from the TRASH', () => {
  it('should should restore a note from the TRASH with the given ID', (done) => {
    if (!loginToken || noteId === null) {
      return done(new Error('Login token or note ID is not available'));
    }

    request(app.getApp())
      .post(`/api/v1/notes/${noteId}/restore`)
      .set('Authorization', `Bearer ${loginToken}`)
      .end((err, res) => {
        if (err) return done(err);
        done();
        console.log("Note Restored Successfully")
      });
  });
});






  });
});
