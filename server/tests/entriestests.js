import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();

let token;
let tokenTwo;
let tokenThree;
let entryId;
let tokenFour;

// About creating an entry
describe('Creating an entry', () => {
  it('first sign up a user', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(mockData.Entry_SignUp)
      .end((_err, res) => {
        token = res.body.data.token;
        done();
      });
  });
  it('first sign up another user', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(mockData.Entry_SignUp2)
      .end((_err, res) => {
        tokenTwo = res.body.data.token;
        done();
      });
  });
  it('User should create an entry', (done) => {
    chai.request(app)
      .post('/entries')
      .set('Authorization', `Bearer ${token}`)
      .send(mockData.Entry_1)
      .end((_err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('message').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('title').eql('Just a sign');
        res.body.data.should.have.property('description').eql('Looking at the world through my rearview, searching for an answer up high, or is it all wasted time?');
        done();
      });
  });
  it('User should not create an entry if not signed up', (done) => {
    chai.request(app)
      .post('/entries')
      .send(mockData.Entry_1)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('message').eql('You are not authorised for this operation. Sign in first.');
        done();
      });
  });
  it('User should not create an entry with an invalid token', (done) => {
    chai.request(app)
      .post('/entries')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLTMwMGViODQwIiwiZW1haWwiOiJrYWxpc2FAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiQ2hyaXN0aWFuIiwibGFzdE5hbWUiOiJLYWxpc2EiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTY5MzI4MjY5fQ.Rzbk2yB0hM-vUV5OokmiIHT7IrTIPDuFXE3VYekDeo0')
      .send(mockData.Entry_1)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('message').eql('You are not authorised for this operation. Sign in first.');
        done();
      });
  });
  it('User should not create an entry with an empty title', (done) => {
    chai.request(app)
      .post('/entries')
      .set('Authorization', `Bearer ${token}`)
      .send(mockData.Entry_titleEmpty)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('title is not allowed to be empty');
        done();
      })
  });
  it('User should not create an entry with missing title', (done) => {
    chai.request(app)
      .post('/entries')
      .send(mockData.Entry_missingTitle)
      .set('Authorization', `Bearer ${token}`)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('title is required');
        done();
      })
  });
  it('User should not create an entry with empty description', (done) => {
    chai.request(app)
      .post('/entries')
      .send(mockData.Entry_descriptionEmpty)
      .set('Authorization', `Bearer ${token}`)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('description is not allowed to be empty');
        done();
      })
  });
  it('User should not create an entry with missing description', (done) => {
    chai.request(app)
      .post('/entries')
      .send(mockData.Entry_missingDescription)
      .set('Authorization', `Bearer ${token}`)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('description is required');
        done();
      })
  });
})

// About viewing entries
// ________________________
//______________________


describe('Viewing all user entries', () => {
  it('first sign up a user', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(mockData.Entry_SignUp3)
      .end((_err, res) => {
        tokenThree = res.body.data.token;
        done();
      });
  });
  it('first sign up another user', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(mockData.Entry_SignUp4)
      .end((_err, res) => {
        tokenFour = res.body.data.token;
        done();
      });
  });
  it('User should create an entry', (done) => {
    chai.request(app)
      .post('/entries')
      .set('Authorization', `Bearer ${tokenThree}`)
      .send(mockData.Entry_1)
      .end((_err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('message').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('title').eql('Just a sign');
        res.body.data.should.have.property('description').eql('Looking at the world through my rearview, searching for an answer up high, or is it all wasted time?');
        done();
      })});
  it('User should view entries', (done) => {
    chai.request(app)
      .get('/entries')
      .set('Authorization', `Bearer ${tokenThree}`)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('success');
        res.body.should.have.property('data');
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('createdOn');
        res.body.data[0].should.have.property('user_email');
        res.body.data[0].should.have.property('title');
        res.body.data[0].should.have.property('description');
        done();
      });
  });
  it('User should not view entries if not signed up', (done) => {
    chai.request(app)
      .get('/entries')
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('message').eql('You are not authorised for this operation. Sign in first.');
        done();
      });
  });
  it('User should not view entries with an invalid token', (done) => {
    chai.request(app)
      .get('/entries')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLTMwMGViODQwIiwiZW1haWwiOiJrYWxpc2FAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiQ2hyaXN0aWFuIiwibGFzdE5hbWUiOiJLYWxpc2EiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTY5MzI4MjY5fQ.Rzbk2yB0hM-vUV5OokmiIHT7IrTIPDuFXE3VYekDeo0')
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('message').eql('You are not authorised for this operation. Sign in first.');
        done();
      });
  });
  it('User should not view entries that he had not made', (done) => {
    chai.request(app)
      .get('/entries')
      .set('Authorization', `Bearer ${tokenFour}`)
      .end((_err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('You have not yet created an entry');
        done();
      })
  });
  it('User should not view entries with missing title', (done) => {
    chai.request(app)
      .post('/entries')
      .send(mockData.Entry_missingTitle)
      .set('Authorization', `Bearer ${token}`)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('title is required');
        done();
      })
  });
  it('User should not view entries with empty description', (done) => {
    chai.request(app)
      .post('/entries')
      .send(mockData.Entry_descriptionEmpty)
      .set('Authorization', `Bearer ${token}`)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('description is not allowed to be empty');
        done();
      })
  });
  it('User should not view entries with missing description', (done) => {
    chai.request(app)
      .post('/entries')
      .send(mockData.Entry_missingDescription)
      .set('Authorization', `Bearer ${token}`)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('description is required');
        done();
      })
  })
})