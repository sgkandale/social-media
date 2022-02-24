let { pgpool } = require('./conn')

const getUser = (email, userid) => {
    return new Promise((resolve, reject) => {
        let query = ``
        if (userid) {
            query = `SELECT * FROM users WHERE id=${userid} LIMIT 1`
        } else {
            query = `SELECT * FROM users WHERE email='${email}' LIMIT 1`
        }
        pgpool.query(query, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results.rows)
            }
        })
    })
}

const getUserWithFollowers = (userid) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT users.id, users.email, users.created_at, 
                        (SELECT COUNT(*) FROM followers WHERE user_id = users.id) AS followers,
                        (SELECT COUNT(*) FROM followers WHERE follower_id = users.id) AS following
                        FROM users WHERE id=${userid}`
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
    getUser,
    getUserWithFollowers
}