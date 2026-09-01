const connection = require('./Model/connection');
const { check } = require('express-validator');

const firstNameValidaiton = check('firstName', 'Please enter your first name.')
    .isLength({ min: 3 });

const lastNameValidaiton = check('lastName', 'Please enter your last name')
        .isLength({ min: 3 });

const bookIdValidaiton =    check('book', 'Please select a valid book for your survey response')
        .custom(async (value) => {
            connection.query(`SELECT * FROM gimm_340_books WHERE id = ?`, [value])
                .then((books) => {
                    return books.length === 1;
                }
            )
        });
    
const reasonValidation = check('reason', 'Please enter a reason why you selected the book you did')
        .isLength({ min: 1 });

module.exports =  { firstNameValidaiton, lastNameValidaiton, bookIdValidaiton, reasonValidation };