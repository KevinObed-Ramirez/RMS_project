var people = require('../models/people');
var async = require('async');
var incident = require('../models/incident');

 const { body,validationResult } = require('express-validator')

exports.people_list = function (req, res, next) {

    People.find()
        .sort([['last_name', 'ascending']])
        .exec(function (err, list_authors) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('people_list', { title: 'People List', people_list: list_people });
        });

};

// Display detail page for a specific Author.
exports.people_detail = function (req, res, next) {

    async.parallel({
        author: function (callback) {
            People.findById(req.params.id)
                .exec(callback)
        },
        authors_books: function (callback) {
            Book.find({ 'author': req.params.id }, 'title summary')
                .exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.author == null) { // No results.
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books });
    });

};
