const express = require('express');
var app = express()
      
var bodyParser = require('body-parser')
const gravatar = require('gravatar');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const config = require('../config/database')

const validateRegisterInput = require('./validations/register_validation')
const validateLoginInput = require('./validations/login_validation')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
      const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: 'User',
        profilePicture: avatar,
        phoneNumber: req.body.contact
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

exports.user_login = function (req, res) {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json({ 'response_code': 400, 'message': 'error', 'errors': errors });
  }

  const email = req.body.email;
  const password = req.body.password;
  // const status = true;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'Invalid Credentials. Please Check your email Id'
        return res.status(400).json({ 'response_code': 400, 'message': 'error', 'errors': errors });
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            }
            jwt.sign(payload, config.secret, {
              expiresIn: 3600
            }, (err, token) => {
              if (err) {
                return res.status(400).json({ 'response_code': 400, 'message': 'error', 'errors': err });
              } else {
                res.status(200).json({
                  'response_code': 200,
                  'message': 'success',
                  'success': true,
                  'token': `${token}`
                });
              }
            });
          }
          else {
            errors.password = 'Incorrect Password';
            return res.status(400).json({ 'response_code': 400, 'message': 'error', 'errors': errors });
          }
        });
    });
}

// exports.user_authentication = function (req, res) {
//   var token = req.headers['x-access-token'] || req.body.x - access - token || req.query.x - access - token;
//   if (!token) return res.status(200).json({ 'response_code': 400, 'message': 'error', 'auth': false, 'result': 'No token provided.' });

//   jwt.verify(token, config.secret, function (err, decoded) {
//     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

//     User.findById(decoded.id, { name: 1, email: 1 }, function (err, user) {
//       if (err) return res.status(200).json({ 'response_code': 400, 'message': 'error', 'auth': false, 'result': "There was a problem finding the user." });
//       if (!user) return res.status(200).json({ 'response_code': 400, 'message': 'error', 'auth': false, 'result': "No user found." });

//       res.status(200).send({ 'response_code': 200, 'message': 'success', 'auth': true, 'token': decoded, 'user': user });
//     });
//   });
// }

// exports.user_logout = function (req, res) {
//   res.status(200).send({ 'response_code': 200, 'message': 'success', 'auth': false, 'token': null, 'result': "Logout Successfully." });
// }