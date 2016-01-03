var express = require('express');
var router = express.Router();

var foo = {
	'name': 'husan',
	'age': '21',
	'gender': 'men',
};

var userInfo = {
  'userId' : '1234567',
  'userName': 'hsuan',
};

var errInfo = {
  msg : '用户名或者密码错误',
};

/* GET users listing. */
router.get('/login', function(req, res, next) {
  console.log(req.query.username == 'husan');
  if(req.query.username === 'husan' && req.query.password === '123456'){

    res.jsonp(userInfo);
  } 
  res.status(404).jsonp(errInfo);
});

module.exports = router;
