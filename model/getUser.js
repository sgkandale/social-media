let { pgpool } = require('./conn')

const getUser = (username, password) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE username='${username}' LIMIT 1`
        pgpool.query(query, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results.rows)
            }
        })
    })
}

module.exports = {
    getUser
}