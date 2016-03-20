var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var db = 'mongodb://localhost/yardsale';
mongoose.connect(db)

//Create item document
var itemSchema = new Schema({
  //Connecting item to owner
  _owner: {
    type: Schema.Types.ObjectId
    ref: 'User'
  },
  itemName: String;
  itemPrice: Number,
  itemSold: Boolean,
  // comments needs to be an array because an item can have several comments - connecting item to comments
  comments: [{
    type: Schema.Types.ObjectId
    ref: 'Comment'
  }]
});

//Create user document
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

userSchema.pre('save', function(next){
  var user = this;
  //only hash the password if it has been modified or is new
  if(!user.isModified('password')) return next();

  //generate a salt
  bcrypt.genSalt(10, function(err, salt){
    if(err) return next(err);
    // hash the password along with new salt
    bcrypt.hash(user.password, salt, function(err, hash){
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});


