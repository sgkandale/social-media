const { getUserWithFollowers } = require('../model/user')

const getUserDetails = async (req, res) => {

    // get user from request
    const { decodedToken } = req

    // get user from database
    getUserWithFollowers(decodedToken.id)
        .then(user => {
            if (user.length === 0) {
                return res.status(404).json({
                    error: 'user not found'
                })
            } else {
                return res.status(200).json({
                    id: user[0].id,
                    username: user[0].username,
                    email: user[0].email,
                    created_at: user[0].created_at,
                    followers: user[0].followers,
                    following: user[0].following
                })
            }
        })
        .catch(error => {
            return res.status(500).json({
                error
            })
        })
}

module.exports = {
    getUserDetails
}