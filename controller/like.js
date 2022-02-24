const { likePost, unlikePost } = require('../model/likes')

const likePostById = (req, res) => {

    // get user from request
    const { decodedToken } = req

    // get request body
    const { id } = req.params

    // get post from database
    likePost(decodedToken.id, id)
        .then(post => {
            return res.status(201).json({
                message: 'post liked'
            })
        })
        .catch(error => {
            return res.status(500).json({
                error: error
            })
        })
}

const unlikePostById = (req, res) => {

    // get user from request
    const { decodedToken } = req

    // get request body
    const { id } = req.params

    // get post from database
    unlikePost(decodedToken.id, id)
        .then(post => {
            return res.status(201).json({
                message: 'post unliked'
            })
        })
        .catch(error => {
            return res.status(500).json({
                error: error
            })
        })
}


module.exports = {
    likePostById,
    unlikePostById
}