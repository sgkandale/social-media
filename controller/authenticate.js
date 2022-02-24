const { getUser } = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const verifyPassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

const authenticate = async (req, res) => {
    // get request body
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send({
            error: 'username and password are required'
        })
        return
    }

    // get user from database
    getUser(email)
        .then(user => {
            if (user.length > 0) {
                // compare password
                verifyPassword(password, user[0].password)
                    .then(result => {
                        if (result) {
                            // if password matches, return jwt
                            const token = jwt.sign({
                                email: email,
                                id: user[0].id
                            },
                                process.env.ACCESS_TOKEN_SECRET,
                                { expiresIn: '1h' })
                            res.status(200).send({
                                token: token,
                                format: 'Bearer {token}',
                            })
                        } else {
                            // if password doesn't match, return error
                            res.status(401).json({
                                error: 'Invalid username or password'
                            })
                        }
                    })
                    .catch(error => {
                        res.status(500).json({
                            error: error
                        })
                    })
            } else {
                // if user doesn't exist, return error
                res.status(401).json({
                    error: 'User not found.'
                });
            }
        })
        .catch(error => {
            // if error, return error
            res.status(500).json({
                error: error
            });
        })
}

module.exports = {
    authenticate
};