var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../dbConfig.js');
var storeModel = mongoose.model('Store');
var userModel = mongoose.model('User');

var fs = require('fs');
var util = require('util');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
router.get('/', function(req, res) {
  storeModel.find()
  .lean()
  .then(function(rs) {
    // for(var r in rs){
    //   userModel.findById(r.userId)
    //   .then(function(user) {
    //     r.username = user.username;
    //   });
    // }
    res.render('store/index',{
      storeList: rs
    });
  }, function(err) {
  });
});

router.get('/add', function(req, res) {
  userModel.find({})
  .then(function(users) {
    res.render('store/add', {
      users: users
    });
  });
});

router.post('/add',multipartMiddleware, function(req, res) {
  var newStore = new storeModel(req.body);
  var imgName;
  var extension;
  var target_path;
  var tmp_path;
  userModel.findById(req.body.userId)
  .then(function(user) {
    newStore.username = user.username;
    newStore.status = '未审核';
    imgName = (new Date()).getTime() + Math.random().toString(36).substr(2,2);
    extension = '.'+req.files.img.type.split('/')[1];
    target_path = 'public/upload/' + imgName+extension;
    tmp_path = req.files.img.path;
    fs.rename(tmp_path, target_path, function(err) {
      if (err) throw err;
      fs.unlink(tmp_path, function() {
        if (err) throw err;
        newStore.img = 'http://'+req.hostname+':3332/upload/'+imgName+extension;
        newStore.save(function(err){
          res.redirect('../../co');
        });
      });
    });
  });
});

router.post('/pass', function(req, res) {
  storeModel.findById(req.body.storeId)
  .then(function(rs) {
    rs.status = '已通过审核' ;
    rs.save(); 
  })
  .then(function() {
    res.json({
      foo:'foo'
    });
  });
});


router.post('/nopass', function(req, res) {
  storeModel.findById(req.body.storeId)
  .then(function(rs) {
    rs.status = '审核未通过' ;
    rs.save(); 
  })
  .then(function() {
    res.json({
      foo:'foo'
    });
  });
});

router.post('/close', function(req, res) {
  console.log(11111111);
  storeModel.remove({
    _id: req.body.storeId
  })
  .then(function() {
    res.json({
      foo:'foo'
    });
  });
});
// 修改库存
router.post('/stock', function(req, res) {
  console.log(req.body);
  var coId = req.body.coId;
  coModel.findById(coId)
  .then(function(rs) {
    console.log(rs);
    rs.stock = req.body.stock;
    rs.save();
  })
  .then(function(rs) {
    console.log(rs);
    res.redirect('../../co');
  });
});
module.exports = router;