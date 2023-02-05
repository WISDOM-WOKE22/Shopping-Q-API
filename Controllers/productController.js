const Product = require('../Model/productModel')
const factory = require('../Function/factoryFunction')

// Get all Products
exports.getAllProducts = async (request, response) => {
    const products = await Product.find()
    try{
        response.status(200)
        .json({
            status: "successs",
            result: products.length,
            data:{
                products
            }
        })
    } catch ( error) {
        response.status(400)
        .json({
            status: "fail",
            message: "An Error ocured"
        })
    }
}

// Get a product
exports.getAProduct = async (request, response) => {
    const product = await Product.findById(request.params.id)
    try{
        response.status(200)
        .json({
            status: 'success',
            data: {
                product
            }
        })

    } catch (error) {
        response.status(404)
        .json({
            status: 'success',
            message: "No product found with this ID"
        })
    }
}

// Post a product
// exports.PostAProduct = async (request, response) => {
//     try{
//         newProduct = await Product.create(request.body)

//         response.status(201)
//         .json({
//             status: 'success',
//             data:{
//                 product: newProduct
//             }
//         })
//     } catch (error){
//         response.status(400)
//         .json({
//             status:'fail',
//             message: "No product exist with this ID"
//         })
//     }
// }
exports.PostAProduct = factory.createOne(Product)

// update a product 
exports.updateAProduct = async (request, response) => {
    try{
        const product = await Product.findByIdAndUpdate(
            request.params.id,
            request.body,
            {
                new: true,
                validateBeforeSave: false
            }
        )

        response.status(200)
        .json({
            status: 'success',
            data:{
                product
            }
        })

    } catch (error) {
        response.status(404)
        .json({
            status: "fail",
            message: "No product exist with this ID"
        })
    }
}


// Delete Product 
exports.deleteProduct = async (request, response) => {
    try{
        await Product.findByIdAndDelete(request.params.id)

        response.status(204)
        .json({
            status: 'success'
        })
    
    }catch (error) {
        response.status(404)
        .json({
            status: 'fail',
            message: "No product found with this ID"
        })
    }
}
