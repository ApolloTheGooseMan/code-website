const connection = require('./connection');

async function getAll() {
    let selectSql = `SELECT * FROM gimm_340_books`;
    return await connection.query(selectSql);
}

module.exports = {
    getAll
}