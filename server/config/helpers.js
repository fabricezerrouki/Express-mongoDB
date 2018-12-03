var _ = require('lodash')

exports.extractUserId = function (request) {
  return _.get(request, 'decoded._id', false)
}

exports.extractUserInfo = function (request) {
  return _.get(request, 'decoded', false)
}