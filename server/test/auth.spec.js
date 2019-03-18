const app = require('../app');
const chai = require('chai');
const faker = require('faker');

const {expect} = chai;

chai.use(require('chai-http'));

describe('routes auth', function () {
  var data = {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password()
  };
  describe('success', function () {

    it('should create new user', function (done) {
      chai
        .request(app)
        .post('/auth/register')
        .send(Object.assign(data, {
          username: 'admin',
          password: 'uye'
        }))
        .end(function (err, res) {
          expect(res).have.status(201);
          expect(res).to.be.a('object');
          expect(res.body.username).to.equal(data.username);
          expect(res.body.password).to.not.equal(data.password);
          done();
        })
    });

    it('should post login success', function (done) {
      chai
        .request(app)
        .post('/auth/login')
        .send({user: 'admin', password: 'uye'})
        .end(function (err, res) {
          expect(res).have.status(200);
          expect(res.body).to.have.property('token');
          done();
        })
    });
  });

  describe('fail', function () {
    it('should duplicate email register', function (done) {
      chai
        .request(app)
        .post('/auth/register')
        .send(data)
        .end(function (err, res) {
          expect(res).have.status(422);
          expect(res).to.be.a('object');
          done();
        })
    });

    it('should post login fail', function (done) {
      chai
        .request(app)
        .post('/auth/login')
        .send({user: data.username, password: data.password + Math.random()})
        .end(function (err, res) {
          expect(res).have.status(403);
          expect(res.body).to.have.property('message');
          done();
        })
    });
  })
});
