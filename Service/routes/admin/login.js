var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../dbConfig.js');
var adminModel = mongoose.model('Admin');
var sessionModel = mongoose.model('Session');

router.get('/', function (req, res, next) {
  res.render('login/index',{
    titile: '用户登录'
  });
});

router.post('/', function (req, res, next) {
  var sid = Math.random().toString(36).substr(2,15);
  adminModel.findOne({
    name: req.body.name
  })
  .then(function(rs) {
    var newsid = new sessionModel({
      value: sid,
      data: new Date()
    });
    newsid.save()
    .then(function() {
      if(req.body.password === rs.password){
        res
        .cookie('sid', sid, {
          maxAge:30*60*1000, 
          expires: new Date(Date.now() + 30*60*1000), 
          httpOnly:true, 
          path:'/',
        })
        .redirect('../../');
      }else{
        res.send('123');
      }
    });
  });  
});
module.exports = router;