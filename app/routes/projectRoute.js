
const Responder = require('../services/responder');
const Error = require('../services/errors');
const Project = require('../models/project');
const User = require('../models/user');
const mongoose = require('mongoose');

module.exports = {

  add: (req, res, next) => {
    var params = req.body;
    var project = new Project(params);
    project.save(function(err) {
      if(err) {
        Responder.error(res, err);
      }
      else {
        Responder.success(res, project);
      }
    });
  },

  list: (req, res, next) => {
    var creator_id = req.query.creatorIdid;
    if(!mongoose.Types.ObjectId.isValid(creator_id)) {
      return Responder.error(res, Error.invalidObjectId());
    }
    else {
      var projectPromise = Project.find({ creator: creator_id }).exec();
      projectPromise.then((projects) => {
        Responder.success(res, projects);
      })
      .catch((err) => {
        Responder.error(res, err);
      });
    }
  }

}
