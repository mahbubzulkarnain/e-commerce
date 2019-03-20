const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: (require('../user')).collection.name
  },
  transactions: [
    {
      products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: (require('../product')).collection.name
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
  created_at: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('carts', cartSchema);