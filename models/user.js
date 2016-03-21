var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String;
  money: Number,
  // collectedItems needs to be an array because user can have many items
  collectedItems:  [{
    type: String
  }]
});

User = mongoose.model('User', userSchema);
module.exports = User;
