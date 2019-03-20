const app = require('../app');
const chai = require('chai');

const drop = require('../helpers/drop');
var auth = require('./dummy/auth');
const {data, methods, success, fail} = require('./dummy/product');

const {expect} = chai;

chai.use(require('chai-http'));

describe('routes products', function () {

  before(function () {
    drop.collection('product')
  });

  describe('success', function () {
    auth
      .methods
      .login(app, chai, auth.data.seller, (err, res, done) => {
        auth.data.seller['id'] = res.body.id;
        auth.data.seller['token'] = res.body.token;
        done();
      });

    it('should created product', function (done) {
      chai
        .request(app)
        .post('/products')
        .set('Authorization', auth.data.seller.token)
        .send(success.create)
        .end(function (err, res) {
          console.log(res.body);
          expect(res).to.have.status(201);
          data.product.id = res.body._id;
          data.product.slug = res.body.slug;
          done()
        })
    });

    it('should list product', function (done) {
      chai
        .request(app)
        .get('/products')
        .end(function (err, res) {
          console.log(res.body);
          expect(res).to.have.status(200);
          done()
        })
    });

    it('should read product with slug ', function (done) {
      chai
        .request(app)
        .get('/products/' + data.product.slug)
        .end(function (err, res) {
          console.log(res.body);
          expect(res).to.have.status(200);
          done();
        })
    });

    it('should update product with id ', function (done) {
      chai
        .request(app)
        .put('/products/' + data.product.id)
        .set('Authorization', auth.data.seller.token)
        .send({title: success.create.title + ' Update'})
        .end(function (err, res) {
          console.log(res.body);
          expect(res).to.have.status(200);
          done()
        })
    });

    it('should delete product with id', function (done) {
      chai
        .request(app)
        .delete('/products/' + data.product.id)
        .set('Authorization', auth.data.seller.token)
        .end(function (err, res) {
          console.log(res.body);
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
        .send(success.create)
        .end(function (err, res) {
          console.log(res.body);
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
        .send(success.create)
        .end(function (err, res) {
          console.log(res.body);
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
    });

    it('should missing product with slug', function (done) {
      chai
        .request(app)
        .get('/products/' + data.product.slug)
        .end(function (err, res) {
          console.log(res.body);
          expect(res).to.have.status(204);
          done();
        })
    });
  });
});