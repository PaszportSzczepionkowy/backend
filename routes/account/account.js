var express = require('express');
var app = express();
var loginRoute = require("./login/login")
var registerRoute = require("./register/register")

app.use('/login', loginRoute)
app.use('/register', registerRoute)

module.exports = app;