
const errors = require('./errors');

module.exports = {

  // Method to send success response to the user.
  success: (res, data) => {
    res.status(200).send(data);
  },

  // Method to send error response to the user.
  error: (res, error) => {
    res.status(200).send({
        error: {
          code: error.code,
          message: error.message
        }
    });
  },

  init: (req, res, next) => {
    req.data = {};
    req.data = {};
    switch (req.method) {
      case 'POST': req.data = req.body; break;
      case 'GET': req.data = req.query; break;
      default :
    }
    console.log();
    next();
  },

  // Middleware to respond the request with data property set in res object
  // reply: (res, error, next) => {
  //   // If request is unhandled, forward call to next middle ware.
  //   if(!req.route || !req.route.stack) next();
  //   // If headers are not yet sent, send res.
  //   if(!res.headersSent) {
  //     res.send({data: res.data});
  //   }
  // }
}
