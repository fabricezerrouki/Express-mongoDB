var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  firstname: { type: String, required: true }
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'User' },
},{
  timestamps: true
});

//Make user Modal
var User = mongoose.model('User', userSchema);

module.exports = User;