var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../dbConfig.js');
var CoModel = mongoose.model('Co');

router.get('/web/postCommodity',function (req, res, next) {
  console.log(123123);

  res.render('postCommodity', {
    title: '123123',
    h1 : '这里是二级标题'
  });
});

/**
 * 发布商品接口
 * @return {[type]}        [description]
 */
router.get('/api/postCo', function (req, res, next) {

  var co = new CoModel({
    name: req.query.name,
    price: req.query.price,
    description: req.query.description,
    schoolId: req.query.schoolId,
    storeId: req.query.storeId,
    stock: req.query.stock,
    img: req.query.img ? req.query.img : 'http://ww4.sinaimg.cn/bmiddle/71f0dc27gw1f0lcha448rj20v50v575j.jpg',
  });
  co.save(function (err) {
    if(err){
      res.sendstatus(404);
      return false;
    }
  }).then(function (data) {
    res.jsonp(data);
  });
});

/**
 * 获取商品列表接口
 * @type {[type]}
 */
router.get('/api/coList', function (req, res, next) {
  CoModel.find({

  }, function (err, data) {
    if(err){
      console.log(err);
      res.sendStatus(404);
      return false;
    }else{
      res.jsonp(data);
    }
  });
});

/**
 * 获取商品详细信息
 * @type {}
 */
router.get('/api/findCo/:coId', function (req, res, next) {
  if(req.params.coId === undefined || req.params.coId.length === 0){
    res.sendStatus(404);
  }else{
    CoModel.find({
      _id: req.params.coId
    }, function (err, data) {
      if(err){
        console.log(err);
        res.sendStatus(404);
        return false;
      }else{
        res.jsonp(data[0]);
      }
    });
  }
});
/**
 * 获取单个店铺的商品列表
 * @type {}
 */
router.get('/api/findCoByStoreId/:storeId', function (req, res, next) {
  console.log('123123');
  CoModel.find({
    storeId: req.params.storeId
  }, function (err, data) {
    console.log(data);
    if(err){
      res.sendStatus(404);
    }else{
      res.jsonp(data);
    }
  });
});
module.exports = router;
