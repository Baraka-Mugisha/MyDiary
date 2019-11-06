import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from './mockData';
import entriesTestsv1 from '../../v1/tests/entriestests';
import serverTests from '../../v1/tests/servertests';

chai.use(chaiHttp);
chai.should();

entriesTestsv1();
serverTests();

let token;
let tokenTwo;
let tokenThree;
let entryId;
let tokenFour;
let tokenFive;
let tokenSix;

describe('Creating an entry', () => {
  it('first sign up a user', (done) => {
    chai.request(app)
      .post('/v2/auth/signup')
      .send(mockData.Entry_SignUp)
      .end((_err, res) => {
        token = res.body.data.token;
        done();
      });
  });
  it('first sign up another user', (done) => {
    chai.request(app)
      .post('/v2/auth/signup')
      .send(mockData.Entry_SignUp2)
      .end((_err, res) => {
        tokenTwo = res.body.data.token;
        done();
      });
  });
  it('User should create an entry', (done) => {
    chai.request(app)
      .post('/v2/entries')
      .set('Authorization', `Bearer ${token}`)
      .send(mockData.Entry_1)
      .end((_err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('message').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('title').eql('This is my title');
        res.body.data.should.have.property('description').eql('This is my description of of my diary entry');
        done();
      });
  });
  it('User should not create an entry if not signed up', (done) => {
    chai.request(app)
      .post('/v2/entries')
      .send(mockData.Entry_2)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('message').eql('You are not authorised for this operation. Sign in first.');
        done();
      });
  });
  it('User should not create an entry with an invalid token', (done) => {
    chai.request(app)
      .post('/v2/entries')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLTMwMGViODQwIiwiZW1haWwiOiJrYWxpc2FAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiQ2hyaXN0aWFuIiwibGFzdE5hbWUiOiJLYWxpc2EiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTY5MzI4MjY5fQ.Rzbk2yB0hM-vUV5OokmiIHT7IrTIPDuFXE3VYekDeo0')
      .send(mockData.Entry_2)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('message').eql('You are not authorised for this operation. Sign in first.');
        done();
      });
  });
  it('User should not create an entry with an empty title', (done) => {
    chai.request(app)
      .post('/v2/entries')
      .set('Authorization', `Bearer ${token}`)
      .send(mockData.Entry_titleEmpty)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('title is not allowed to be empty');
        done();
      });
  });
  it('User should not create an entry with missing title', (done) => {
    chai.request(app)
      .post('/v2/entries')
      .send(mockData.Entry_missingTitle)
      .set('Authorization', `Bearer ${token}`)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('title is required');
        done();
      });
  });
  it('User should not create an entry with empty description', (done) => {
    chai.request(app)
      .post('/v2/entries')
      .send(mockData.Entry_descriptionEmpty)
      .set('Authorization', `Bearer ${token}`)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('description is not allowed to be empty');
        done();
      });
  });
  it('User should not create an entry with missing description', (done) => {
    chai.request(app)
      .post('/v2/entries')
      .send(mockData.Entry_missingDescription)
      .set('Authorization', `Bearer ${token}`)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('description is required');
        done();
      });
  });
});
