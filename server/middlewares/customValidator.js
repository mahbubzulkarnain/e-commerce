const expressValidator = require('express-validator');
const {ObjectId} = (require('mongoose')).Types;
const User = require('../models/user/index');

function isParamsUserAvailable(params) {
  return new Promise((resolve, reject) => {
    User
      .findOne(params)
      .then((user) => {
        if (!user) {
          resolve(true)
        } else {
          reject(false)
        }
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      })
  })
}

module.exports = expressValidator({
  customValidators: {
    usernameIsAvailable: function (username, id = '') {
      return isParamsUserAvailable(((id !== '') ? {
        username: username,
        _id: {$ne: new ObjectId(id)}
      } : {username: username}))
    },
    emailIsAvailable: function (email, id = '') {
      return isParamsUserAvailable(((id !== '') ? {email: email, _id: {$ne: new ObjectId(id)}} : {email: email}))
    }
  }
});