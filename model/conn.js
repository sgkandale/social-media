const Pool = require('pg').Pool

const pgpool = new Pool({
    ssl: { rejectUnauthorized: false },
    connectionString: process.env.DATABASE_URL
})

module.exports = {
    query: (text, params, callback) => {
        return pgpool.query(text, params, callback)
    },
    pgpool
}