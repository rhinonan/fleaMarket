var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../../dbConfig.js');
var schoolModel = mongoose.model('School');
var sessionModel = mongoose.model('Session');

router.get('/', function (req, res, next) {
  schoolModel.find()
  .then(function(rs) {
    res.render('school/index',{
      titile: '学校管理',
      schoolList: rs
    });
  });
});

router.get('/add', function(req, res) {
  res.render('school/add', {});
});

router.post('/add', function(req, res) {
  var newSchool = new schoolModel(req.body);
  newSchool.date = new Date();
  newSchool.save()
  .then(function() {
    res.redirect('../../school');
  });
});

router.get('/update/:schoolId', function(req, res) {
  var schoolId = req.params.schoolId;
  schoolModel.findByid(schoolId)
  .then(function(rs) {
    res.render('school/update', {
      school: rs
    });
  });
});

router.post('/update', function(req, res) {
  var schoolId = req.schoolId;
  schoolModel.findByid(schoolId)
  .then(function(rs) {
    rs.schoolName = req.body.schoolNmae;
    rs.save();
  })
  .then(function(rs) {
    res.redirect('../../school');
  });
});

router.post('/delete', function(req, res) {
  var schoolId = req.body.schoolId;
  schoolModel.remove({
    _id: schoolId
  })
  .then(function() {
    res.json({
      success: true
    });
  });
});
module.exports = router;