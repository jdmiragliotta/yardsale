var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  //Connecting comment to User
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  itemLink: String,
  commentMessage: String
});

Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
