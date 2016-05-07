var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../dbConfig.js');
var SchoolModel = mongoose.model('School');
router.get('/', function (req, res, next) {
  res.send('这里是商品管理页面');
});