var User = require('../models/User')
const SentryService = require('../services/sentryService')

const SentryServices = new SentryService()

// Display list of all User.
exports.user_list = function (req, res) {
  try {
    User.getTodo((err, users) => {
      if (err) res.send({ success: false, 'response_code': 400, 'message': 'error', 'result': 'Something went wrong.' })
      res.json({ success: true, 'response_code': 200, 'message': 'success', 'result': users })
    })
  } catch (error) {
    SentryServices.sendException(error)
    return reply({
      status: false,
      message: error.message,
      data: ''
    })
  }
}

// Handle POST.
exports.user_detail = function (req, res) {
  var id = req.params._id
  Todo.getTodoById(id, (err, post) => {
    if (err) res.json({ success: false, 'response_code': 400, 'message': 'error', 'result': 'Something went wrong.' })
    if (post)
    {res.json({ success: true, 'response_code': 200, 'message': 'success', 'result': post })}
    else
    {res.json({ success: false, 'response_code': 400, 'message': 'error', 'result': 'Invalid Todo Identity.' })}
  })
}
//create Todo using POST
exports.user_create_post = function (req, res) {
  var todo = new Todo({
    todo: req.body.todo,
    complete: req.body.complete
  })
  todo.save().
    then(result => {
      res.json({ success: true, 'response_code': 200, 'message': 'success', 'result': 'Todo Created Successfully.', todo: { _id: result._id, todo: req.body.todo, complete: false } })
    }).catch(error => {
      res.json({ success: false, 'response_code': 400, 'message': 'error', 'result': 'Something went wrong.' })
    })
}


exports.user_registration = function(req, res) {
  const { errors, isValid } = validateRegisterInput(req.body)

  if(!isValid) {
    return res.status(400).json({ 'response_code': 400,'message':'error','errors': errors })
  }
  User.findOne({
    email: req.body.email
  }).then(user => {
    if(user) {
      return res.status(400).json({
        email: 'Email already exists'
      })
    }
    else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      })
            
      bcrypt.genSalt(10, (err, salt) => {
        if(err)  return res.status(400).json({ 'response_code': 400,'message':'error','errors': err })
        else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) return res.status(400).json({ 'response_code': 400,'message':'error','errors': err })
            else {
              newUser.password = hash
              newUser
                .save()
                .then(user => {
                  res.status(200).json({ 'response_code': 200,'message':'success','user': { 'email': user.email, 'id':user._id, 'name':user.name } })
                }) 
            }
          })
        }
      })
    }
  })
}
