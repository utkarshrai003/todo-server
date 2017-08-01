
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcryptjs');

var userSchema = new Schema({
  name: String,
  accounts: {
    local: {
      email: String,
      password: String
    },
    google: {
      id: String,
      token: String,
      email: String,
      name: String
    }
  }
});

// method to hash the password string
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, 10);
}

// method to validate the password for the user
userSchema.methods.validPassword = function(hashedPassword) {
  return bcrypt.conpareSync(hashedPassword, this.local.password);
}

// method to return a promise to add the user with local strategy
userSchema.statics.add = function(email, password) {
  return new Promise(function(resolve, reject) {
    User.findOne({'accounts.local.email': email})
    .then(function(user) {
      if(!user) {
        var newUser = new User();
        newUser.accounts.local.email = email;
        newUser.accounts.local.password = newUser.generateHash(password);

        newUser.save(function(err) {
          if(err) reject(err);
          resolve(newUser);
        });
      }
    });
  });
}


var User = mongoose.model('User', userSchema);

module.exports = User;
