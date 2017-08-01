
var passport = require('passport');
var User = require('../models/user');

module.exports = {

  signUp: (req, res, next) => {
    var params = req.body;
    var email = params.email;
    var password = params.password;
    var password_confirmation = params.password_confirmation;

    if(!email || !password)
      res.send("Please provide both email and password");
    if(password !== password_confirmation)
      res.send("Password and password confirmation does not match");

    User.add(email, password)
    .then((user) => {
      console.log("I came here bro");
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    })
  },

  login: (req, res, next) => {
  },

  googleAuthentication: (req, res, next) => {
    passport.authenticate('google', {scope: ['profile', 'email']});
  }

}
