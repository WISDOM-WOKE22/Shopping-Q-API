const { promisify } = require('util')
const User = require('../Model/usersModel');
const jwt = require('jsonwebtoken')

const signToken = id => { 
    return  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
})
};

const date = Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60

const createSendToken = ( user, statusCode, response ) => {
    const token = signToken(user._id)

    // console.log(token)
    response.cookie('jwt', token, {
        // expires = date,
        // secure: true,
        httpOnly: true
    });

    // Removes password from the output
    user.password = undefined;


    response.status(statusCode)
    .json({
        status: 'success', 
        token,
        data:{
            user
        }
    })
}

exports.signup = async (request, response) => {
    try{
        const user = await User.create({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            passwordConfirm: request.body.passwordConfirm,
            role: request.body.role
        });

        createSendToken( user, 201, response )

        // const token = jwt.sign({ id: doc._id }, process.env.JWT_SECRET, {
        //     expiresIn: process.env.JWT_EXPIRES_IN
        // });

        // response.status(200)
        // .json({
        //     status: 'success', 
        //     token,
        //     data:{
        //         doc
        //     }
        // })
  

    } catch (error) {
        response.status(200)
        .json({
            status: 'success',
            message: error.message
        })
    }
}


exports.login = async ( request, response ) => {
    try{
        const { email, password } = request.body
        console.log(email, password)

        // checking if there is a password
        if(!email){
            return response.status(400)
            .json({
                status: 'fail',
                message: 'please provide email'
            })
        }
        // checking if there is a password
        if(!password){
            return response.status(400)
            .json({
                status: 'fail',
                message: 'please provide password'
            })
        }

        // querying for doc using email 
        const user = await User.findOne({ email }).select('+password')

        // Checking if doc exists
        if(!user){
            return response.status(200)
            .json({
                status:'fail',
                message: "No user found with this email" 
            })
        };

       if(!user || !( await user.correctPassword( password, user.password))){
        return response.status(200)
        .json({
            status:'fail',
            message: "Invalid email or password"
        })
       }

       createSendToken( user, 200, response )

    //    const token = jwt.sign({ id: doc._id }, process.env.JWT_SECRET, {
    //     expiresIn: process.env.JWT_EXPIRES_IN
    //    })
        

    //     response.status(200)
    //     .json({
    //         status: 'success',
    //         token,
    //     })
        
    } catch (error) {
        response.status(400)
        .json({
            status: 'fail',
            message: error.message

        })
    }
};

exports.protect = async ( request, response, next ) => {
    try{
        // Check if there is a token
        let token
        if(request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
          token = request.headers.authorization.split(' ')[1]
        //   console.log(token)
        }

        // Checking if there is a token
        if(!token){
            return response.status(401)
            .json({
                status:'fail',
                message: "You are not logged in, Please login to get access"
            })
        }

        // console.log(token, Model)
        // verify the token
        const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
        console.log(decode)
        
        const freshUser = await User.findById(decode.id)
        // console.log(doc.role)

        if(!freshUser){
            return response.status(401)
            .json({
                status: "fail",
                message: "The user belonging to this token does not exist"
            })
        }
        // store doc
        request.user = freshUser;

    } catch(error){
        console.log(error)
        return response.status(401)
        .json({
            status: 'fail',
            message: "You are not logged in please login"
        })
    };
    next();
};

exports.restrictTo = (...roles) => { 
    return ( request, response, next ) => {
        if(!roles.includes( request.user.role )){
            return response.status(403)
            .json({
                status: "fail",
                message: "You do not have permission"
            })
        }
        next()
    }
}