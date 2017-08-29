
const Responder = require('../services/responder');
const Error = require('../services/errors');
const Task = require('../models/task');
const User = require('../models/user');

module.exports = {

  add: (req, res, next) => {
    var params = req.body;
    var task = new Task(params);
    task.save(function(err) {
      if(err) {
        Responder.error(res, err);
      }
      else {
        Responder.success(res, task);
      }
    });
  }
}
