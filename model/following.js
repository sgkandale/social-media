let { pgpool } = require('./conn')

const insertFollower = (user_id, target_user_id) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO followers (follower_id, user_id) VALUES (${user_id}, ${target_user_id})`

        pgpool.query(query, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results.rows)
            }
        })
    })
}

const removeFollower = (user_id, target_user_id) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM followers WHERE follower_id = ${user_id} AND user_id = ${target_user_id}`

        pgpool.query(query, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results.rows)
            }
        })
    })
}

const checkFollowing = (user_id, target_user_id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT id FROM followers WHERE follower_id = ${user_id} AND user_id = ${target_user_id}`

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
    insertFollower,
    removeFollower,
    checkFollowing
}