
const Mongoose = require('mongoose');

// Database hosted on mlab.com
Mongoose.connect('mongodb://localhost/todo-server');

var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.on('connect', function callback() {
    console.log("Connection with database succeeded.");
});

exports.Mongoose = Mongoose;
exports.db = db;
