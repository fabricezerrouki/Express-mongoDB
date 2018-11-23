require('dotenv').config();
var mongoose = require('mongoose');

//Set up default mongoose connection
var url = process.env.DB_HOST ||  'mongodb://127.0.0.1/my_database';

mongoose.connect(url, err => {
  if(err){
   console.log("Mongoose default connection has occured error :-\n" + err );
  }
  console.log("😀 MongoDB Connected")
})

exports.config = function() {
  var objConfig = {};
  objConfig.host = 'http://localhost:3001';
  objConfig.siteUrl = 'http://localhost:3000';

  objConfig.token = {};
  objConfig.token.secret =
    'piQqgR98eAJJtF[92mRoAnV]U3}sUhtPd$z&vW]>h7%Us3R24ZL)Kb3)';
  objConfig.token.token_life = 48;
  objConfig.appSecret = 'eSrrxqt8MVAdJB6Xq9wzJZXdFq89MZo6';
  return objConfig;
};