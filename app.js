const express = require('express')
const productRoute = require('./Routes/productRoute')
const usersRoute = require('./Routes/userRoute')

// Initializing express
const app = express()

// This allows us to access request.body object of our request parameter
app.use(express.json());
// app.use(( request, response, next ) => {
//     request.requestTime = new Date.now().toISOString()
//     console.log(request.headers)
//     next()
// })

app.get('/', (request, response) => {
    response.status(200)
    .json({
        message: 'Hello welcome to Shopping-Q API' 
    })
})

app.use('/api/v1/products', productRoute);
app.use('/api/v1/users', usersRoute);





app.all('*', (request, response) => {
    response.status(404)
    .json({
        status: 'fail',
        message: 'Url not defined'
    })
})


module.exports = app;