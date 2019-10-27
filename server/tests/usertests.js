import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();

// Signing up
describe('User signup test: case 1', () => {
  it('it should sign up a user', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(mockData.SignUp_complete)
      .end((_err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('message').eql('The User was created successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('firstName').eql('Bran');
        res.body.data.should.have.property('lastName').eql('Stark');
        res.body.data.should.have.property('email').eql('bstark@gmail.com');
        res.body.data.should.not.have.property('password');
        done();
      });
  });


  it('it should not create a user account with missing email', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(mockData.SignUp_noEmail)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('email is required');
        done();
      });
  });

  it('it should not sign up a user when password is less than 8 characters', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(mockData.SignUp_ShortPswd)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('password with value git fails to match the required pattern: /^[a-zA-Z0-9]{8,30}$/');
        done();
      });
  });

  it('it should not sign up a user when the firstname is numbers', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(mockData.SignUp_IntFirstName)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('firstName with value 1234 fails to match the required pattern: /^\\S[A-Za-z]{1,}$/');
        done();
      });
  });

  it('it should not sign up a user account when the lastName is numbers', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(mockData.SignUp_IntLastName)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('lastName with value 1234 fails to match the required pattern: /^\\S[A-Za-z]{1,}$/');
        done();
      });
  });

  it('it should not sign up an user account when the firstName contains a whitespace', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(mockData.SignUp_WhitespaceFirstName)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('firstName with value Bran Bob fails to match the required pattern: /^\\S[A-Za-z]{1,}$/');
        done();
      });
  });

  it('it should not sign up a user account when the lastName contains a whitespace', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(mockData.SignUp_WhitespaceLastName)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('lastName with value Stark Man fails to match the required pattern: /^\\S[A-Za-z]{1,}$/');
        done();
      });
  });
  it('it should not sign up a user account with no password', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(mockData.SignUp_noPswd)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('password is required');
        done();
      });
  });
  it('it should not sign up a user account with no firstName', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(mockData.SignUp_nofirstName)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('firstName is required');
        done();
      });
  });
  it('it should not sign up a user account with no lastName', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(mockData.SignUp_nolastName)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('lastName is required');
        done();
      });
  });
  it('it should not sign up a user account with empty lastName', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(mockData.SignUp_emptylastName)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('lastName is not allowed to be empty');
        done();
      });
  });
  it('it should not sign up a user account with empty firstName', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(mockData.SignUp_emptyfirstName)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('firstName is not allowed to be empty');
        done();
      });
  });
  it('it should not sign up a user account with empty email', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(mockData.SignUp_emptyEmail)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('email is not allowed to be empty');
        done();
      });
  });
  it('it should not sign up a user account with empty password', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(mockData.SignUp_emptyPswd)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('password is not allowed to be empty');
        done();
      });
  });
});

describe('User sign up test: case 2', () => {
  beforeEach('sign up an employee', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(mockData.SignUp_complete)
      .end((error, _res) => {
        done();
      });
  });
  it('it should not sign up an already existing employee', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(mockData.SignUp_complete)
      .end((_err, res) => {
        res.body.should.have.property('status').eql(409);
        res.body.should.have.property('error').eql('The user with that email already exists');
      });
    done();
  });
})