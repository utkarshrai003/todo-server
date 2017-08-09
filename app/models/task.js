
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true
   },
  due_date: {
     type: Date
   },
  priority: {
    type: String,
    enum: ['p1', 'p2', 'p3']
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  reminder: {
    isSet: {
      type: Boolean,
    },
    time: {
      type: Date
    }
  },
  assigned_to: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
