const router = require('express').Router();
const Cart = require('../models/cart/index');
const jwt = require('../middlewares/jwt');

router
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
  })
  .post('/', jwt, function ({body}, res) {
    let transactions = [];
    if (body.transactions instanceof Array) {
      console.log('array');
      transactions = body.transactions;
    } else if (body.transactions instanceof Object) {
      console.log('object');
      transactions.push(body.transactions)
    } else if (body.transactions) {
      transactions = (JSON.parse(body.transactions))
    }
    console.log(transactions);
    (new Cart({
      buyer: res.locals.user.id,
      transactions
    })).save((err, data) => {
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