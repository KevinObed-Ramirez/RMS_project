var Vehicle = require('../models/vehicle');
var Incident = require('../models/incident');

const { body, validationResult } = require("express-validator");

// Display list of all vehicles
exports.vehicle_list = function (req, res, next) {

    Vehicle.find()
        .sort([['name', 'ascending']])
        .exec(function (err, list_vehicle) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('vehicle_list', { title: 'vehicle List', list_vehicle: list_vehicle });
        });

};

// Display detail page for a specific Vehicle.
exports.vehicle_detail = function (req, res, next) {

        res.render('vehicle_detail');
};

// Display Vehicle create form on GET.
exports.vehicle_create_get = function (req,res) {
    res.render('vehicle_form', { title: 'Create Vehicle' });
};

// Handle vehicle create on POST.
exports.vehicle_create_post = [

    // Validate and santise the name field.
    body('name', 'The Vehicle name must contain at least 3 characters').trim().isLength({ min: 3 }).escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a genre object with escaped and trimmed data.
        var vehicle = new Vehicle(
        {   vehicle_make:req.body.vehicle_make,
            vehicle_model:req.body.vehicle_model,
            vehicle_plate:req.body.vehicle_plate,
            vehicle_year:req.body.vehicle_year,
            vehcile_vin:req.body.vehcile_vin,
            vehicle_details:req.body.vehicle_details,
            vehicle_reg:req.body.vehicle_reg,
            vehicle_body:req.body.vehicle_body,
        }
        );


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('vehicle_form', { title: 'Create Vehicle', vehicle: vehicle, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.
            // Check if Vehicle with same name already exists.
            Vehicle.findOne({ 'name': req.body.name })
                .exec(function (err, found_vehicle) {
                    if (err) { return next(err); }

                    if (found_vehicle) {
                        // Vehicle exists, redirect to its detail page.
                        res.redirect(found_vehicle.url);
                    }
                    else {

                        Vehicle.save(function (err) {
                            if (err) { return next(err); }
                            // Vehicle saved. Redirect to genre detail page.
                            res.redirect(vehicle.url); 
                        });

                    }

                });
        }
    }
];

// Display Vehicle delete form on GET.
exports.vehicle_delete_get = function (req, res, next) {

    // function (err, results) {
    //     if (err) { return next(err); }
    //     if (results.vehicle == null) { // No results.
    //         res.redirect('/catalog/vehicle');
    //     }
        // Successful, so render.
        res.render('vehicle_delete', { title: 'Delete Vehicle', vehicle: results.vehicle, vehicle_incident: results.vehicle_incident });
    };

// };

// Handle Vehicle delete on POST.
exports.vehicle_delete_post = function (req, res, next) { 

    // function (err, results) {
    //     if (err) { return next(err); }
        // Success
        if (results.vehicle_books.length > 0) {
            // Genre has books. Render in same way as for GET route.
            res.render('vehicle_delete', { title: 'Delete Vehicle', vehicle: results.vehicle, vehicle_incident: results.vehicle_incident });
            return;
        }
        else {
            // Vehicle has no incidents. Delete object and redirect to the list of vehicles.
            Vehicle.findByIdAndRemove(req.body.id, function deleteVehicle(err) {
                if (err) { return next(err); }
                // Success - go to Vehicle list.
                res.redirect('/catalog/vehicle');
            });

        }
    };



// Display Vehicle update form on GET.
exports.vehicle_update_get = function (req, res, next) {

    Vehicle.findById(req.params.id, function (err, genre) {
        if (err) { return next(err); }
        if (genre == null) { // No results.
            var err = new Error('Vehicle not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('Vehicle_form', { title: 'Update Vehicle', vehicle: vehicle });
    });

};

// Handle Vehicle update on POST.
exports.vehicle_update_post = [

    // Validate and sanitze the name field.
    body('name', 'Vehicle name must contain at least 3 characters').trim().isLength({ min: 3 }).escape(),


    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request .
        const errors = validationResult(req);

        // Create a genre object with escaped and trimmed data (and the old id!)
        var vehicle = new Vehicle(
            {
                vehicle_make:req.body.vehicle_make,
                vehicle_model:req.body.vehicle_model,
                vehicle_plate:req.body.vehicle_plate,
                vehicle_year:req.body.vehicle_year,
                vehcile_vin:req.body.vehcile_vin,
                vehicle_details:req.body.vehicle_details,
                vehicle_reg:req.body.vehicle_reg,
                vehicle_body:req.body.vehicle_body,re
            }
        );


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('vehicle_form', { title: 'Update Vehicle', vehicle: vehicle, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Vehicle.findByIdAndUpdate(req.params.id, vehicle, {}, function (err, thevehicle) {
                if (err) { return next(err); }
                // Successful - redirect to genre detail page.
                res.redirect(thevehicle.url);
            });
        }
    }
];