
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcryptjs');

var userSchema = new Schema({
  name: String,
  email: { type: String, index: true, unique: true, sparse: true },
  password: String,
  google: {
    id: String,
    token: String,
    email: { type: String, index: true, unique: true, sparse: true },
    name: String
  },
  facebook: {
    id: String,
    token: String,
    email: { type: String, index: true, unique: true, sparse: true },
    name: String
  },
});

// method to hash the password string
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, 10);
}

// method to validate the password for the user
userSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.accounts.local.password);
}

// method to return a promise to add the user with local strategy
userSchema.statics.add = function(email, password) {
  return new Promise((resolve, reject) => {
    User.findOne({'email': email})
    .then((user) => {
      if(!user) {
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.generateHash(password);

        newUser.save(function(err) {
          if(err) reject(err);
          resolve(newUser);
        });
      }
      else {
        reject("User account already exists");
      }
    });
  });
}

// method to login a user with
userSchema.statics.login = function(email, password) {
  return new Promise((resolve, reject) => {
    User.findOne({'email': email})
    .then((user) => {
      if(user.compareHash(password)) {
        resolve({
          email: user.email,
          token: "I will generate it"
        })
      }
      else {
        reject("Incorrect email and password combination");
      }
    });
  });
}

var User = mongoose.model('User', userSchema);

module.exports = User;
