const app = require('../app');
const faker = require('faker');
const chai = require('chai');

const {expect} = chai;

chai.use(require('chai-http'));

describe('routes products', function () {
  var token = '';
  var slug = '';
  var id = '';
  let data = {
    title: faker.commerce.productName(),
    description: faker.name.jobDescriptor(),
    price: faker.random.number(),
    stock: faker.random.number(),
    weight: faker.random.number(),
    condition: 0,
    notes: faker.name.jobDescriptor()
  };

  describe('success', function () {
    it('should login', function (done) {
      chai
        .request(app)
        .post('/auth/login')
        .send({
          user: 'admin',
          password: 'uye'
        })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          token = res.body.token;
          done();
        })
    });

    it('should created product', function (done) {
      chai
        .request(app)
        .post('/products')
        .set('Authorization', token)
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(201);
          id = res.body._id;
          slug = res.body.slug;
          done()
        })
    });

    it('should list product', function (done) {
      chai
        .request(app)
        .get('/products')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done()
        })
    });

    it('should read product with slug ' + slug, function (done) {
      chai
        .request(app)
        .get('/products/' + slug)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        })
    });

    it('should update product with id ' + id, function (done) {
      chai
        .request(app)
        .put('/products/' + id)
        .set('Authorization', token)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done()
        })
    });

    it('should delete product with id ' + id, function (done) {
      chai
        .request(app)
        .delete('/products/' + id)
        .set('Authorization', token)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done()
        })
    });
  });

  describe('fail', function () {
    it('should create product unauthorized', function (done) {
      chai
        .request(app)
        .post('/products')
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
    });

    it('should update product unauthorized', function (done) {
      chai
        .request(app)
        .post('/products')
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
    });

    it('should missing product with slug ' + slug, function (done) {
      chai
        .request(app)
        .get('/products/' + slug)
        .end(function (err, res) {
          expect(res).to.have.status(204);
          done();
        })
    });
  });
});