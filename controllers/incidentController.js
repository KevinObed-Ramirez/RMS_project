var People = require('../models/people');
var Incident = require('../models/incident');
var Vehicle = require('../models/vehicle');

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
        inc: function(callback){
            Incident.findById(req.params.id)
            .populate('people')
            .exec(callback);
        },
        vehicle: function (callback){
            Vehicle.find({'vehicle': req.params.id})
            .exec(callback);
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.inc == null){ //no result
            var err = new Error('Incident not found');
            err.status = 404;
            return next(err);
        }
        //successful, so render
        res.render('inc_detail', {
            title: results.inc.title, inc: results.inc, vehicle: results.vehicle
        });
    });
};

//display incident create from on GET

//left on bookController 73:1