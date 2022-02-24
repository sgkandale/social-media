let { pgpool } = require('./conn')

const insertPost = (post) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO posts 
                        (user_id, title, description) 
                        VALUES 
                        (${post.user_id}, '${post.title}', '${post.description}')
                        RETURNING id, user_id, title, description, created_at`

        pgpool.query(query, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results.rows)
            }
        })
    })
}

const getPost = (id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT 
        posts.id, user_id, title, description, created_at, 
        (SELECT COUNT(*) FROM likes WHERE post_id = ${id}) AS likes,
        (SELECT COUNT(*) FROM comments WHERE post_id = ${id}) AS comments
        FROM posts WHERE id = ${id} LIMIT 1`
        pgpool.query(query, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results.rows)
            }
        })
    })
}

const getPostByUser = (user_id) => {
    // get post with likes and all comments as array
    return new Promise((resolve, reject) => {
        const query = `SELECT
        posts.id, posts.user_id, posts.title, posts.description, posts.created_at,
        (SELECT COUNT(*) FROM likes WHERE post_id = posts.id) AS likes
        FROM posts WHERE user_id = ${user_id}
        ORDER BY posts.created_at DESC`
        pgpool.query(query, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results.rows)
            }
        })
    })
}

const deletePost = (id) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM posts WHERE id = ${id}`
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
    insertPost,
    getPost,
    getPostByUser,
    deletePost
}