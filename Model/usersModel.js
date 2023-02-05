const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [ true, "user must have a name" ],
        trim: true
    },
    email: {
        type: String,
        required: [ true, "user must have an email" ],
        unique: true
    },
    password: {
        type: String,
        reequired: true,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true,'Please confirm Password'],
        validate: {
            validator: function(el) {
                return el === this.password
            },
            message: 'password Confirm is incorrect'
        }
    },
    role:{
        type: String,
        default: 'user',
        enum: [ 'user', "seller" ]
    },
    products: Array
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next()
    }
    // encrypts user passwords
    this.password = await bcrypt.hash(this.password, 12)
    // Deletes the passwordConfirm from the database
    this.passwordConfirm = undefined;

    next()
})


userSchema.methods.correctPassword = async function( candidatePassword, userPassword ) {
  return await bcrypt.compare(candidatePassword, userPassword)
};

const User = mongoose.model("User",  userSchema );

module.exports = User;