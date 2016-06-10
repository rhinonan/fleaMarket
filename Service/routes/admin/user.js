var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../dbConfig.js');
var userModel = mongoose.model('User');
var sessionModel = mongoose.model('Session');
var schoolModel = mongoose.model('School');

router.get('/', function (req, res, next) {
  userModel.find()
  .then(function(rs) {
    res.render('users/index',{
      titile: '用户登录',
      userList: rs
    });
  });
});

router.get('/add', function(req, res) {
  schoolModel.find()
  .then(function(rs) {
    res.render('users/add',{
      nav: 'users',
      schoolList: rs
    });
  });
});


router.post('/add', function (req, res, next) {
  var newUser = userModel(req.body);
  schoolModel.findById(req.body.schoolId)
  .then(function(rs) {
    newUser.schoolname = rs.schoolname;
    newUser.save();
  })
  .then(function(rs) {
    res.redirect('../../user');
  }, function(error) {
    
  });
});

router.post('/delete', function(req, res) {
  userModel.remove({
    _id: req.body.userId
  })
  .then(function() {
    res.redirect('../../user');
  });
});

router.get('/update/:userId', function(req, res) {
  userModel.findById(req.params.userId)
  .then(function(rs) {
    schoolModel.find(function(err, schoolList) {
      console.log(schoolList);
      res.render('users/update', {
        dir: '../../../../',
        user: rs,
        schoolList: schoolList
      });
    });
  });
});

router.post('/update/:userId', function(req, res) {
  var schoolId = req.body.schoolId;
  var userId = req.params.userId;
  userModel.findById(userId)
  .then(function(user) {
    user.username = req.body.username;
    user.password = req.body.password;
    user.tel = req.body.tel;
    user.email = req.body.email;
    schoolModel.findById(schoolId, function(err,school) {
      user.schoolname = school.schoolname;
      user.schoolId = school._id;
      user.save(function(rs) {
        res.redirect('../../../user');
      });
    });
  });
});
module.exports = router;