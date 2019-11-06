import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from '../../mockData';
import userTestsv1 from '../../v1/tests/usertests';

chai.use(chaiHttp);
chai.should();

userTestsv1();

let loginToken;
describe('User signup test Version 2', () => {
  it('it should sign up a user', (done) => {
    chai.request(app)
      .post('/v2/auth/signup')
      .send(mockData.SignUp_perfect)
      .end((_err, res) => {
        loginToken = res.body.data.token;
        res.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('message').eql('The User was created successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        done();
      });
  });
  it('it should not sign up an already existing user', (done) => {
    chai.request(app)
      .post('/v2/auth/signup')
      .send(mockData.SignUp_perfect)
      .end((_err, res) => {
        res.body.should.have.property('status').eql(409);
        res.body.should.have.property('error').eql('The user with that email already exists');
      });
    done();
  });
  it('it should not create a user account with missing email', (done) => {
    chai.request(app)
      .post('/v2/auth/signup')
      .send(mockData.SignUp_withoutEmail)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('email is required');
        done();
      });
  });
  it('it should not sign up a user when password is less than 8 characters', (done) => {
    chai.request(app)
      .post('/v2/auth/signup')
      .send(mockData.SignUp_ShortPswd)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('password is not valid');
        done();
      });
  });
  it('it should not sign up a user when the firstname is numbers', (done) => {
    chai.request(app)
      .post('/v2/auth/signup')
      .send(mockData.SignUp_IntFirstName)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('firstName is not valid');
        done();
      });
  });
  it('it should not sign up a user account when the lastName is numbers', (done) => {
    chai.request(app)
      .post('/v2/auth/signup')
      .send(mockData.SignUp_IntLastName)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('lastName is not valid');
        done();
      });
  });
  it('it should not sign up a user account with no password', (done) => {
    chai.request(app)
      .post('/v2/auth/signup')
      .send(mockData.SignUp_withoutPswd)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('password is required');
        done();
      });
  });
  it('it should not sign up a user account with no firstName', (done) => {
    chai.request(app)
      .post('/v2/auth/signup')
      .send(mockData.SignUpfirstName)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('firstName is required');
        done();
      });
  });
  it('it should not sign up a user account with no lastName', (done) => {
    chai.request(app)
      .post('/v2/auth/signup')
      .send(mockData.SignUp_withoutlastName)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('lastName is required');
        done();
      });
  });
  it('it should not sign up a user account with empty lastName', (done) => {
    chai.request(app)
      .post('/v2/auth/signup')
      .send(mockData.SignUp_withVoidlastName)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('lastName is not allowed to be empty');
        done();
      });
  });
  it('it should not sign up a user account with empty firstName', (done) => {
    chai.request(app)
      .post('/v2/auth/signup')
      .send(mockData.SignUp_withVoidfirstName)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('firstName is not allowed to be empty');
        done();
      });
  });
  it('it should not sign up a user account with empty email', (done) => {
    chai.request(app)
      .post('/v2/auth/signup')
      .send(mockData.SignUp_withVoidEmail)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('email is not allowed to be empty');
        done();
      });
  });
  it('it should not sign up a user account with empty password', (done) => {
    chai.request(app)
      .post('/v2/auth/signup')
      .send(mockData.SignUp_withVoidPswd)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('password is not allowed to be empty');
        done();
      });
  });
});
describe('User Login test Version 2', () => {
  it('it should login a user', (done) => {
    chai.request(app)
      .post('/v2/auth/signin')
      .send(mockData.Login_perfect)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        done();
      });
  });
  it('it should not login a user who does not have account', (done) => {
    chai.request(app)
      .post('/v2/auth/signin')
      .send(mockData.Login_wrongEmail)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('There is no such user with that email');
        done();
      });
  });
  it('it should not login a user with wrong password', (done) => {
    chai.request(app)
      .post('/v2/auth/signin')
      .send(mockData.Login_wrongPassword)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error').eql('enter the correct password');
        done();
      });
  });
});
