var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var util = require('util');

var mongoose = require('mongoose');
require('../dbConfig.js');



router.post('/', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      if(err){
        res.status(404).json({
          success: false,
          msg: err
        });
        return false;
      }
      var imgName = (new Date()).getTime() + Math.random().toString(36).substr(2,2);
      var hostname = req.hostname + ':3332/upload/';
      var tmp_path = files.file.path+'';
      // // 指定文件上传后的目录 - 示例为"images"目录。 
      var target_path = 'public/upload/' + imgName+'.jpg';
      var returnSrc = 'http://'+hostname +imgName+'.jpg';
      fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        fs.unlink(tmp_path, function() {
           if (err) throw err;
           res.json({
            success: true,
            data: {
              imgSrc: returnSrc
            }
           });
        });
      });
    });
});
module.exports = router;
