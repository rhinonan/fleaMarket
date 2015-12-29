var express = require('express');
var router = express.Router();


var foo = {
	'name': 'husan',
	'age': '21',
	'gender': 'men',
};
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  	res.json(foo);
});

module.exports = router;
