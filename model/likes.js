let { pgpool } = require('./conn')

const likePost = (user_id, post_id) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO likes (user_id, post_id) VALUES (${user_id}, ${post_id})`

        pgpool.query(query, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results.rows)
            }
        })
    })
}

const unlikePost = (user_id, post_id) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM likes WHERE user_id = ${user_id} AND post_id = ${post_id}`

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
    likePost,
    unlikePost
}