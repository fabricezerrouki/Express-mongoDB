var Post = require('../models/Post')
const SentryService = require('../services/sentryService')

const SentryServices = new SentryService()

// Display list of all User.
exports.post_list = function (req, res) {
  try {
    Post.getPost((err, posts) => {
      if (err) res.send({ success: false, 'response_code': 400, 'message': 'error', 'result': 'Something went wrong.' })
      res.json({ success: true, 'response_code': 200, 'message': 'success', 'result': posts })
    })
  } catch (error) {
    SentryServices.sendException(error)
    res.json({
      status: false,
      message: error.message,
      data: ''
    })
  }
}

exports.create_post = function (req, res) {
  var post = new Post({
    title: req.body.title,
    userId: req.body.userId,
    body: req.body.body,
    postImages: req.body.postImages
  })
  post.save().
    then(() => {
      res.json({ success: true, 'response_code': 200, 'message': 'success', 'result': 'Todo Created Successfully.' })
    }).catch(() => {
      res.json({ success: false, 'response_code': 400, 'message': 'error', 'result': 'Something went wrong.' })
    })

}
