const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = require('../config/tokenSecret')

const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
        return res.status(401).json({
            error: 'no token provided'
        })
    }

    const splitToken = authHeader.split(' ')
    if (splitToken.length !== 2) {
        return res.status(401).json({
            error: 'invalid token format'
        })
    }

    jwt.verify(splitToken[1], ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                error: 'invalid token'
            })
        }

        req.decodedToken = user
        next()
    })
}

module.exports = {
    validateToken
}