var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../dbConfig.js');

var formidable = require('formidable');
var fs = require('fs');
var util = require('util');

var coModel = mongoose.model('Co');
var storeModel = mongoose.model('Store');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


router.get('/', function(req, res) {
  coModel.find()
  .then(function(rs) {
    res.render('co/index',{
      coList: rs
    });
  }, function(err) {
  });
});

// 修改库存
router.post('/stock', function(req, res) {
  var coId = req.body.coId;
  coModel.findById(coId)
  .then(function(rs) {
    rs.stock = req.body.stock;
    rs.save();
  })
  .then(function(rs) {
    res.redirect('../../co');
  });
});

// 商品管理
router.get('/add', function(req, res) {
  storeModel.find({
    status: '已通过审核'
  })
  .then(function(rs) {
    res.render('co/add', {
      storeList: rs
    });
  });
});

router.post('/add', multipartMiddleware, function(req, res) {
  var newCo = new coModel(req.body);
  var count = 0;
  var imgss = [];
  newCo.img = imgss;  
  var imgName;
  var extension;
  var target_path;
  var tmp_path;
  storeModel.findById(req.body.storeId)
  .then(function(rs) {
    newCo.storeName = rs.name;
    
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
          newCo.img.push('http://'+req.hostname+':3332/upload/'+imgName+extension);
          newCo.save(function(){
            res.redirect('../../co');
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
                newCo.img.push('http://'+req.hostname+':3332/upload/'+imgName+extension);
                count++;
                if(count === req.files.imgs.length){
                  newCo.save(function(){
                    res.redirect('../../co');
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
  coId = req.body.coId;
  coModel.remove({
    _id: coId
  })
  .then(function() {
    res.redirect('../../co');
  });
});
module.exports = router;