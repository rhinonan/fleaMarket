var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../dbConfig.js');
var StoreModel = mongoose.model('Store');
StoreModel.find({},function (err, data) {
  if(err){
    console.log(err);
    return false;
  }
} );

// 开启一个网店
router.get('/postStore', function (req, res, next) {
  var newStore = new StoreModel({
    name:req.query.name,
    schoolId: req.query.schoolId,
    userId: req.query.userId,
    description: req.query.description,
    img: req.query.img ? req.query.img: 'http://ww4.sinaimg.cn/bmiddle/71f0dc27gw1f0lcha448rj20v50v575j.jpg',
  });
  newStore.save(function (err) {
    if(err){
      res.status(404);
    }else{
      res.status(200).jsonp(newStore);
    }
  });
});

router.get('/storeList', function (req, res, next) {
  console.log(11111111111);
  StoreModel.find({}, function (err, data) {
    console.log(data);
    if (err) {
      console.log(err);
      res.sendState(404);
    }
    res.jsonp(data);
  });
});
router.get('/findStore/:userId', function (req, res, next) {
  StoreModel.find({
    userId: req.params.userId
  }, function (err, data) {
    if(err){
      console.log(err);
    }else{
      res.jsonp(data[0]);
    }
  });
});
router.get('/', function (req, res, next) {
  res.send('hey,店铺相关接口');
});

module.exports = router;
