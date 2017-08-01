
var passport = require('passport');
var User = require('../models/user');

module.exports = {

  signUp: (req, res, next) => {
    var params = req.body;
    var [ email, password, password_confirmation ] =
        [ params.email, params.password, params.password_confirmation ];

    if(!email || !password)
      res.send("Please provide both email and password");
    if(password !== password_confirmation)
      res.send("Password and password confirmation does not match");

    User.add(email, password)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    })
  },

  login: (req, res, next) => {
    var params = req.body;
    var [ email, password ] = [ params.email, params.password ];
    if(!email || !password) {
      res.send("Both email and password are required to Login");
    }

    User.login(email, password)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    })
  },

  googleAuthentication: (req, res, next) => {
    passport.authenticate('google', {scope: ['profile', 'email']});
  }

}
