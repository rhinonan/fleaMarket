var express = require('express');
var router = express.Router();

var foo = {
	'name': 'husan',
	'age': '21',
	'gender': 'men',
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.json(foo);
});

module.exports = router;
