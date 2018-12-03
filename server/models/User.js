var mongoose = require('mongoose')
const mongodb = require('mongodb')
var Schema = mongoose.Schema

// create a schema
var userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  dob: { type: Date },
  phoneNumber: String,
  address: { type: Object },
  gender: { type: String, enum: ['female', 'male'], default: 'male' },
  role: { type: String, enum: ['Admin', 'User'], default: 'User' },
  profilePicture: {
    type: Array,
    default: ['img/user_profile.png']
  },
  occupation: String,
  marriageStatus: String,
  status: { type: String, default: true },
  isActive: { type: Boolean, default: false },
  hideWelcome: { type: Boolean, default: false },
  language: { type: String, default: 'en' },
  lastLogin: { type: Date },
  passwordToken: { type: String, default: '' },
  emailVerified: { type: Boolean, default: true },
  welcomeMessage: { type: Boolean, default: true },
},{
  timestamps: true
})

//Make user Modal
var User = mongoose.model('User', userSchema)

module.exports = User

// Get todo
module.exports.getUser = (callback, limit) => {
  User.find(callback).limit(limit)
}

// Get User By Id
module.exports.getUserById = (id, callback) => {
  User.findOne({ '_id': new mongodb.ObjectID(id) }, callback)
}

// Add Genre
module.exports.addUser = (user, callback) => {
  User.create(todo, callback)
}

// Update todo
module.exports.updateUser = (id, update, options, callback) => {
  var query = { _id: new mongodb.ObjectID(id) }
  User.findOneAndUpdate(query, update, options, callback)
}

// Delete todo
module.exports.removeUser = (id, callback) => {
  var query = { _id: new mongodb.ObjectID(id) }
  User.remove(query, callback)
}