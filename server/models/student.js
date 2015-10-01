var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Student = new Schema({
  name: String,
  gender: String,
  picture: String,
  restrictions: [String]
});

module.exports = mongoose.model('students', Student);
