var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../dbConfig.js');


router.get('/web/postCommodity',function (req, res, next) {
  console.log(123123);

  res.render('postCommodity', {
    title: '123123',
    h1 : '这里是二级标题'
  });
});


module.exports = router;
