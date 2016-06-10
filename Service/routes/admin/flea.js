var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../dbConfig.js');

var formidable = require('formidable');
var fs = require('fs');
var util = require('util');

var userModel = mongoose.model('User');
var schoolModel = mongoose.model('School');
var fleaModel = mongoose.model('Flea');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.get('/', function(req, res) {
  fleaModel.find()
  .then(function(rs) {
    res.render('flea/index', {
      fleaList: rs
    });
  });
});

router.get('/add', function(req, res) {
  var users;
  userModel.find()
  .then(function(rs) {
    users = rs;
    return schoolModel.find();
  })
  .then(function(schools) {
    res.render('flea/add', {
      userList: users,
      schoolList: schools
    });
  });
});

router.post('/add', multipartMiddleware, function(req, res) {
  var userId = req.body.userId;
  var schoolId = req.body.schoolId;
  console.log('userId'+userId);
  console.log('schoolId'+schoolId);
  var newFlea = new fleaModel(req.body);

  var imgName;
  var extension;
  var target_path;
  var tmp_path;
  var count = 0;
  console.log(1);
  userModel.findById(userId)
  .then(function(user) {
    console.log(2);
    newFlea.username = user.username;
    newFlea.imgs = [];
    return schoolModel.findById(schoolId);
  })
  .then(function(school) {
    console.log(school);
    newFlea.schoolname = school.schoolname;
    console.log(newFlea);
    // 单个图片
    if(!req.files.imgs.length){
      imgName = (new Date()).getTime() + Math.random().toString(36).substr(2,2);
      extension = '.'+req.files.imgs.type.split('/')[1];
      target_path = 'public/upload/' + imgName+extension;
      tmp_path = req.files.imgs.path;
      fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        fs.unlink(tmp_path, function() {
          if (err) throw err;
          newFlea.imgs.push('http://'+req.hostname+':3332/upload/'+imgName+extension);
          newFlea.save(function(){
            res.redirect('../../flea');
          });
          
        });
      });
    }
    // 多个图片
    for (var i = req.files.imgs.length - 1; i >= 0; i--) {
      imgName = (new Date()).getTime() + Math.random().toString(36).substr(2,2);
      extension = '.'+req.files.imgs[i].type.split('/')[1];
      target_path = 'public/upload/' + imgName+extension;
      tmp_path = req.files.imgs[i].path;
      (function(i){
            fs.rename(tmp_path, target_path, function(err) {
              if (err) throw err;
              fs.unlink(tmp_path, function() {
                if (err) throw err;
                newFlea.imgs.push('http://'+req.hostname+':3332/upload/'+imgName+extension);
                count++;
                if(count === req.files.imgs.length){
                  newFlea.save(function(){
                    res.redirect('../../flea');
                  });
                }
              });
            });
          }
      )(i);

    }

  });
  
});

router.post('/delete', function(req, res) {
  fleaModel.remove({
    _id: req.body.fleaId
  })
  .then(function() {
    res.json({
      success: true
    });
  });
});







/* GET home page. */
router.get('/list', function(req, res, next) {
  fleaModel.find({}, function (err, data) {
    console.log(err);
    if(err){
      cacheStatus = false;
    }else{
      console.log(data);
      res.jsonp(data);
    }
  });
});

// 发布二手物品
router.get('/postFlea', function (req, res, next) {
  console.log(req.query);
  var newFlea = new fleaModel({
    name: req.query.name,
    price: req.query.price,
    schoolId: req.query.schoolId,
    description: req.query.description,
    newnessRate: req.query.newnessRate,
    userId: req.query.userId,
    imgs: req.query.imgs.length === 0 ? 'http://ww4.sinaimg.cn/bmiddle/71f0dc27gw1f0lcha448rj20v50v575j.jpg' : req.query.imgs,
  });
  // 存贮新发布的物品
  newFlea.save(function (err) {
    if(err){
      console.log(err);
      res.status(404);
    }else{
      res.jsonp('err');
    }
  });

});




router.get('/detail/:fleaId', function (req, res, next) {
  var fleaId = req.path.split('/')[2];
  // console.log(fleaId);
  fleaModel.find({
    _id:fleaId
  }, function (err, data) {
    if(err){
      res.status(404);
    }else{
      res.jsonp(data[0]);
    }
  });

});

module.exports = router;