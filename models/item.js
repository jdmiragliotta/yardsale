var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  //Connecting item to owner
  _owner: {
    type: Schema.Types.ObjectId
    ref: 'User'
  },
  itemName: String;
  itemDescription: String;
  itemPrice: Number,
  itemSold: Boolean,
  // comments needs to be an array because an item can have several comments - connecting item to comments
  comments: [{
    type: Schema.Types.ObjectId
    ref: 'Comment'
  }]
});

Item = mongoose.model('Item', itemSchema);
module.exports = Item;
