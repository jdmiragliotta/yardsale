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
  itemDescription: String;
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

//Add Hash and Bcrypt to user password
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

//Create comment document
var commentSchema = new Schema({
  //Connecting comment to User
  _owner: {
    type: Schema.Types.ObjectId
    ref: 'User'
  },
  itemLink: String,
  commentMessage: String
});

// Setting all models
Item = mongoose.model('Item', itemSchema);
User = mongoose.model('User', userSchema);
Comment = mongoose.model('Comment', commentSchema);

// Create Seed Users, Items, Comments
var userOne = newUser({
  username:'johnsmith',
  password:'password',
  money: 10000,
  collectedItems:[]
});

//Save comments and items to userOne into DB
userOne.save(function(err){
  if (err) throw err;

  //Inputing Comments
  var commentOne: new Comment({
    _owner: userOne.id,
    itemLink: 'Monopoly'
    commentMessage: 'Simply a classic'
  });

   var commentTwo: new Comment({
    _owner: userOne.id,
    itemLink: 'Clue'
    commentMessage: 'Loved this growing up!'
  });

  commentOne.save(function(err){
    if(err) throw err;
    commentTwo.save(function(err){
       if(err) throw err;
    });
  });

   //Inputing Items

   var itemOne = new Item({
    itemName: 'Monopoly',
    itemDescription:'Players take the part of land owners, attempting to buy and then develop their land. Income is gained by other players visiting their properties and money is spent when they visit properties belonging to other players',    itemPrice: 5000,
    itemSold: false
   });

   itemOne.save(function(err){
    if(err) throw err;
   //Connecting Comments to items
    Item.update({itemName: 'Monopoly'}, {$push: {comments: commentOne._id}})
      .exec(function(err){
        if(err) throw err;
        console.log('successful');
      });
    });

   var itemTwo = new Item({
    itemName: 'Clue',
    itemDescription: 'The classic detective game! In Clue, players move from room to room in a mansion to solve the mystery of: who done it, with what, and where?',
    itemPrice: 4000,
    itemSold: false
   });

   itemTwo.save(function(err){
    if(err) throw err;
   //Connecting Comments to items
    Item.update({itemName: 'Clue'}, {$push: {comments: commentTwo._id}})
      .exec(function(err){
        if(err) throw err;
        console.log('successful');
      });
    });
});//End UserOne Creation

// Create Seed UserOne
var userTwo = newUser({
  username:'janesmith',
  password:'password',
  money: 15000,
  collectedItems:[]
});

userTwo.save(function(err){
  if (err) throw err;

  //Inputing Comments
  var commentOne: new Comment({
    _owner: userTwo.id,
    itemLink: 'Monopoly'
    commentMessage: 'I always got sent to Jail!'
  });

   var commentTwo: new Comment({
    _owner: userTwo.id,
    itemLink: 'Clue'
    commentMessage: 'Prof. Plum in the Conservatorty with the Wrench!'
  });

  commentOne.save(function(err){
    if(err) throw err;
    commentTwo.save(function(err){
       if(err) throw err;
    });
  });

   //Connecting Comments to items
  Item.update({itemName: 'Monopoly'}, {$push: {comments: commentOne._id}}) //here comments refers to comments section of the itemSchema
    .exec(function(err){
      if(err) throw err;
      console.log('successful');
    })

   //Connecting Comments to items
  Item.update({itemName: 'Life'}, {$push: {comments: commentTwo._id}})
    .exec(function(err){
      if(err) throw err;
      console.log('successful');
    });
});//End UserTwoCreation


