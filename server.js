
const express = require('express');
const http = require('http');
const database = require('./config/database');
const passport = require('passport');
const bodyParser = require('body-parser');

// specifying port
var port = process.env.PORT || 8080;

// authentication
const Auth = require('./app/services/auth');

// Creating server
const app = express();
const httpServer = http.createServer(app);
app.listen(port);

require('./app/services/passport')(passport);
// for passport
app.use(passport.initialize());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Import routes
const user = require('./app/routes/userRoute');

// Google Authentication Routes
app.get('/auth/google', passport.authenticate('google', {
  session: false,
  scope: [ 'https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email' ]}
));
app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), user.googleAuthCallback);

// Facebook Authentication Routes
app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect : '/login'}), user.facebookAuthCallback);

app.get('/check', Auth.isAuthenticated, function(req, res, next) {
  console.log("hllo bro");
  res. send("everytgjkdv is fine");
})

// Local authentication route
app.post('/sign_up', user.signUp);
app.post('/login', user.login);
