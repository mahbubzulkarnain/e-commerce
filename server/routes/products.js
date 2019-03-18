const router = require('express').Router();
const Product = require('../models/product/index');
const jwt = require('../middlewares/jwt');

router
  .get('/:slug', function ({params}, res) {
    Product
      .findBySlug(params.slug)
      .then((prop) => {
        if (!prop) {
          res
            .status(204)
            .send()
        } else {
          res
            .json(prop)
        }
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({
            message: `Internal Server Error`
          })
      })
  })
  .put('/:id', jwt, function ({params, body}, res) {
    Product
      .findOne({
        _id: params.id,
        author: res.locals.user.id
      })
      .then((product) => {
        if (!product) {
          throw new Product().invalidate('product', 'Not found', '');
        }
        delete body['author'];
        Object.assign(product, body);
        return product.save();
      })
      .then((prop) => {
        res
          .json(prop)
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({
            message: `Internal Server Error`
          })
      })
  })
  .delete('/:id', jwt, function ({params, body}, res,) {
    Product
      .findOne({
        _id: params.id,
        author: res.locals.user.id
      })
      .then((product) => {
        if (!product) {
          res
            .status(204)
            .send()
        }
        return product.remove()
      })
      .then((prop) => {
        res
          .json(prop)
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({
            message: `Internal Server Error`
          })
      })
  });

router
  .get('/', function (req, res, next) {
    Product
      .find()
      .then((props) => {
        res
          .json(props)
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({
            message: `Internal Server Error`
          })
      })
  })
  .post('/', jwt, function ({body}, res, next) {
    body['author'] = res.locals.user.id;
    (new Product(body))
      .save((err, data) => {
        if (err) {
          console.error(err);
          res
            .status(422)
            .json(err)
        } else {
          res
            .status(201)
            .json(data)
        }
      })
  });

module.exports = router;