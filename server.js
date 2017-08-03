
const express = require('express');
const http = require('http');
const database = require('./config/database');
const passport = require('passport');
const bodyParser = require('body-parser');

// specifying port
var port = process.env.PORT || 8080;

// Creating server
const app = express();
const httpServer = http.createServer(app);
app.listen(port);

require('./app/helpers/passport')(passport);
// for passport
app.use(passport.initialize());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Import routes
const user = require('./app/routes/userRoute');

// User routes
app.get('/auth/google', passport.authenticate('google', { session: false, scope: [ 'https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email' ] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.send("google authentication successfull");
  });
app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {failureRedirect : '/login'}),
      function(req, res) {
        res.send("facebook authentication successfull");
      });
app.post('/sign_up', user.signUp);
app.post('/login', user.login);
