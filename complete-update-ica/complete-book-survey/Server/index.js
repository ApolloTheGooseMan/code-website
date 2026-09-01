//Libraries
const express = require('express');
const multer = require('multer');
const { validationResult } = require('express-validator');
const book = require('./Model/book');
const survey = require('./Model/survey');
const { firstNameValidaiton, lastNameValidaiton, bookIdValidaiton, reasonValidation} = require('./validation');

//Setup defaults for script
const app = express();
app.use(express.static('public'));
const upload = multer()
const port = 80 //Default port to http server

//JSON of books from database
app.get(
    '/books/',
    upload.none(),
    async (request, response) => {
        let result = {};
        try {
            result = await book.getAll();
        } catch (error) {
            return response
                .status(500) //Error code
                .json({ message: 'Something went wrong with the server.' });
        }
        //Default response object
        response.json({ 'data': result });
    });

app.get(
    '/survey/',
    upload.none(),
    async (request, response) => {
        let result = {};
        try {
            result = await survey.getAll(request.query);
            response.json({ 'data': result });
        } catch (error) {
            console.log(error);
            return response
                .status(500) //Error code
                .json({ message: 'Something went wrong with the server.' });
        }
    });

app.get(
    '/survey/:id/',
    upload.none(),
    async (request, response) => {
        let result = {};
        try {
            result = await survey.getById(request.params.id);
            response.json({ 'data': result });
        } catch (error) {
            return response
                .status(500) //Error code
                .json({ message: 'Something went wrong with the server.' });
        }
    });

app.post(
    '/survey/',
    upload.none(),
    [
        firstNameValidaiton,
        lastNameValidaiton,
        bookIdValidaiton,
        reasonValidation
    ],
    async (request, response) => {
        //Validate request; If there any errors, send 400 response back
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            return response
                .status(400)
                .json({
                    message: 'Request fields or files are invalid.',
                    errors: errors.array(),
                });
        }

        try {
            await survey.insert(request.body);
            response.json({ 'data': 'Survey response saved!' });
        } catch (error) {
            console.log(error);
            return response
                .status(500) //Error code
                .json({ message: 'Something went wrong with the server.' });
        }
});

app.put(
    '/survey/:id/',
    upload.none(),
    [
        firstNameValidaiton,
        lastNameValidaiton,
        bookIdValidaiton,
        reasonValidation
    ],
    async (request, response) => {
        //Validate request; If there any errors, send 400 response back
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            return response
                .status(400)
                .json({
                    message: 'Request fields or files are invalid.',
                    errors: errors.array(),
                });
        }

        try {
            await survey.edit(request.params.id, request.body);
            response.json({ 'data': 'Survey response updated!' });
        } catch (error) {
            return response
                .status(500) //Error code
                .json({ message: 'Something went wrong with the server.' });
        }
    }
);

app.listen(port);