var jwt = require('jsonwebtoken');
var _ = require('lodash');

exports.extractUserId = function (request, callback) {
  return _.get(request, 'decoded._id', false);
};

exports.extractUserInfo = function (request, callback) {
  return _.get(request, 'decoded', false);
};