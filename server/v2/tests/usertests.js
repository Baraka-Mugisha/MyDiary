import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import mockData from './mockData';
import userTestsv1 from '../../v1/tests/usertests';

chai.use(chaiHttp);
chai.should();

userTestsv1();
