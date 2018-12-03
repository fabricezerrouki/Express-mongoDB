var jwt = require('jsonwebtoken')
var Config = require('../../config/config')

module.exports = (req, res, next) => {
  const access_token = req.body.access_token//req.cookies.access_token;
  if (access_token) {
    try {
      req.decoded = jwt.verify(access_token, Config.config().token.secret)
      next()
    } catch (err) {
      res
        .status(403)
        .clearCookie('access_token')
        .send({ success: false, message: 'Failed to authenticate token.' })
    }
    return
  } else {
    var appSecret = req.headers['appsecret']
    if (appSecret) {
      if (appSecret === Config.config().appSecret) {
        next()
      } else {
        return res.status(403).send({
          success: false,
          message: 'Failed to authenticate app secret.'
        })
      }
    } else {
      // if there is no token
      // return an error
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      })
    }
  }
}