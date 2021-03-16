var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const robotaction = require('./models/RobotAction');
const robotRouter = require('./routes/robotrouter');
const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');


var passport = require ('passport');
var authenticate= require('./authenticate');
var config = require('./config');

var options={
  prot:1883,
  host:'212.98.137.194',
  username:'iotleb',
  password:'iotleb'
};

// const mqtt = require('mqtt');
//
// var client = mqtt.connect('mqtt://212.98.137.194', options);
//
// client.on('connect', function () {
//   client.subscribe('presence');
//
//   client.publish('presence', 'Hello mqtt');
//
//   });
//
//
// client.on('message', function (topic, message) {
//   // message is Buffer
//   console.log(message.toString())
//
// });



const url = config.mongoUrl;

const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });





var app = express();






console.log("Received '"+ "' on '"  + "'");

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/robot', robotRouter);
app.use('/users', usersRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
