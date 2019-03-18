const router = require('express').Router();
const User = require('../models/user/index');
const bcrypt = require('bcrypt');
const jwt = require('../helpers/jwt');

router
  .post('/register', function ({body}, res, next) {
    (new User(body))
      .save((err, data) => {
        if (err) {
          res
            .status(422)
            .json({
              message: err
            })
        } else {
          res
            .status(201)
            .json(data)
        }
      })
  })
  .post('/login', function ({body}, res) {
    User
      .findOne({
        $or: [
          {username: body.user},
          {email: body.email},
        ]
      })
      .then((prop) => {
        if (prop && bcrypt.compareSync(body.password, prop.password)) {
          res
            .status(200)
            .json({
              token: jwt.sign({
                id: prop._id
              })
            })
        } else {
          res
            .status(403)
            .json({
              message: 'Unauthorized'
            })
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
  });

module.exports = router;
