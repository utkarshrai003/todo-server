
const jwt = require('./jwt');
const Responder = require('../services/responder');

module.exports = {

  isAuthenticated: (req, res, next) => {
    let accessToken = req.headers.authorization;
    jwt.verifyToken(accessToken)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        Responder.error(res, {code: 401, message: "Invalid Authetication token"});
      });
  }
}
