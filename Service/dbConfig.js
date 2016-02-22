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
  schoolId: String,
  data: { type: Date, default: Date.now }

});

var FleaSchema = new mongoose.Schema({
  name: String,
  price: Number,
  schoolId: String,
  description: String,
  newnessRate: Number,
  userId:String,
  imgs: [String],
});

var StoreSchema = new mongoose.Schema({
  name: String,
  schoolId: String,
  description: String,
  userId: String,
  img: String,
});
var SchoolSchema = new mongoose.Schema({
  schoolname: String,
});
// mongoose.model('Book',BookSchema);
mongoose.model('User',UserSchema);
mongoose.model('School', SchoolSchema);
mongoose.model('Flea', FleaSchema);
mongoose.model('Store', StoreSchema);