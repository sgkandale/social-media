const Pool = require('pg').Pool

const pgpool = new Pool({
    ssl: { rejectUnauthorized: false },
    connectionString: process.env.PG_STRING
})

module.exports = {
    query: (text, params, callback) => {
        return pgpool.query(text, params, callback)
    },
    pgpool
}