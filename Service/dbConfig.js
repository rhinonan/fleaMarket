var mongoose = require('mongoose');
var dbUrl = "mongodb://localhost/fleaMarket";
mongoose.connect(dbUrl);
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
  username: String,
  description: String,
  userId: String,
  img: String,
});
var CoSchema = new mongoose.Schema({
  name: String,
  schoolId: String,
  description: String,
  storeId: String,
  date: {
    type: Date,
    default: Date.now
  },
  stock: Number,
  price: Number,
  img: String,
});
var SchoolSchema = new mongoose.Schema({
  schoolname: String,
});
mongoose.model('User',UserSchema);
mongoose.model('School', SchoolSchema);
mongoose.model('Flea', FleaSchema);
mongoose.model('Store', StoreSchema);
mongoose.model('Co',CoSchema);