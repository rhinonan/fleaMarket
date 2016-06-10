var mongoose = require('mongoose');
var dbUrl = "mongodb://localhost/fleaMarket";
mongoose.connect(dbUrl);
var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  tel: String,
  email: String,
  schoolId: String,
  schoolname: String,
  data: { type: Date, default: Date.now }

});
var FleaSchema = new mongoose.Schema({
  name: String,
  price: Number,
  schoolId: String,
  description: String,
  newnessRate: Number,
  userId:String,
  schoolname: String,
  username: String,
  imgs: [String],
});
var StoreSchema = new mongoose.Schema({
  name: String,
  schoolId: String,
  username: String,
  description: String,
  status: String,
  userId: String,
  img: String,
});
var CoSchema = new mongoose.Schema({
  name: String,
  schoolId: String,
  description: String,
  storeId: String,
  storeName: String,
  date: {
    type: Date,
    default: Date.now
  },
  stock: Number,
  price: Number,
  img: [String],
});
var SchoolSchema = new mongoose.Schema({
  schoolname: String,
  date: Date,
});

var AdminSchema  =  new mongoose.Schema({
  name: String,
  password: String,
});

var SessionSchema = new mongoose.Schema({
  value: String,
  data: Date
});
mongoose.model('User',UserSchema);
mongoose.model('School', SchoolSchema);
mongoose.model('Flea', FleaSchema);
mongoose.model('Store', StoreSchema);
mongoose.model('Co',CoSchema);
mongoose.model('Admin',AdminSchema);
mongoose.model('Session',SessionSchema);