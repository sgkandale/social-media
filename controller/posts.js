const { insertPost, getPost, getPostByUser, deletePost } = require('../model/posts')
const { getCommentsOfPost } = require('../model/comment')

const createPost = async (req, res) => {

    // get user from request
    const { decodedToken } = req

    // get request body
    const { title, description } = req.body

    if (!title || !description) {
        return res.status(400).json({
            error: 'title and description are required'
        })
    }

    // insert post
    insertPost({ user_id: decodedToken.id, title, description })
        .then(post => {
            if (post.length === 0) {
                return res.status(500).json({
                    error: 'post not created'
                })
            } else {
                return res.status(201).json({
                    id: post[0].id,
                    user_id: post[0].user_id,
                    title: post[0].title,
                    description: post[0].description,
                    created_at: post[0].created_at
                })
            }
        })
        .catch(error => {
            return res.status(500).json({
                error
            })
        })
}

const getPostById = async (req, res) => {

    // get request body
    const { id } = req.params

    // get post from database
    getPost(id)
        .then(post => {
            if (post.length === 0) {
                return res.status(404).json({
                    error: 'post not found'
                })
            } else {
                return res.status(200).json({
                    id: post[0].id,
                    user_id: post[0].user_id,
                    title: post[0].title,
                    description: post[0].description,
                    created_at: post[0].created_at
                })
            }
        })
        .catch(error => {
            return res.status(500).json({
                error
            })
        })
}

const getPostByUserId = async (req, res) => {

    // get user from request
    const { decodedToken } = req

    try {
        const posts = await getPostByUser(decodedToken.id)
        for (let i = 0; i < posts.length; i++) {
            const comments = await getCommentsOfPost(posts[i].id)
            posts[i].comments = comments
        }
        return res.status(200).json(posts)
    }
    catch (error) {
        return res.status(500).json({
            error
        })
    }

}

const deletePostById = async (req, res) => {


    // get user from request
    const { decodedToken } = req

    const { id } = req.params

    // get post from database
    getPost(id)
        .then(post => {
            if (post.length === 0) {
                return res.status(404).json({
                    error: 'post not found'
                })
            } else {
                if (post[0].user_id === decodedToken.id) {
                    deletePost(id)
                        .then(post => {
                            return res.status(200).json({
                                message: 'post deleted'
                            })
                        })
                        .catch(error => {
                            return res.status(500).json({
                                error
                            })
                        })
                } else {
                    return res.status(401).json({
                        error: 'unauthorized'
                    })
                }
            }
        })
        .catch(error => {
            return res.status(500).json({
                error
            })
        })
}


module.exports = {
    createPost,
    getPostById,
    getPostByUserId,
    deletePostById
}