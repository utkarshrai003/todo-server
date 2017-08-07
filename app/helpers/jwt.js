
var jwt = require('jsonwebtoken');
var env = require('../../config/environment');

module.exports = {
  // Method to create a jwt token for authentication.
  // user is an object having basic info for the users.
  generateToken: (user) => {
    return jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: {
        _id: user._id,
        email: user.email,
        name: user.name
      },
    }, env.jwtSecret);
  },

  verifyToken: (token) => {

  }
}
