const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: (require('../user')).collection.name
  },
  products: {
    type: mongoose.Schema.Types.ObjectId,
    ref: (require('../product')).collection.name
  },
  quantity: {
    type: Number,
    default: 1
  }
});

module.exports = mongoose.model('carts', cartSchema);