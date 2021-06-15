var express = require('express');
var app = express();
var qrcode_get = require("./get/qrcode_get");

app.use('/', qrcode_get);

module.exports = app;