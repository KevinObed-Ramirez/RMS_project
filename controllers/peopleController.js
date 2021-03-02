var people = require('../models/people');
// var async = require('async');
var incident = require('../models/incident');

// const { body,validationResult } = require('express-validator');










exports.people_list = function (req, res, next) {

    People.find()
        .sort([['last_name', 'ascending']])
        .exec(function (err, list_authors) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('people_list', { title: 'People List', people_list: list_people });
        });

};
