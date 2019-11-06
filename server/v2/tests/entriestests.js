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
