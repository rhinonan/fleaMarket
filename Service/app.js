var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
require('./dbConfig.js');
require('./filters/index');
var sessionModel = mongoose.model('Session');


var routes = require('./routes/index');
// 用户信息相关接口
var users = require('./routes/users');
var foo =require('./routes/foo');
//二手物品相关接口
var flea2 = require('./routes/flea');
// 学校信息相关接口
var school = require('./routes/school');
// 商品相关接口
var commodity = require('./routes/commodity');
// 店铺想接口
var store2 = require('./routes/store');
var app = express();
var image = require('./routes/image');
var login = require('./routes/admin/login');
var co = require('./routes/admin/co');
var store = require('./routes/admin/store');
var user = require('./routes/admin/user');
var school = require('./routes/admin/school');
var flea = require('./routes/admin/flea');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// // 未登录重定向
// app.use('/', function(req, res, next) {
//   var Cookies = {};
//   req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
//       var parts = Cookie.split('=');
//       Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
//   });
//   if(req.path.indexOf('js')>0){
//     next();
//   }else{
//     sessionModel.findOne({
//       value: Cookies.sid ? Cookies.sid : 0,
//     })
//     .then(function(rs) {
//       if(rs){
//         next();
//       }else{
//         if(req.path === '/login'){
//           next();
//         }else{
//           res.redirect('../../../login');
//         }
//       }
//     });
//   }
// });
app.use('/', routes);
app.use('/users', users);
app.use('/foo', foo);
app.use('/flea/api',flea);
app.use('/school', school);
app.use('/commodity',commodity);
app.use('/store',store);
app.use('/store/api',store2);
app.use('/api/image', image);
app.use('/login',login);
app.use('/co', co);
app.use('/user', user);
app.use('/school', school);
app.use('/flea',flea);
// as
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
