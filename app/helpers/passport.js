
// var JwtStrategy = require('passport-jwt').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

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

// Passport Facebook Strategy
passport.use(new FacebookStrategy({
  // pull in our app id and secret from our auth.js file
  clientID        : configAuth.facebookAuth.clientID,
  clientSecret    : configAuth.facebookAuth.clientSecret,
  callbackURL     : configAuth.facebookAuth.callbackURL
},
// facebook will send back the token and profile
function(token, refreshToken, profile, done) {
  // find the user in the database based on their facebook id
  User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
    // if there is an error, stop everything and return that
    // ie an error connecting to the database
    if (err)
    return done(err);

    // if the user is found, then log them in
    if (user) {
      return done(null, user); // user found, return that user
    } else {
      // if there is no user found with that facebook id, create them
      var newUser = new User();

      // set all of the facebook information in our user model
      newUser.facebook.id    = profile.id; // set the users facebook id
      newUser.facebook.token = token; // we will save the token that facebook provides to the user
      newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
      newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

      // save our user to the database
      newUser.save(function(err) {
        if (err)
        throw err;

        // if successful, return the new user
        return done(null, newUser);
      });
    }

  });
}));




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
