var people = require('../models/people');
var async = require('async');
var incident = require('../models/incident');

 const { body,validationResult } = require('express-validator')

exports.people_list = function (req, res, next) {

    People.find()
        .sort([['last_name', 'ascending']])
        .exec(function (err, list_people) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('people_list', { title: 'People List', people_list: list_people });
        });

};

// Display detail page for a specific Person.
exports.people_detail = function (req, res, next) {

    async.parallel({
        people: function (callback) {
            people.findById(req.params.id)
                .exec(callback)
        },
        people_incident: function (callback) {
            incident.find({ 'people': req.params.id }, 'Incident summary')
                .exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.people == null) { // No results.
            var err = new Error('Person not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('people_detail', { title: 'People Detail', people: results.people, people_incident: results.people_incident });
    });

};

// Display Person create form on GET.
exports.people_create_get = function(req, res, next) {
    res.render('people_form', { title: 'Create Person'});
};

// Handle Person create on POST.
exports.person_create_post = [

    // Validate and sanitize fields.
    body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('middle_name').trim().isLength({ min: 1 }).escape().withMessage('Middle name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
        body('last_name').trim().isLength({ min: 1 }).escape().withMessage('Last name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        // Create Author object with escaped and trimmed data
        var author = new Author(
            {
                first_name: req.body.first_name,
                middle_name: req.body.middle_name,
                last_name: req.body.last_name,
                phone_number:req.body.phone_number,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death,
                height: req.body.height,
                weight: req.body.weight,
                unique_markings:req.body.unique_markings,
                social_security: req.body.social_security,
                gang_affil: req.body.gang_affil
                
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('people_form', { title: 'Create Person', people: people, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save author.
            people.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect(people.url);
            });
        }
    }
];

// Display Person delete form on GET.
exports.people_delete_get = function (req, res, next) {

    async.parallel({
        people: function (callback) {
            People.findById(req.params.id).exec(callback)
        },
        people_incident: function (callback) {
            incident.find({ 'people': req.params.id }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.author == null) { // No results.
            res.redirect('/catalog/people');
        }
        // Successful, so render.
        res.render('people_delete', { title: 'Delete Person', people: results.people, people_incident: results.people_incident });
    });

};

// Handle People delete on POST.
exports.people_delete_post = function (req, res, next) {

    async.parallel({
        people: function (callback) {
            People.findById(req.body.peopleid).exec(callback)
        },
        people_incident: function (callback) {
            incident.find({ 'people': req.body.peopleid }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        // Success.
        if (results.people_incident.length > 0) {
            // People have incedents. Render in same way as for GET route.
            res.render('people_delete', { title: 'Delete Person', people: results.people, people_incident: results.people_incident });
            return;
        }
        else {
            // Person has no incidents. Delete object and redirect to the list of authors.
            People.findByIdAndRemove(req.body.peopleid, function deletePeople(err) {
                if (err) { return next(err); }
                // Success - go to author list.
                res.redirect('/catalog/people')
            })

        }
    });

};

// Display Person update form on GET.
exports.people_update_get = function (req, res, next) {

    People.findById(req.params.id, function (err, people) {
        if (err) { return next(err); }
        if (author == null) { // No results.
            var err = new Error('Person not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('person_form', { title: 'Update Person', people: people });

    });
};

exports.people_update_postb= [
    // Validate and sanitize fields.
    body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('middle_name').trim().isLength({ min: 1 }).escape().withMessage('Middle name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
        body('last_name').trim().isLength({ min: 1 }).escape().withMessage('Last name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        // Create Author object with escaped and trimmed data
        var author = new Author(
            {
                first_name: req.body.first_name,
                middle_name: req.body.middle_name,
                last_name: req.body.last_name,
                phone_number:req.body.phone_number,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death,
                height: req.body.height,
                weight: req.body.weight,
                unique_markings:req.body.unique_markings,
                social_security: req.body.social_security,
                gang_affil: req.body.gang_affil
                
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('people_form', { title: 'Create Person', people: people, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save author.
            people.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect(people.url);
            });
        }
    }
];

