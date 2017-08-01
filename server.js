
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

// for passport
app.use(passport.initialize());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Import routes
const user = require('./app/routes/userRoute');

// User routes
app.get('/auth/google', user.googleAuthentication);
app.post('/sign_up', user.signUp);
app.post('/login', user.login);
