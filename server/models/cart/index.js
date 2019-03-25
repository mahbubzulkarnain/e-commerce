const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: (require('../user')).collection.name
  },
  transactions: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: (require('../product')).collection.name
      },
      picture: {
        type: String,
        default: null
      },
      title: {
        type: String,
        required: [true, 'Title is required']
      },
      price: {
        type: Number,
        required: [true, 'Price is required']
      },
      weight: {
        type: Number,
        default: 0
      },
      condition: {
        type: Number,
        enum: [0, 1],//0: New, 1: Second
        default: 0,
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