
// Npm modules
const express = require('express');
const http = require('http');
const passport = require('passport');
const bodyParser = require('body-parser');

// Local modules
const Auth = require('./app/services/auth');
const database = require('./config/database');
const Responder = require('./app/services/responder');

// Specifying port
const port = process.env.PORT || 8080;

// Creating server
const app = express();
const httpServer = http.createServer(app);
app.listen(port);

// For passport
require('./app/services/passport')(passport);
app.use(passport.initialize());

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());
// Initiallize the responder
app.use(Responder.init);

// Import Application Routes
const user = require('./app/routes/userRoute');
const project = require('./app/routes/projectRoute');
const task = require('./app/routes/taskRoute');

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
  res.send("everytgjkdv is fine");
});

// Local authentication route
app.post('/sign_up', user.signUp);
app.post('/login', user.login);

// Project routes
app.post('/project/add', project.add);
app.get('/project/list', project.list);

// Task routes
app.post('/task/add', task.add);
// app.get('/task/list', task.list);

// Hook to execute before every request
// app.use(Responder.reply());
