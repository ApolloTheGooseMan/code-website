//Libraries
const express = require('express');
const multer  = require('multer');
const mysql = require('mysql2');

//Setup defaults for script
const app = express();
const upload = multer()
const port = 80 //Default port to http server
const connection = mysql.createConnection({
    host: "bsu-gimm260-fall-2021.cwtgn0g8zxfm.us-west-2.rds.amazonaws.com",
    user: "in_class_activity",
    password: "in_class_activity",
    database: 'in_class_activity'
});

//JSON of books from database
app.get('/books/', upload.none(), (request, response) => {
    connection.query('SELECT * FROM gimm_340_books', (error, result) => {
        if (error)  {
            console.log(error);
            return response
                .status(500) //Error code when something goes wrong with the server
                .setHeader('Access-Control-Allow-Origin', '*') //Prevent CORS error
                .json({message: 'Something went wrong with the server.'});
        } else {
            //Default response object
            response
                .setHeader('Access-Control-Allow-Origin', '*') //Prevent CORS error
                .json({data: result});
    }});
});

//Action to handle form submission
app.post('/', upload.none(), (request, response) => {
    const insertSql = ``
    let queryParameters = [];
    connection.query(insertSql, queryParameters, (error, result) => {
        if (error)  {
            console.log(error);
            return response
                .status(500) //Error code when something goes wrong with the server
                .setHeader('Access-Control-Allow-Origin', '*') //Prevent CORS error
                .json({message: 'Something went wrong with the server.'});
        } else {
            //Default response object
            response
                .setHeader('Access-Control-Allow-Origin', '*') //Prevent CORS error
                .json({message: 'Form submission was succesful!'});
    }});
});

app.listen(port);