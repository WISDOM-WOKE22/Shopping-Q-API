const express = require('express')
const userController = require('../Controllers/userController')
const authController = require('../Controllers/authController')
const User = require('../Model/usersModel')

const Router = express.Router()

Router
 .route('/')
 .get(userController.getAllUsers)
 .post(userController.createAUser)

Router
 .route('/:id')
 .get(userController.getAUser)
 .patch(userController.updateAUser)
 .delete(userController.deleteUser)

Router
 .route('/signup')
 .post(authController.signup)

Router
 .route('/login')
 .post(authController.login)
 
module.exports = Router;