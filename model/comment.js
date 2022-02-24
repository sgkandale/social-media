let { pgpool } = require('./conn')

const commentPost = (user_id, post_id, comment) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO comments (user_id, post_id, comment) VALUES (${user_id}, ${post_id}, '${comment}') RETURNING id`

        pgpool.query(query, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results.rows)
            }
        })
    })
}

const getCommentsOfPost = (post_id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM comments WHERE post_id = ${post_id} ORDER BY created_at DESC`

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
    commentPost,
    getCommentsOfPost
}