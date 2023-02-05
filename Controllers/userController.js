const User = require('../Model/usersModel')
const jwt = require('jsonwebtoken')
// Factory function
const factory = require('../Function/factoryFunction');

exports.createAUser = async (request, response) => {
 response.status(404)
 .json({
    status: 'fail',
    message: "create User using 'api/v1/users/signup' URL"
 })
}

exports.getAllUsers = factory.getMany(User);
exports.getAUser = factory.getOne(User);
// exports.createAUser = factory.createOne(User);
exports.updateAUser = factory.updateOne(User)
exports.deleteUser = factory.deleteOne(User)