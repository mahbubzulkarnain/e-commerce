const router = require('express').Router();
const Cart = require('../models/cart/index');
const jwt = require('../middlewares/jwt');

router
  .patch('/:id/quantity/:product/min', jwt, function ({params, body}, res) {
    Cart
      .findOneAndUpdate({
        _id: params.id,
        'transactions.product': params.product
      }, {
        $inc: {
          'transactions.$.quantity': -1
        }
      }, {
        new: true
      })
      .then((props) => {
        res
          .json(props);
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({
            message: `Internal Server Error`
          })
      })
  })
  .patch('/:id/quantity/:product/plus', jwt, function ({params, body}, res) {
    Cart
      .findOneAndUpdate({
        _id: params.id,
        'transactions.product': params.product
      }, {
        $inc: {
          'transactions.$.quantity': 1
        }
      }, {
        new: true
      })
      .then((props) => {
        res
          .json(props);
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({
            message: `Internal Server Error`
          })
      })
  })
  .delete('/:id/remove/:product', jwt, function ({params, body}, res) {
    Cart
      .update({_id: params.id}, {"$pull": {"transactions": {"product": params.product}}}, {
        safe: true,
        multi: true
      }, async function (err, obj) {
        if (err) {
          res
            .status(500)
            .json({
              message: `Internal Server Error`
            })
        } else {

          res.json(await Cart.findById(params.id).exec())
        }
      });
  })
  .patch('/:id/add', jwt, function ({params, body}, res) {
    Cart
      .findById(params.id)
      .then(async (cart) => {
        if (!cart) {
          res
            .status(204)
            .send();
        } else {
          let transaction = {};
          try {
            transaction = JSON.parse(body.transactions);
          } catch (e) {
            transaction = body.transactions
          }
          cart.transactions.push(transaction);
          res
            .json(await cart.save());
        }
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({
            message: `Internal Server Error`
          })
      })
  })
  .delete('/:id', jwt, function ({params}, res) {
    Cart
      .findOne({
        buyer: res.locals.user.id,
        _id: params.id
      })
      .then(async (cart) => {
        if (!cart) {
          res
            .status(204)
            .send();
        } else {
          res
            .json(await cart.remove());
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({
            message: `Internal Server Error`
          })
      })
  });

router
  .get('/', jwt, function (req, res) {
    Cart
      .find()
      .then()
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
  .post('/', jwt, function ({body}, res) {
    let transactions = [];
    try {
      if (body.transactions) {
        transactions = (JSON.parse(body.transactions))
      }
    } catch (e) {
      transactions = body.transactions
    }
    (new Cart({
      buyer: res.locals.user.id,
      transactions
    })).save((err, data) => {
      console.log(err, data, 'ini');
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({
            message: 'Internal Server Error'
          })
      } else {
        res
          .status(201)
          .json(data)
      }
    })
  });

module.exports = router;