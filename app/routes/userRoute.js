
const passport = require('passport');
const User = require('../models/user');
const Responder = require('../services/responder');

module.exports = {

  // Endpoint to Sign Up a User with email and password
  signUp: (req, res, next) => {
    var params = req.body;
    var [ email, password, password_confirmation ] =
        [ params.email, params.password, params.password_confirmation ];

    if(!email || !password)
      Responder.error(res, {code: 400, message: "Please provide both email and password"});
    else if(password !== password_confirmation)
      Responder.error(res, {code: 400, message: "Password and password confirmation doen not match"});
    else{
      User.add(email, password)
      .then((user) => {
        Responder.success(res, user);
      })
      .catch((err) => {
        Responder.error(res, err);
      });
    }
  },

  // Endpoint to Login a user with email and password
  login: (req, res, next) => {
    var params = req.body;
    var [ email, password ] = [ params.email, params.password ];
    if(!email || !password) {
      Responder.error(res, {code: 400, message: "Both email and password are required to Login"});
    }
    else {
      User.login(email, password)
      .then((user) => {
        Responder.success(res, user);
      })
      .catch((err) => {
        Responder.error(res, err);
      });
    }
  },

  // Endpoint to receive the callback from google api
  googleAuthCallback: (req, res, next) => {
    res.send("google authentication successfull");
  },

  // Endpoint to receive callback from facebook api
  facebookAuthCallback: (req, res, next) => {
    res.send("facebook authentication successfull");
  }

}
