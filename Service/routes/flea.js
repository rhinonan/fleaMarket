var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../dbConfig.js');

var FleaModel = mongoose.model('Flea');

//缓存触发
var trigger = 0;
var cacheTimer = null;
var cacheStatus = true;
var fleaCache;

/* GET home page. */
router.get('/list', function(req, res, next) {
  // 判断是否需要更新缓存
  cache();
  //返回缓存
  console.log(fleaCache);
  res.jsonp(fleaCache);
});

// 发布二手物品
router.get('/postFlea', function (req, res, next) {
  // if(req.query.imgs.length == 0){
  //   console.log(1111111);
  //   req.query.imgs[0] = 'http://ww4.sinaimg.cn/bmiddle/71f0dc27gw1f0lcha448rj20v50v575j.jpg';
  // }
  // console.log(req.query);
  // for(var i = req.query.imgs.length-1;i >= 0; i--){
  //   console.log(i+'67');
  //   if(req.query.imgs[i].length === 0 || req.query.imgs[i] === undefined){
  //     req.query.imgs[i] = 'http://ww4.sinaimg.cn/bmiddle/71f0dc27gw1f0lcha448rj20v50v575j.jpg';
  //   }
  // }
  addFlea();
  function addFlea () {
    var newFlea = new FleaModel({
      name: req.query.name,
      price: req.query.price,
      schoolId: req.query.schoolId,
      discription: req.query.discription,
      newnessRate: req.query.newnessRate,
      userId: req.query.userId,
      imgs: req.query.imgs.length === 0 ? 'http://ww4.sinaimg.cn/bmiddle/71f0dc27gw1f0lcha448rj20v50v575j.jpg' : req.query.imgs,
    });

    newFlea.save(function (err) {
      if(err){
        console.log(err);
        res.status(404);
      }else{
        res.jsonp(foo);
      }
    });
  }
});




router.get('/detail/:fleaId', function (req, res, next) {
  var fleaId = req.path.split('/')[2];
  // console.log(fleaId);
  if(fleaId == 0){

    res.jsonp(bar[0]);
  }
});

// 缓存处理行数
function cache () {
  if(cache === 0){
    if(cacheTimer){
      clearTimeout(cacheTimer);
    }
    cacheTimer = setTimeout(function () {
      trigger = 5;
    });
  }else{
    FleaModel.find({}, function (err, data) {
      if(err){
        console.log(err);
        cacheStatus = false;
      }else{
        fleaCache = data;
        // console.log(data);
      }
    });
  }
}


module.exports = router;
