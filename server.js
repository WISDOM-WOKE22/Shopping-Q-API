const mongoose = require('mongoose')
const app = require('./app')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB connection successfully 😉😉😉")
}).catch(error => {
    console.log(error)
    console.log("DB not connected 👿👿👿")
    console.log("Server shutting down...")
}) 

const port = 2000

app.listen('2000', () => {
    console.log(`Application running at port ${port}...`)
})
