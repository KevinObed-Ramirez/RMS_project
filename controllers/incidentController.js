var People = require('../models/people'); 
var Incident = require('../models/incident'); 
var Vehicle = require('../models/vehicle'); 
const { body, validationResult } = require('express-validator');
// var async = require('async');


exports.index = function(req, res){
    async.parallel({
        inc_count: function(callback){
            Incident.countDocuments({}, callback);
        },
        vehicle_count: function(callback){
            Vehicle.countDocuments({}, callback);
        },
        people_count: function (callback){
            People.countDocuments({}, callback);
        }
    }, function(err, result){
        res.render('index', {
            title: 'Something Random',
            error: err,
            error: err, 
            data: results
        });
    });
};
//display list of all incidents
exports.inc_list = function(req, res, next){
    Incident.find({}, 'incident report number')
    .populate('incident')
    .exec(function(err, list_inc){
        if(err) { return next(err); }
        //successful, so render
        res.render('inc_list', {
            title: 'Incident List',
            inc_list: list_inc
        });
    });
};

//dispay detail page for a specific incident
exports.inc_detail = function (req, res, next){
    async.parallel({
        incident: function(callback){
            Incident.findById(req.params.id)
            .populate('people')
            .populate('vehicle')
            .exec(callback);
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.incident == null){ //no result
            var err = new Error('Incident not found');
            err.status = 404;
            return next(err);
        }
        //successful, so render
        res.render('inc_detail', {
            title: results.incident.title, 
            incident: results.incident, 
        });
    });
};

//display incident create from on GET
exports.inc_create_get = function(req, res, next){
    async.parallel({
        people: function (callback){
            People.find(callback);
        },
        vehicle: function(callback){
            Vehicle.find(callback);
        },
    }, function (err, result){
        if(err){ return next(err); }
        res.render('inc_form', {
            title: 'New Incident',
            people: result.people,
            vehicle: results.vehicle
        });
    });
};


