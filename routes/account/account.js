var express = require('express');
var app = express();
var loginRoute = require("./login/login")
var registerRoute = require("./register/register")
var setLekarz = require("./ranks/lekarz_set")

app.use('/login', loginRoute)
app.use('/register', registerRoute)
app.use('/setlekarz', setLekarz)

module.exports = app;