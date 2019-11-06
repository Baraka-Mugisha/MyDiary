import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const serverTestsv1 = () => {
  chai.use(chaiHttp);
  chai.should();

  describe('App tests', () => {
    it('should display a welcome message', (done) => {
      chai.request(app)
        .get('/')
        .end((_err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('Welcome to MyDiary');
          done();
        });
    });
  });

  describe('Handle invalid routes', () => {
    it('should display an error message', (done) => {
      chai.request(app)
        .get('/diadiaryry')
        .end((_err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('error').eql('Route /diadiaryry Not found.');
          done();
        });
    });

    it('should display an error message on inexistent route', (done) => {
      chai.request(app)
        .post('/diadiaryry')
        .end((_err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('error').eql('Route /diadiaryry Not found.');
          done();
        });
    });
  });
};

export default serverTestsv1;
