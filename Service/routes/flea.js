var express = require('express');
var router = express.Router();

//虚拟二手物品列表数据
var bar = [{
  fleaId:'0',
  'name': '一个二手的开水壶',
  'price': 33,
  'school': '长沙理工大学',
  createDate: '2015-12-31',
  imgUrls:['http://ionicframework.com/img/docs/blue-album.jpg','http://ionicframework.com/img/docs/blue-album.jpg','http://ionicframework.com/img/docs/blue-album.jpg'],
  description: '半个月前买进，9成新',
  newnessRate:9,
  userId:'0123456789'
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

router.get('/:fleaId', function (req, res, next) {
  var fleaId = req.path.split('/')[1];
  console.log(fleaId);
  if(fleaId == 0){

    res.jsonp(bar[0]);
  }

});
module.exports = router;
