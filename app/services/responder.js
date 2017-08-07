
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
  }
}
