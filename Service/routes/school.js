var express = require('express');
var router = express.Router();


var schools = [{
  id:123,
  name: '长沙理工大学',
},{
  id:456,
  name: '中南大学',
},{
  id:789,
  name: '湖南大学',
}];
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    res.jsonp(schools);
});

module.exports = router;
