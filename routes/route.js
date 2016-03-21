var passport = require('passport');
var passportLocal = require('passport-local');
var bcrypt = require('bcryptjs');
var session = require('express-sessions');
var controller = require('../controllers/controller.js');
var User = require('../models/user.js');

module.exports.routes = function(app){

  app.use(require('express-sessions')({
    secret: 'ifitellyouitsnotasecret',
    resave: true,
    saveUninititialized: true,
    cookie: {secure : false, maxAge : (4 * 60 * 60 * 1000)}, //4 hours
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/', controller.home);

  app.get('/api/getItems', controller.getItems);

  app.post('/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/msg=Login Failed'
    })
  );

  app.post('/api/addComment', controller.addComment);
  app.post('/api/addItem', controller.addItem);
  app.post('/api/buyItem', controller.buyItem);

  //passport

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  // use method as callback when being authenticated
  passport.use(new passportLocal.Strategy(function(username, password, done) {
    // check the password in database
    User.findOne({
      username: username
    }).then(function(user) {
      console.log(user.id);
        // check the password against hash
        if(user){
          bcrypt.compare(password, user.password, function(err, userlogin) {
            if (userlogin) {
                  // if password is valid -- authenticate the user with cookie
                  done(null, {id: user.id, username: user.username});
                } else{
                  done(null, null);
                }
              });
        } else {
          done(null, null);
        }
      });

  }));

}// end module.exports.routes
