var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../dbConfig.js');

var UserModel = mongoose.model('User');

// 用户登录
router.get('/login', function(req, res, next) {
  if(req.query.username === undefined){
    res.sendStatus(404);
  }
  UserModel.find({
    username: req.query.username,
  },function (err, data) {
    if(err){
      console.log(err);
      res.status(500).jsonp(errInfo);
      return false;
    }else{
      if(data.length < 1){
        res.status(404).jsonp(errInfo);
        console.log('2');
        return false;
      }else if(data[0].password === req.query.password){
        res.jsonp(data[0]);
        return true;
      }else{
        console.log(data);
        res.status(404).jsonp(data[0]);
        return false;
      }
    }
  });
});
// 用户注册
router.get('/register', function (req, res, next) {
  /**
   * 查询用户名是否已经被注册
   * @return {[type]}       [description]
   */
  UserModel.find({
    username:req.query.username,
  }, function (err, data) {
    if(err){
      console.log(err);
      return false;
    }else{
      if(data.length > 1){
        res.status(404).jsonp(userInfo);
      }else{
        addNewUser();
      }
    }
  });


  /**
   * 如果没有被注册
   * @param  {Boolean} !hasRegiseted 是否已经被注册
   * @return {null}
   */
  function addNewUser() {
    var newUser = new UserModel({
      username:req.query.username,
      password: req.query.password,
      tel: req.query.tel,
      email: req.query.email,
      schoolId: req.query.school,
    });
    newUser.save(function (err) {
      if(err){
        console.log('75'+err);
        res.status(404);
      }else{
        res.status(200).jsonp(newUser);
      }
    });
  }
  // res.status(200).jsonp(userInfo);
  // res.send('hello')
});

// 根据用户id查找
router.get('/findUser', function (req, res, next) {
  UserModel.find({
    _id : req.query.userId
  }, function (err, data) {
    if(err){
      console.log(err);
    }else{
      data[0].password = undefined;
      res.jsonp(data[0]);
    }
  });
});
module.exports = router;
