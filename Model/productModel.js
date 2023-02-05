const mongoose = require('mongoose')
const User = require('./usersModel')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "product must have a name" ],
        trim: true
    },
    categories:{
        type: String,
        required:[ true, "product must have a category" ]
    },
    price: {
        type: Number,
        require: [ true, "product must have a price" ]
    },
    description: {
        type: String,
        required: [ true, "product must description" ]
    },
    rating:{
        type: Number,
        default: 2,
        min:1,
        max: 5
    },
    dataPosted: Date,
    quantity: {
        type: Number,
        required: [ true, "product quantity must be specified" ]
    },
    image: [],
    seller: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    brand:{
        type: String,
        required: [ true, "Product must have a brand which it belongs to" ]
    },
    discount: {
        type: Number,
        min:0,
        max: 100
    },
    priceNagotiation: {
        type: Boolean
    },
    buyer: [
        {
            type: mongoose.Schema.ObjectId
        }
    ],
    comments: []
});

productSchema.pre(/^find/, function(next) {
    console.log('Hello from Middleware 😃😃😃')
    next();
})

// productSchema.pre('save', async function(next) {
//    const Sellers = this.seller.map( async el => await User.findById(el) )
//    this.seller = await Promise.all(Sellers)
//     next();
// })

productSchema.pre(/^find/, function(next) {
    this.populate({
        path: "seller",
        select: "-email -__v -products -role"
    }).populate({
        path: "buyer",
        select:"-email -__v -products -role"
    })
    next();
})

const Product = mongoose.model('Product', productSchema );

module.exports = Product