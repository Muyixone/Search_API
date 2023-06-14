const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name must be provided'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  company: {
    type: String,
    enum: ['twitter', 'facebook', 'amazon', 'google', 'microsoft'],
    required: [true, 'Company must be a valid selection'],
  },

  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  price: {
    type: Number,
    required: [true, 'Product price must be provided'],
  },
});

module.exports = mongoose.model('Product', productSchema);
