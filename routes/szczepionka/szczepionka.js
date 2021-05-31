var express = require('express');
var app = express();
var szczepionka_get = require("./get/szczepionka_get");
var szczepionka_post = require("./post/szczepionka_post");
var szczepionka_types = require("./types/szczepionka_types");
var szczepionka_dose = require("./post/dose/szczepionka_dose");

app.use('/get', szczepionka_get)
app.use('/post', szczepionka_post)
app.use('/types', szczepionka_types)
app.use('/post/add_dose', szczepionka_dose)

module.exports = app;