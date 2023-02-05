const express = require('express')
const sellerController = require('../Controllers/sellerController')
const authController = require('../Controllers/authController')
const Seller = require('../Model/SellerModel')

const Router = express.Router()

Router
 .route('/')
 .get(sellerController.getAllSellers)
 .post(sellerController.createASeller)


Router
 .route('/:id')
 .get(sellerController.getASeller)
 .patch(sellerController.updateSeller)
 .delete(sellerController.deleteASeller)

Router
 .route('/signup')
 .post(authController.signup(Seller))

Router
 .route('/login')
 .post(authController.login(Seller))
 
module.exports = Router;