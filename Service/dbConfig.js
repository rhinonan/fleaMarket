var mongoose = require('mongoose');
var dbUrl = "mongodb://localhost/fleaMarket";
mongoose.connect(dbUrl);

// var BookSchema = new mongoose.Schema({
//   name: String,
//   author:String,
//   publishTime: Date
// });

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  tel: String,
  email: String,
  schoolId: Number,
  data: { type: Date, default: Date.now }

});

// mongoose.model('Book',BookSchema);
mongoose.model('User',UserSchema);