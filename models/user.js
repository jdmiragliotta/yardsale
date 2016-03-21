var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
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

User = mongoose.model('User', userSchema);
module.exports = User;
