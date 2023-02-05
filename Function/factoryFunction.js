exports.getMany = Model => async ( request, response ) => {
    try{
        const doc = await Model.find()
        response.status(200)
        .json({
            status: 'success',
            result: doc.length,
            data:{
                doc
            }
        })
    } catch (error) {
        response.status(400)
        .json({
            status: 'fail',
            message: error.message
        })
    }
}

exports.getOne = Model => async (request, response) => {
    try{
        const doc = await Model.findById(request.params.id)
        response.status(200)
        .json({
            status: 'success',
            data:{
                doc
            }
        })
    } catch(error) {
        response.status(400)
        .json({
            status: 'fail',
            message: error.message
        })
    }
}

exports.createOne = Model => async (request, response) => {
    try{
        const doc = await Model.create(request.body)

        response.status(200)
        .json({
            status: 'success',
            data:{
                doc
            }
        })

    } catch (error) {
        response.status(404)
        .json({
            status: 'fail',
            message: error.message
        })

    }
}

exports.deleteOne = Model => async ( request, response ) => {
    try{
        const doc = await Model.findByIdAndDelete(request.params.id)

        response.status(200)
        .json({
            status: 'success',
            data:{
                doc
            }
        })

    } catch(error) {
        response.status(404)
        .json({
            status: 'fail',
            message: error.message
        })
    }
}

exports.updateOne = Model => async ( request, response ) => {
    try{
        const doc =  await Model.findByIdAndUpdate(
            request.params.id,
            request.body,
            {
                new: true,
                runValidator: true
            })
        response.status(200)
        .json({
            status: 'success',
            data:{
                doc
            }
        })      
    } catch (error) {
        response.status(404)
        .json({
            status: 'fail',
            message: error.message
        })        
    }
}