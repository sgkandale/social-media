const { commentPost } = require('../model/comment')
const { getPost } = require('../model/posts')

const commentPostById = (req, res) => {

    // get user from request
    const { decodedToken } = req

    // get request body
    const { id } = req.params
    const { comment } = req.body

    if (!comment) {
        return res.status(400).json({
            error: 'comment is required'
        })
    }

    // get post from database
    getPost(id)
        .then(post => {
            if (post.length === 0) {
                return res.status(404).json({
                    error: 'post not found'
                })
            }
            // comment the post
            commentPost(decodedToken.id, id, comment)
                .then(comment => {
                    return res.status(201).json({
                        id: comment[0].id,
                    })
                })
                .catch(error => {
                    return res.status(500).json({
                        error: error
                    })
                })
        })
        .catch(error => {
            return res.status(500).json({
                error: error
            })
        })


}

module.exports = {
    commentPostById
}