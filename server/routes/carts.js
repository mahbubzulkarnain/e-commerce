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
    (new Cart({
      buyer: res.locals.user.id,
      products: body.products,
      quantity: body.quantity
    })).save((err, data) => {
      if (err) {
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