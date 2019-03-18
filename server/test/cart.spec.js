const app = require('../app');
const chai = require('chai');
const {expect} = chai;

chai.use(require('chai-http'));

describe('routes carts', function () {
  var token = '';
  var id_product = '';
  var id_cart = '';
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

    it('should list product', function (done) {
      chai
        .request(app)
        .get('/products')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          id_product = res.body[0]._id;
          done()
        })
    });

    it('should create carts', function (done) {
      console.log(id_product);
      chai
        .request(app)
        .post('/carts')
        .set('Authorization', token)
        .send({
          products: id_product,
          quantity: 5
        })
        .end(function (err, res) {
          expect(res).to.have.status(201);
          id_cart = res.body._id;
          done()
        })
    });

    it('should delete carts', function (done) {
      chai
        .request(app)
        .delete('/carts/' + id_cart)
        .set('Authorization', token)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done()
        })
    });
  });

  describe('fail', function () {
    it('should missing carts', function (done) {
      chai
        .request(app)
        .delete('/carts/' + id_cart)
        .set('Authorization', token)
        .end(function (err, res) {
          expect(res).to.have.status(204);
          done()
        })
    });
  });
});