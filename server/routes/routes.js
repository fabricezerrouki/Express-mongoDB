var express = require('express');
var router = express.Router();

var baseUrl = '/api/v1';

/* User Controller */
// const UserController = require('../controllers/UserController')

// router.post(baseUrl + '/register',  UserController.user_registration);
// router.post(baseUrl + '/login',     UserController.user_login);
// router.post(baseUrl + '/auth',      UserController.user_authentication);
// router.post(baseUrl + '/logout',    UserController.user_logout);


// router.get(baseUrl + '/users/:_id', UserController.user_list)
// router.post(baseUrl + '/users', TodoController.user_create_post)

/*  PostController */
const PostController = require('../controllers/PostController')
router.get(baseUrl + '/posts', PostController.post_list)
router.post(baseUrl + '/posts', PostController.create_post)

/* Authentication */
var authenticate = require('../controllers/middlewares/authenticate');
var AuthController = require('./../controllers/AuthController');

router.post(baseUrl + '/login',    AuthController.user_login);
router.post(baseUrl + '/register', AuthController.user_registration);
// router.post(baseUrl + '/auth', authenticate, AuthController.authenticateUser);
// router.post(baseUrl + '/logout',   AuthController.logoutUser);

module.exports = router;
