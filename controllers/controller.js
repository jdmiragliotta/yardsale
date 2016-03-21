var Item = require('../models/item.js')
var User = require('../models/user.js')
var Comment = require('../models/comment.js')

exports.home = function(req, res, next){
  res.sendFile(process.cwd() + '/public/views/index.html');
}

exports.getLogin = function(req, res, next){
  User.findOne({
    username: req.user.username
  })
  .select('username money collectedItems')
  .exec()
  .then(function(user){
    res.json(user);
  });
}

exports.logout = function(req, res, next){
  req.session.destroy(function (err){
    res.redirect('/');
  });
}

exports.getItems = function(req, res, next){
  Item.fine({})
  .populate('_owner', 'username')
  .populate({
    path: 'comments',
    populate:{
      path: '_owner',
      select: 'username'
    }
  })
  .exec()
  .then(function(itmes){
    res.json(items);
  });
}

exports.getComments = function(req, res, next){
  var itemName = req.body.itemName;
  var commentMessage = req.body.commentMessage;
  var comment = new Comment({
    commentMessage: commentMessage,
    itemLink: itemName
  });

  comment.save(function(err){
    if(err) throw err;
    Item.update({
      itemName: itemName
    }, {
      $push: {comments: comment._id}
    }, function(err, updated){
      if (err) throw err;
      res.json({});
    });
  });
}

exports.newItem = function(req, res, next){
  var itemName = req.body.itenName;
  var itemDescription = req.body.itemDescription;
  var itemPrice = req.body.itemPrice;
  var item = new Item({
    itemName: itemName,
    itemDescription: itemDescription,
    itemPrice: itemPrice
  });

  item.save(function(err){
    if (err) throw err;
    res.json({});
  })
}

exports.buyItem = function(req, res, next){
  Item.findOneAndUpdate({
    _id:req.body.itemId
  }, {
    $set: {'itemSold': true}
  }, function(err, updated){
    if(err) throw err;

  User.findOneAndUpdate({
    _id: req.user.id
  }, {
    $set: {
      money: req.body.userMoney
    },
    $push: {
      'collectedItems':update._doc.itemName
    }
  }, function(err, user){
    if (err) throw err;
  })
  res.json({});
 });
}
