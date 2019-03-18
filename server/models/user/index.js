const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  }
});

userSchema.plugin(require('./middlewares'));

module.exports = mongoose.model('users', userSchema);