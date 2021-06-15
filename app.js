var express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var szczepionkaRouter = require('./routes/szczepionka/szczepionka');
var qrcodeRouter = require('./routes/qrcode/qrcode');
var accountRouter = require('./routes/account/account');

var cors = require("cors");
var app = express();

//connecting to db
mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).catch((r) => {
    console.log(r)
});


app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));


app.use('/', indexRouter);
app.use('/szczepionka', szczepionkaRouter);
app.use('/qrcode', qrcodeRouter);
app.use('/account', accountRouter);

module.exports = app;