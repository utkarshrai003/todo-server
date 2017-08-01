
// var JwtStrategy = require('passport-jwt').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../models/user');
var configAuth = require('../../config/auth');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  // Passport Google Strategy
  passport.use(new GoogleStrategy ({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL,
  },
  function(token, refreshToken, profile, done) {
    User.findOne({'google.id': profile.id}, function(err, user) {
      if(err)
        return done(err);

      if(user) {
        return done(null, user);
      }
      else {
        let newUser = new User();
        newUser.google.id = profile.id;
        newUser.google.token = token;
        newUser.google.name = profile.displayName;
        newUser.google.email = profile.emails[0].value;

        // save the user
        newUser.save(function(err) {
          console.log("error is here" + err);
          if(err)
            throw err;

          return done(null, newUser);
        });
      }
    });
  }
))

//   passport.use(new TokenStrategy({
//     usernameFiled: 'email',
//     passwordField: 'password',
//     session: false
//   },
//   function(req, email, password, done) {
//     User.findOne({'local.email'}, function(err, user) {
//       if(err)
//         return done(err);
//
//         if(user) {
//           return done(null, false);
//         }
//         else {
//           var newUser = new User();
//           newUser.local.email = email;
//           newUser.locl.password = newUser.generateHash(password);
//
//           newUser.save(function(err) {
//             if(err)
//               throw err;
//             return done(null, newUser);
//           });
//         }
//     });
//   }
// )
}
