const mongoose = require('mongoose');

const host = process.env.MONGODB_HOST || 'localhost';
const port = process.env.MONGODB_PORT || 27017;
const db = process.env.MONGODB_DB || 'project';

// Construct the URI from different parts
const mongodb_uri = 'mongodb://' + host + ':' + port + '/' + db;

mongoose.connect(mongodb_uri, error => {
  if (error) {
    console.error(`Failed to connect to mongodb\n\n\n${error}`);
    process.exit(1);
  }
  console.log(`${mongodb_uri} connected successfully`);
});

module.exports = mongoose;