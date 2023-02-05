const express = require('express')
const productController = require('../Controllers/productController')
const authController = require('../Controllers/authController')
const User = require('../Model/usersModel')

const Router = express.Router()

Router
 .route('/')
 .get(authController.protect,productController.getAllProducts)
 .post( 
     authController.protect,
     authController.restrictTo('seller'),
     productController.PostAProduct
    )

Router
 .route('/:id')
 .get(productController.getAProduct)
 .patch( 
     authController.protect,
     authController.restrictTo('seller'),
     productController.updateAProduct
    )
 .delete(
     authController.protect,
     authController.restrictTo('seller'),
     productController.deleteProduct
    )


module.exports = Router