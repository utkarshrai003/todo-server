
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;

// load up the user model
var User = require('../models/user');

// load the auth variables
var configAuth = require('./auth');

module.exports = function() {

  // passport.use(new GoogleStrategy ({
  //   clientId: configAuth.googleAuth.clientID,
  //   clientSecret: configAuth.googleAuth.clientSecret,
  //   callbackURL: configAuth.googleAuth.callbackURL,
  // },
  // function(token, refreshToken, profile, done) {
  //   User.findOne({'google.id': profile.id}, function(err, user) {
  //     if(err)
  //       return done(err);
  //
  //     if(user) {
  //       return done(null, user);
  //     }
  //     else {
  //       let newUser = new User();
  //       newUser.google.id = profile.id;
  //       newUser.google.token = token;
  //       newUser.google.name = profile.displayName;
  //       newUser.google.email = profile.emails[0].value;
  //
  //       // save the user
  //       newUser.save(function(err) {
  //         if(err)
  //           throw err;
  //
  //         return done(null, newUser);
  //       });
  //     }
  //   });
  // });

  passport.use(new TokenStrategy({
    usernameFiled: 'email',
    passwordField: 'password',
    session: false
  },
  function(req, email, password, done) {
    User.findOne({'local.email'}, function(err, user) {
      if(err)
        return done(err);

        if(user) {
          return done(null, false);
        }
        else {
          var newUser = new User();
          newUser.local.email = email;
          newUser.locl.password = newUser.generateHash(password);

          newUser.save(function(err) {
            if(err)
              throw err;
            return done(null, newUser);
          });
        }
    });
  }
)


}