//handle incident create POST
exports.inc_create_post = [
    //conert the vehicle to an array
    (req, res, next)=>{
        if(!(req.body.vehicle instanceof Array)){
            if(typeof req.body.vehicle === 'undefined')
                req.body.vehicle = [];
            else{
                req.body.vehicle = new Array(req.body.vehicle);
            };
        }
        next();
    },

    //validate and sanitize fields
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('people', 'People must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('irn', 'IRN must not be empty').trim().isLength({ min: 1 }).escape(),
    body('vehicle.*').escape(),

    //process request after validation and sanitization
    (req, res, next) => {

        //extract the validation errors from a request
        const errors = validationResult(req);

        //create a incident object with escaped and trimmed data
        var incident = new Incident(
            {
                title: req.body.title,
                people: req.body.people,
                summary: req.body.summary,
                irn: req.body.irn,
                vehicle: req.body.vehicle
            });

        if(!errors.isEmpty()){
            // There are errors. Render form again with sanitized values/error messages.

            //get all poeple and vehicles for form
            async.parallel({
                people: function(callback){
                    People.find(callback);
                },
                vehicle: function(callback){
                    Vehicle.find(callback);
                },
            }, function(err, result){
                if (err) { return next(err); }

                // mark our selected vehicles as checked
                for (let i = 0; i< results.vehicle.length; i++){
                    if (incident.genre.indexOf(results.vehicle[i]._id) > -1){
                        results.genre[i].checked = 'true';
                    }
                }
                res.render('incident_form', {
                    title: 'Create Incident', 
                    people: results.people,
                    vehicle:results.vehicle,
                    incident: incident,
                    errors: errors.array() 
                });
            });
            return;
        }
        else{
            //data from form is valid. save incident
            incident.save(function (err){
                if(err) { return next(err); }
                // successful - redirect to new incident record
                res.redirect(incident.url);
            });
        }
    }
];

//display incident delete form on GET
exports.inc_delete_get = function (req, res, next){

    async.parallel({
        incident: function(callback){
            Incident.findById(req.params.id).populate('people').populate('vehicle').exec(callback);
        },
        //book instance whatever that may be, 170:9
    }, function(err, results){
        if(err) {return next(err);}
        if(results.book == null){ //no result
            res.redirect('/catalog/incidents');
        }
        //successful, so render
        res.render('inc_delete', {
            title: 'Delete Incident', 
            book: results.book, 
            //book instance replacement 176:45
        });
    });
};

//handle incident delete on POST???????
exports.inc_delete_post = function(req, res, next){
    //asume the post has valid id (ie no validation/sanitation)

    async.parallel({
        incident: function(callback){
            Incident.findById(req.body.id).populate('people').populate('vehicle').exec(callback);
        },
        //book instance 193:9
    }, function(err, results){
        if(err) {return next(err);}
        // success
        if(results.incident.length > 0){
            res.render('inc_delete', {
            title: 'Delete Incident',
            incident: results.incident,
            });
            return;
        }
        else{
            Incident.findByIdAndRemove(req.body.id, function deleteBook(err){
                if(err){ return next(err); }
                //success - got to books list
                res.redirect('/catalog/books');
            });
        }
    });
};

//display book update from on GET 
exports.inc_update_get = function(req, res, next){

    //get incident, poeple, and vehicles for form
    async.parallel({
        incident: function (callback){
            Incident.findById(req.params.id).populate('people').populate('vehicle').exec(callback);
        },
        people: function(callback){
            People.find(callback);
        },
        vehicle: function(callback){
            Vehicle.find(callback);
        },
    }, function (err, results){
        if(err) {return next(err);}
        if(results.incident == null){ //no results
            var err = new Error('Incident not found');
            err.status = 404;
            return next(err);
        }
        //success
        //mark out selected vehicles as checked
        for (var all_g_iter = 0; all_g_iter < results.vehicle.length; all_g_iter++){
            for(var incident_g_tier = 0; incident_g_iter < results.incident.vehicle.length; incident_g_iter++){
                if(results.vehicle[all_g_iter]._id.toString() === results.incident.vehicle[incident_g_iter]._id.toString()){
                    results.vehicle[all_g_iter].checked = 'true';
                }
            }
        }
        res.render('incident_form', {
            title: 'Update Incident',
            poeple: results.people,
            vehicle: results.vehicle, 
            incident: results.incident
        });
    });
};

//handle incident update on POST
exports.inc_update_post = [
    //convert the vehicle to an array
    (req, res, next) => {
        if(!(req.body.vehicle instanceof Array)){
            if(typeof req.body.vehicle === 'undefined')
            req.body.vehicle = [];
            else
                req.body.vehicle = new Array(req.body.vehicle);
        }
        next();
    },

    //validate and sanitize fiels
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('people', 'People involved must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('irn', 'Incident Reoprt Number must not be empty').trim().isLength({ min: 1 }).escape(),
    body('vehicle.*').escape(),

    //process request after validation and sanitization
    (req, res, next) => {
        //extract the validation errors from a request
        const errors = validationResult(req);

        //create a instance object with escaped/trimmed data and old id
        var incident = new Incident(
            {
                title: req.body.title,
                people: req.body.poeple,
                summary: req.body.summary,
                irn: req.body.irn,
                vehicle: (typeof req.body.vehicle === 'undefined') ? [] : req.body.vehicle,
                _id: req.params.id //This required, or a new ID will be assigned!
            });

        if(!errors.isEmpty()){
            // there are errors. render from again with sanitized values/error messages

            //get all authors and vehicles for from
            async.parallel({
                poeple: function(callback){
                    People.find(callback);
                },
                vehicle: function(callback){
                    Vehicle.find(callback);
                },
            }, function(err, results){
                if(err) {return next(err); }

                //mark out selected vehicles as checked
                for(let i = 0; i<results.vehicle.length; i++){
                    if(incident.vehicle.indexOf(result.vehicle[i]._id) > -1){
                        results.vehicle[i].checked = 'true';
                    }
                }
                res.render('inc_form', {
                    title: 'Update Incident',
                    people: results.people, 
                    vehicle: results.vehicle,
                    incident: incident,
                    errors: errors.array()
                });
            });
            return;
        }
        else{
            //data from is valid. update the record
            Incident.findByIdAndUpdate(req.params.id, incident, {}, function(err, thebook){
                if(err) { return next(err); }
                //successful - redirect to book detail page
                res.redirect(thebook.url);
            });
        }
    }
];