var express = require('express');
var router = express.Router();

//虚拟二手物品列表数据
var foo = [{
  name: '一个二手的开水壶',
  price: 33,
  school: '长沙理工大学',
  createDate: '2015-12-31',
},{
  name: '一个二手的开水壶',
  price: 33,
  school: '长沙理工大学',
  createDate: '2015-12-31',
},{
  name: '一个二手的开水壶',
  price: 33,
  school: '长沙理工大学',
  createDate: '2015-12-31',
},{
  name: '一个二手的开水壶',
  price: 33,
  school: '长沙理工大学',
  createDate: '2015-12-31',
},{
  name: '一个二手的开水壶',
  price: 33,
  school: '长沙理工大学',
  createDate: '2015-12-31',
},{
  name: '一个二手的开水壶',
  price: 33,
  school: '长沙理工大学',
  createDate: '2015-12-31',
}];
/* GET home page. */
router.get('/list', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    res.jsonp(foo);
});

module.exports = router;
