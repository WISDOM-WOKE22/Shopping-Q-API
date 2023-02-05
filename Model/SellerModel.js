// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs')

// const sellerSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, "A seller must have a name"],
//         trim: true
//     },
//     email:{
//         type: String,
//         required:[ true, "Seller must have an email" ],
//         unique: true
//     },
//     password:{
//         type: String,
//         required: [true, "Password is required for authentication"],
//         select: false
//     },
//     passwordConfirm: {
//         type: String,
//         // required: [ true, 'Please confirm password' ],
//         validate: {
//             validator: function(el) {
//               return  el = this.password 
//             },
//             message: 'Confirm password does not match password'
//         }
//     },
//     role: {
//         type: String,
//         default: "seller",
//         enum: [ 'seller' ]
//     },
//     products: Array,
//     numberOfProductsSold: {
//         type: Number,
//         default: 3
//     },
//     totalProductsPosted:{
//         type: Number,
//         default: 5
//     }
// });

// sellerSchema.pre('save', async function(next) {
//     if(!this.isModified('password')){
//       return next
//     }

//     this.password = await bcrypt.hash(this.password, 12);
//     // this.passwordConfirm = undefined;

//     next()
// })

// // Creating an instance method to compare password 
// sellerSchema.methods.correctPassword = async function (candidatePassword, sellerPassword){
//     return await bcrypt.compare( candidatePassword, sellerPassword )
// }

// const seller = mongoose.model( "Seller" , sellerSchema );

// module.exports = seller