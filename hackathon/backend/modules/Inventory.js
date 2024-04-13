const mongoose = require('mongoose')
const { Schema } = mongoose;

const inventorySchema = new Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'seller'
  }
  , name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  itemcode: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;