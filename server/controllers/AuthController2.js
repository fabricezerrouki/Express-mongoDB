var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var salt = bcrypt.genSaltSync(10);

var Config = require('../config/config');
var User = require('../models/User');
// var helpers = require('../config/helper');

const validateRegisterInput = require('../validations/register_validation');
const validateLoginInput = require('../validations/login_validation');


exports.loginUser = function (req, res) {
  var email = req.body.email.toLowerCase();
  var password = req.body.password;
  var lastLogin = new Date();
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      res.json({ success: false, message: err });
    } else if (user && !user.status) {
      res.json({
        success: 'hold',
        message: 'Pending approval, call for enquiry.'
      });
    } else if (user !== null) {
      bcrypt.compare(password, user.password, function (errMatch, matched) {
        if (matched === true) {
          User.findOneAndUpdate(
            { _id: user._id },
            {
              $set: { lastLogin: lastLogin }
            },
            {
              new: true
            },
            function (err, userData) {
              if (err) {
                res.json({ success: false, message: 'Something went wrong' });
              } else {
                userData = userData.toJSON();
                let obj = {};
                obj._id = userData._id;
                obj.name = userData.name;
                obj.email = userData.email;
                obj.phoneNumber = userData.phoneNumber;
                obj.language = userData.language;
                var token = jwt.sign(obj, Config.config().token.secret, {
                  expiresIn: 3600 // expires in 30 minutes
                });
                res.cookie('access_token', token)
                  .json({
                    success: true,
                    message: 'login successfully',
                    data: userData,
                    token: token
                  });
              }
            }
          );
        } else {
          res.json({ success: false, message: 'Wrong password' });
        }
      });
    } else {
      res.json({
        success: false,
        message: 'Login email not found. Please register'
      });
    }
  });
};


exports.user_registration = function (req, res) {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json({ 'response_code': 400, 'message': 'error', 'errors': errors });
  }
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: 'Email already exists'
      });
    }
    else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(400).json({ 'response_code': 400, 'message': 'error', 'errors': err });
        else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) return res.status(400).json({ 'response_code': 400, 'message': 'error', 'errors': err });
            else {
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  res.status(200).json({ 'response_code': 200, 'message': 'success', 'user': { 'email': user.email, 'id': user._id, 'name': user.name } })
                });
            }
          });
        }
      });
    }
  });
};




// exports.registerUser = function (req, res) {
//   var password = req.body.password;
//   var hashPwd = bcrypt.hashSync(password, salt); //PASSWORD ENCRYPTION
//   var request = {
//     email: req.body.email.toLowerCase(),
//     name: req.body.name,
//     lastLogin: new Date(),
//     password: hashPwd
//   };
//   User.findOne({ email: request.email, role: 'Admin' }, function (
//     err,
//     user
//   ) {
//     if (err) {
//       res.json({ success: false, message: err });
//     } else if (user == null) {
//       User.create(request, function (err, data) {
//         if (err) {
//           res.json({ success: false, message: err });
//         } else if (request.userType === 'Admin') {
//           let userData = {};
//           userData.name = request.name;
//           userData.email = request.email;
//           userData._id = data._id;
//           userData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
//           res.json({
//             success: 'hold',
//             message:
//               'Thank You for signing up. Submitted for approval, it usually takes <30mins. Please WhatsApp +852 92892534 for enquiry.'
//           });
//         } else {
//           data = data.toJSON();
//           let obj = {};
//           obj._id = data._id;
//           obj.name = data.name;
//           obj.email = data.email;
//           obj.phoneNumber = data.phoneNumber;
//           var token = jwt.sign(obj, Config.config().token.secret, {
//             expiresIn: 3600 // expires in 30 minutes
//           });
//           res
//             .status(200)
//             .cookie('access_token', token, {
//               httpOnly: true,
//             })
//             .json({
//               success: true,
//               message: 'User registered successfully',
//               data: data,
//               token: token
//             });
//         }
//       });
//     } else {
//       res.json({
//         success: false,
//         message: 'This Email already registered'
//       });
//     }
//   });
// };

exports.authenticateUser = function (req, res) {
  // Recreate a newer token and extend the exp
  delete req.decoded.exp;
  var token = jwt.sign(req.decoded, Config.config().token.secret, {
    expiresIn: 3600 // expires in 30 minutes
  });
  res.cookie('access_token', token)
    .json({
      success: true,
      message: 'login successfully',
      data: req.decoded.data,
      token: token
    });
  // res.status(200)
  //     .cookie('access_token', token, {
  //         httpOnly: true,
  //     })
  //     .json(req.decoded);
}

exports.logoutUser = function (req, res) {
  res.clearCookie('access_token')
    .json({
      success: true,
      message: 'Successfully Logout'
    });
}