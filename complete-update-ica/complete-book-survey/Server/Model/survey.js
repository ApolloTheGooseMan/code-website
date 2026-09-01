const connection = require('./connection');

async function getAll() {
    return await connection.query(`SELECT * FROM gimm_340_survey`);
}

async function getById(id) {
    return await connection.query(`SELECT * FROM gimm_340_survey WHERE id = ?`, [id]);
}

async function insert(paramaters = {}) {
    let insertSQL = `INSERT INTO gimm_340_survey (book_id, first_name, last_name, why) VALUES (?, ?, ?, ?)`,
        queryParameters = [
            parseInt(paramaters.book),
            paramaters.firstName,
            paramaters.lastName,
            paramaters.reason
        ];
    return await connection.query(insertSQL, queryParameters);
}

async function edit(id, paramaters = {}) {
    let updateSQL = `UPDATE gimm_340_survey 
                        SET book_id = ?,
                            first_name = ?, 
                            last_name = ?, 
                            why = ?
                        WHERE id = ?`, 
        queryParameters = [
            parseInt(paramaters.book), 
            paramaters.firstName, 
            paramaters.lastName, 
            paramaters.reason,
            id
        ];
    return await connection.query(updateSQL, queryParameters);
     
}

module.exports = {
    getAll,
    getById,
    insert,
    edit
}