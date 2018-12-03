var Comment = require('../models/Comments')

//create Todo using POST
exports.create_comment = function (req, res) {
  var comment = new Comment({
    comment: req.body.comment,
    userId: req.body.userId,
    postId: req.body.postId
  })
  comment.save().
    then(result => {
      res.json({ success: true, 'response_code': 200, 'message': 'success', 'result': 'Todo Created Successfully.', todo: { _id: result._id, todo: req.body.todo, complete: false } })
    }).catch(error => {
      res.json({ success: false, 'response_code': 400, 'message': 'error', 'result': 'Something went wrong.', error: error })
    })
}