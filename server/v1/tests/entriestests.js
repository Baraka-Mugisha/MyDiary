import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import mockData from './mockData';


const entriesTestsv1 = () => {
  chai.use(chaiHttp);
  chai.should();

let token;
let tokenTwo;
let tokenThree;
let entryId;
let tokenFour;
let tokenFive;
let tokenSix;

// About creating an entry
// ________________________
// ______________________

describe('Creating an entry', () => {
  it('first sign up a user', (done) => {
    chai.request(app)
      .post('/v1/auth/signup')
      .send(mockData.Entry_SignUp)
      .end((_err, res) => {
        token = res.body.data.token;
        done();
      });
  });
  it('first sign up another user', (done) => {
    chai.request(app)
      .post('/v1/auth/signup')
      .send(mockData.Entry_SignUp2)
      .end((_err, res) => {
        tokenTwo = res.body.data.token;
        done();
      });
  });
  it('User should create an entry', (done) => {
    chai.request(app)
      .post('/v1/entries') // entry 1
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
      .post('/v1/entries')
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
      .post('/v1/entries')
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
      .post('/v1/entries')
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
      .post('/v1/entries')
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
      .post('/v1/entries')
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
      .post('/v1/entries')
      //  entry 7
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

// About viewing entries
// ________________________
// ______________________

describe('Viewing all user entries', () => {
  it('first sign up a user', (done) => {
    chai.request(app)
      .post('/v1/auth/signup')
      .send(mockData.Entry_SignUp3)
      .end((_err, res) => {
        tokenThree = res.body.data.token;
        done();
      });
  });
  it('first sign up another user', (done) => {
    chai.request(app)
      .post('/v1/auth/signup')
      .send(mockData.Entry_SignUp4)
      .end((_err, res) => {
        tokenFour = res.body.data.token;
        done();
      });
  });
  it('User should create an entry', (done) => {
    chai.request(app)
      .post('/v1/entries') // entry 2
      .set('Authorization', `Bearer ${tokenThree}`)
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

  it('User should create another entry', (done) => {
    chai.request(app)
      .post('/v1/entries') // entry 3
      .set('Authorization', `Bearer ${tokenThree}`)
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
  it('User should view entries', (done) => {
    chai.request(app)
      .get('/v1/entries')
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
      .get('/v1/entries')
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('message').eql('You are not authorised for this operation. Sign in first.');
        done();
      });
  });
  it('User should not view entries with an invalid token', (done) => {
    chai.request(app)
      .get('/v1/entries')
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
      .get('/v1/entries')
      .set('Authorization', `Bearer ${tokenFour}`)
      .end((_err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('You have not yet created an entry');
        done();
      });
  });
});

// About a specific entry
// ________________________
// ______________________

describe('Viewing a specific entry', () => {
  it('first sign up a user', (done) => {
    chai.request(app)
      .post('/v1/auth/signup')
      .send(mockData.Entry_SignUp5)
      .end((_err, res) => {
        tokenFive = res.body.data.token;
        done();
      });
  });
  it('first sign up another user', (done) => {
    chai.request(app)
      .post('/v1/auth/signup')
      .send(mockData.Entry_SignUp6)
      .end((_err, res) => {
        tokenSix = res.body.data.token;
        done();
      });
  });
  it('User should create an entry', (done) => {
    chai.request(app)
      .post('/v1/entries') // entry 4
      .set('Authorization', `Bearer ${tokenFive}`)
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
  it('User should view a specific entry', (done) => {
    chai.request(app)
      .get('/v1/entries/6')
      .set('Authorization', `Bearer ${tokenFive}`)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('createdOn');
        res.body.data.should.have.property('user_email');
        res.body.data.should.have.property('title');
        res.body.data.should.have.property('description');
        done();
      });
  });
  it('User should not view a specific entry if not signed up', (done) => {
    chai.request(app)
      .get('/v1/entries/6')
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('message').eql('You are not authorised for this operation. Sign in first.');
        done();
      });
  });
  it('User should not view a specific entry with an invalid token', (done) => {
    chai.request(app)
      .get('/v1/entries/6')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLTMwMGViODQwIiwiZW1haWwiOiJrYWxpc2FAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiQ2hyaXN0aWFuIiwibGFzdE5hbWUiOiJLYWxpc2EiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTY5MzI4MjY5fQ.Rzbk2yB0hM-vUV5OokmiIHT7IrTIPDuFXE3VYekDeo0')
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('message').eql('You are not authorised for this operation. Sign in first.');
        done();
      });
  });
  it('User should not view a specific entry that he had not made', (done) => {
    chai.request(app)
      .get('/v1/entries/300')
      .set('Authorization', `Bearer ${tokenFive}`)
      .end((_err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('message').eql('the entry was not found');
        done();
      });
  });
  it('User should not view entry with an invalid Id', (done) => {
    chai.request(app)
      .get('/v1/entries/-10ab')
      .set('Authorization', `Bearer ${tokenFive}`)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('id is not valid');
        done();
      });
  });
});

// Modify entry
//= =================
//= =================

describe('Modify a specific entry', () => {
  it('User should modify an entry', (done) => {
    chai.request(app)
      .patch('/v1/entries/6')
      .set('Authorization', `Bearer ${tokenFive}`)
      .send(mockData.Entry_1)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('entry successfully edited');
        res.body.should.have.property('data');
        res.body.data.should.have.property('title');
        res.body.data.should.have.property('description');
        done();
      });
  });
  it('User should not modify entry if not signed up', (done) => {
    chai.request(app)
      .patch('/v1/entries/5')
      .send(mockData.Entry_1)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error').eql('You are not authorised for this operation. Sign in first.');
        done();
      });
  });
  it('User should not modify an entry with an invalid token', (done) => {
    chai.request(app)
      .patch('/v1/entries/5')
      .send(mockData.Entry_1)
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySyeryrteyrteyereryrtoiQ2hyaXN0aWFuIiwibGFzdE5hbWUiOiJLYWxpc2EiLCJpc0FkbWluIgfdgsgdfgdfgdfsgyrtey')
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error').eql('You are not authorised for this operation. Sign in first.');
        done();
      });
  });
  it('User should not modify entry that he had not made', (done) => {
    chai.request(app)
      .patch('/v1/entries/300')
      .set('Authorization', `Bearer ${tokenFive}`)
      .send(mockData.Entry_1)
      .end((_err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('the entry was not found');
        done();
      });
  });
  it('User should not modify another users\'s entry', (done) => {
    chai.request(app)
      .patch('/v1/entries/1')
      .set('Authorization', `Bearer ${tokenFive}`)
      .send(mockData.Entry_1)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error').eql('you can not edit another user\'s entry');
        done();
      });
  });

  // check if the user input is valid
  it('User should not modify an entry with an empty title', (done) => {
    chai.request(app)
      .patch('/v1/entries/5')
      .set('Authorization', `Bearer ${tokenFive}`)
      .send(mockData.Entry_titleEmpty)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('title is not allowed to be empty');
        done();
      });
  });
  it('User should not modify an entry with missing title', (done) => {
    chai.request(app)
      .patch('/v1/entries/5')
      .send(mockData.Entry_missingTitle)
      .set('Authorization', `Bearer ${tokenFive}`)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('title is required');
        done();
      });
  });
  it('User should not modify an entry with empty description', (done) => {
    chai.request(app)
      .patch('/v1/entries/5')
      .send(mockData.Entry_descriptionEmpty)
      .set('Authorization', `Bearer ${tokenFive}`)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('description is not allowed to be empty');
        done();
      });
  });
  it('User should not modify an entry with missing description', (done) => {
    chai.request(app)
      .patch('/v1/entries/5')
      .send(mockData.Entry_missingDescription)
      .set('Authorization', `Bearer ${tokenFive}`)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('description is required');
        done();
      });
  });

  // Delete entry
  //= =================
  //= =================

  it('User should delete an entry', (done) => {
    chai.request(app)
      .delete('/v1/entries/6')
      .set('Authorization', `Bearer ${tokenFive}`)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message').eql('entry successfully deleted');
        done();
      });
  });
  it('User should not delete entry if not signed up', (done) => {
    chai.request(app)
      .delete('/v1/entries/5')
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error').eql('You are not authorised for this operation. Sign in first.');
        done();
      });
  });
  it('User should not delete an entry with an invalid token', (done) => {
    chai.request(app)
      .delete('/v1/entries/5')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySyeryrteyrteyereryrtoiQ2hyaXN0aWFuIiwibGFzdE5hbWUiOiJLYWxpc2EiLCJpc0FkbWluIgfdgsgdfgdfgdfsgyrtey')
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error').eql('You are not authorised for this operation. Sign in first.');
        done();
      });
  });
  it('User should not delete entry that does not exist', (done) => {
    chai.request(app)
      .delete('/v1/entries/300')
      .set('Authorization', `Bearer ${tokenFive}`)
      .end((_err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('message').eql('the entry was not found');
        done();
      });
  });
  it('User should not delete another users\'s entry', (done) => {
    chai.request(app)
      .delete('/v1/entries/1')
      .set('Authorization', `Bearer ${tokenFive}`)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error').eql('you can not delete another user\'s entries');
        done();
      });
  });

  it('User should not delete entry with an invalid Id', (done) => {
    chai.request(app)
      .delete('/v1/entries/-10ab')
      .set('Authorization', `Bearer ${tokenFive}`)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('id is not valid');
        done();
      });
  });
});
}


export default entriesTestsv1;