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
