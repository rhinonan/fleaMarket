var express = require('express');
var router = express.Router();

//虚拟二手物品列表数据
var bar = [{
  'name': '一个二手的开水壶',
  'price': 33,
  'school': '长沙理工大学',
  createDate: '2015-12-31',
  imgUrl:'http://ionicframework.com/img/docs/blue-album.jpg'
},{
  'name': '一个二手的开水壶',
  'price': 33,
  'school': '长沙理工大学',
  createDate: '2015-12-31',
  imgUrl:'http://ionicframework.com/img/docs/blue-album.jpg'
},{
  'name': '一个二手的开水壶',
  'price': 33,
  'school': '长沙理工大学',
  createDate: '2015-12-31',
  imgUrl:'http://ionicframework.com/img/docs/blue-album.jpg'
}];
var foo = {
  'name': 'husan2',
  'age': '21',
  'gender': 'men',
};
/* GET home page. */
router.get('/list', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    res.jsonp(bar);
});

module.exports = router;
