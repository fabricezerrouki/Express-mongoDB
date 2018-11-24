var mongoose = require('mongoose');
const mongodb = require('mongodb');
var Schema = mongoose.Schema;

// create a schema
var postSchema = new Schema({
  title: { type: String , default: '' },
  body: { type: String, default: '' },
  postImages: {
    type: Array,
    default: []
  },
  status: { type: Boolean, default: true },
  isActive: { type: Boolean, default: false },
}, {
    timestamps: true
  });

//Make post Modal
var Post = mongoose.model('Post', postSchema);

module.exports = Post;

// Get todo
module.exports.getPost = (callback, limit) => {
  Post.find(callback).limit(limit);
}

// Get User By Id
module.exports.getPostById = (id, callback) => {
  Post.findOne({ '_id': new mongodb.ObjectID(id) }, callback);
}

// Add Genre
module.exports.addPost = (user, callback) => {
  Post.create(todo, callback);
}

// Update todo
module.exports.updatePost = (id, update, options, callback) => {
  var query = { _id: new mongodb.ObjectID(id) };
  Post.findOneAndUpdate(query, update, options, callback);
}

// Delete todo
module.exports.removePost = (id, callback) => {
  var query = { _id: new mongodb.ObjectID(id) };
  Post.remove(query, callback);
}
