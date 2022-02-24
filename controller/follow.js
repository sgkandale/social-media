const { getUser } = require('../model/user')
const { checkFollowing, insertFollower, removeFollower } = require('../model/following')

const followUser = async (req, res) => {

    // get user from request
    const { decodedToken } = req

    // get request body
    const { userid } = req.params

    if (decodedToken.id == userid) {
        return res.status(400).json({
            error: 'You cannot follow yourself'
        })
    }

    // get user from database
    getUser("", userid)
        .then(user => {
            if (user.length === 0) {
                return res.status(404).json({
                    error: 'user not found'
                })
            } else {

                // check following status
                checkFollowing(decodedToken.id, userid)
                    .then(following => {
                        if (following.length > 0) {
                            return res.status(409).json({
                                error: 'user already being followed'
                            })
                        } else {

                            // insert follower
                            insertFollower(decodedToken.id, userid)
                                .then(following => {
                                    return res.status(201).json({
                                        message: 'user followed'
                                    })
                                })
                                .catch(error => {
                                    return res.status(500).json({
                                        error
                                    })
                                })
                        }
                    })
                    .catch(error => {
                        return res.status(500).json({
                            error: error
                        })
                    })
            }
        })
        .catch(error => {
            return res.status(500).json({
                error: error
            })
        })

}



const unfollowUser = async (req, res) => {

    // get user from request
    const { decodedToken } = req

    // get request body
    const { userid } = req.params

    if (decodedToken.id == userid) {
        return res.status(400).json({
            error: 'You cannot follow yourself'
        })
    }

    // get user from database
    getUser("", userid)
        .then(user => {
            if (user.length === 0) {
                return res.status(404).json({
                    error: 'user not found'
                })
            } else {
                removeFollower(decodedToken.id, userid)
                    .then(following => {
                        return res.status(201).json({
                            message: 'user unfollowed'
                        })
                    })
                    .catch(error => {
                        return res.status(500).json({
                            error: error
                        })
                    })
            }
        })
        .catch(error => {
            return res.status(500).json({
                error: error
            })
        })

}

module.exports = {
    followUser,
    unfollowUser
}