
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  collaborators: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
  // order: { type: Number },
  // tasks: { one to many association with task },
  // comments: {},
  // attachments: {}
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
