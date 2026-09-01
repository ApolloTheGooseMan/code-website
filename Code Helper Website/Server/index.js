//Libraries
const express = require('express');
const multer = require('multer');
const mysql = require('mysql2/promise');
//const course = require('./Model/course');

//Setup defaults for script
const app = express();
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

const upload = multer()
const port = 80 //Default port to http server

let connection = null;

async function query(sql, params) {
    //Singleton DB connection
    if (null === connection) {
        console.log('Here');
        connection = await mysql.createConnection({
            host: "student-databases.cvode4s4cwrc.us-west-2.rds.amazonaws.com",
            user: "APOLLOWILLIAMS",
            password: "YNbUjmHAFjuFBZX2kF3MiIxVvKyKa6eboDU",
            database: 'APOLLOWILLIAMS'
        });
    }

    const [results,] = await connection.execute(sql, params);
    return results;
}

//The * in app.* needs to match the method type of the request
app.get(
    '/chelper/',
    upload.none(),
    async (request, response) => {
        let result = {};
        try {
            let selectSql = `SELECT
                code_helper_memory.id,
                code_projects.name AS project_name,
                code_helper_memory.promt,
                code_languiges.name AS code_type,
                code_helper_memory.answer,
                code_helper_memory.script
                FROM code_helper_memory
                INNER JOIN code_projects
                ON code_helper_memory.project_name_id = code_projects.id
                INNER JOIN code_languiges
                ON code_helper_memory.code_type_id = code_languiges.id`;
            whereStatements = [],
                orderByStatements = [],
                queryParameters = [];

            if (typeof request.query.id !== 'undefined') {
                whereStatements.push('code_helper_memory.id = ?');
                queryParameters.push(request.query.id);
            }

            if (typeof request.query.name !== 'undefined') {
                whereStatements.push('code_projects.name LIKE ?');
                queryParameters.push("%" + request.query.name + "%");
            }

            if (typeof request.query.promt !== 'undefined') {
                whereStatements.push('promt LIKE ?');
                queryParameters.push("%" + request.query.promt + "%");
            }


            if (typeof request.query.code !== 'undefined') {
                whereStatements.push('code_languiges.name LIKE ?');
                queryParameters.push("%" + request.query.code + "%");
            }


            if (typeof request.query.answer !== 'undefined') {
                whereStatements.push('answer LIKE ?');
                queryParameters.push("%" + request.query.answer + "%");
            }

            if (typeof request.query.script !== 'undefined') {
                whereStatements.push('script LIKE ?');
                queryParameters.push("%" + request.query.script + "%");
            }


            //Dynamically add WHERE expressions to SELECT statements if needed
            if (whereStatements.length > 0) {
                selectSql = selectSql + ' WHERE ' + whereStatements.join(' AND ');
            }

            //Dynamically add ORDER BY expressions to SELECT statements if needed
            if (orderByStatements.length > 0) {
                selectSql = selectSql + ' ORDER BY ' + orderByStatements.join(', ');
            }

            //Dynamically add LIMIT expressions to SELECT statements if needed
            if (typeof request.query.limit !== 'undefined' && request.query.limit > 0 && request.query.limit < 6) {
                selectSql = selectSql + ' LIMIT ' + request.query.limit;
            }

            result = await query(selectSql, queryParameters);
        } catch (error) {
            console.log(error);
            return response.status(500) //Error code 
                .json({ message: 'Something went wrong with the server.' });
        }
        //Default response object
        response.json({ 'data': result });
    });

app.post(
    '/chelper/:id',
    upload.none(),
    async (request, response) => {
        try {
            const id = request.params.id;
            const { name, promt, code, answer, script } = request.body;

            //VALIDATION
            let errors = [];

            if (!name || name.length === 0) {
                errors.push("Project name is required");
            }
            if (!promt || promt.length === 0) {
                errors.push("Promt is required");
            }

            if (errors.length > 0) {
                return response.status(400).json({ errors });
            }

            //UPDATE QUERY
            const sql = `
                UPDATE code_helper_memory
                SET project_name = ?, promt = ?, code_type = ?, answer = ?, script = ?
                WHERE id = ?
            `;

            await query(sql, [name, promt, code, answer, script, id]);

            response.json({ message: "Update successful" });

        } catch (error) {
            console.log(error);
            response.status(500).json({ message: "Server error" });
        }
    }
);

app.post(
    '/chelper/',
    upload.none(),
    async (request, response) => {
        try {
            const { name, promt, code, answer, script } = request.body;

            let errors = [];

            // VALIDATION (expand this!)
            if (!name || name.length === 0) errors.push("Project name required");
            if (!promt || promt.length === 0) errors.push("Promt required");
            if (!code || code.length === 0) errors.push("Code type required");
            if (!answer || answer.length === 0) errors.push("Answer required");
            if (!script || script.length === 0) errors.push("Script required");

            if (errors.length > 0) {
                return response.status(400).json({ errors });
            }

            const sql = `
                INSERT INTO code_helper_memory
                (project_name, promt, code_type, answer, script)
                VALUES (?, ?, ?, ?, ?)
            `;

            await query(sql, [name, promt, code, answer, script]);

            response.json({ message: "Insert successful" });

        } catch (error) {
            console.log(error);
            response.status(500).json({ message: "Server error" });
        }
    }
);

app.delete(
    '/chelper/:id', 
    upload.none(), 
    async (request, response) => {
    try {
        const sql = `DELETE FROM code_helper_memory WHERE id = ?`;
        await query(sql, [request.params.id]);

        response.json({ message: "Delete successful" });
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Server error" });
    }
});

app.listen(port, () => {
    console.log(`Application listening at http://localhost:${port}`);
})