
const express = require('express');
const http = require('http');

// Creating server
const app = express();
const httpServer = http.createServer(app);
app.listen(3000);

// Import routes
const user = require('./routes/userRoute');

// User routes
app.get('/register', user.register);
