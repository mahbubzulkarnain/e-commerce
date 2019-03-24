require('./config/test');

const app = require('../app');
const chai = require('chai');
const {expect} = chai;

const drop = require('../helpers/drop');

var auth = require('./dummy/auth');
const product = require('./dummy/product');
const {data, methods, success, fail} = require('./dummy/cart');

chai.use(require('chai-http'));

describe('routes Carts', function () {

  before(function () {
    drop.collection('cart')
  });

  describe('Success', function () {
    auth
      .methods
      .login(app, chai, auth.data.seller, (err, res, done) => {
        auth.data.seller['id'] = res.body.id;
        auth.data.seller['token'] = res.body.token;
        done();
      });

    describe('/POST /products HEAD Authorization', function () {
      it('should created product', function (done) {
        chai
          .request(app)
          .post('/products')
          .set('Authorization', auth.data.seller.token)
          .send(product.success.create)
          .end(function (err, res) {
            console.log(res.body);
            expect(res).to.have.status(201);
            product.data.product.id = res.body._id;
            product.data.product.slug = res.body.slug;
            done()
          })
      });
    });

    describe('/POST /carts HEAD Authorization', function () {
      it('should create carts', function (done) {
        chai
          .request(app)
          .post('/carts')
          .set('Authorization', auth.data.seller.token)
          .send({
            transactions: {
              "products": product.data.product.id,
              "quantity": 5
            }
          })
          .end(function (err, res) {
            expect(res).to.have.status(201);
            data.cart.id = res.body._id;
            done()
          })
      });

      it('should create carts', function (done) {
        chai
          .request(app)
          .post('/carts')
          .set('Authorization', auth.data.seller.token)
          .send({
            transactions: {
              "products": product.data.product.id,
              "quantity": 5
            }
          })
          .end(function (err, res) {
            expect(res).to.have.status(201);
            data.cart.id = res.body._id;
            done()
          })
      });
    });

    describe('/DELETE /carts/:id HEAD Authorization', function () {
      it('should delete carts', function (done) {
        chai
          .request(app)
          .delete('/carts/' + data.cart.id)
          .set('Authorization', auth.data.seller.token)
          .end(function (err, res) {
            expect(res).to.have.status(200);
            done()
          })
      });
    });
  });

  describe('Fail', function () {
    describe('/DELETE /carts/:id HEAD Authorization', function () {
      it('should missing carts', function (done) {
        chai
          .request(app)
          .delete('/carts/' + data.cart.id)
          .set('Authorization', auth.data.seller.token)
          .end(function (err, res) {
            expect(res).to.have.status(204);
            done()
          })
      });
    });
  });
});