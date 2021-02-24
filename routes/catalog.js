var express = require('express');
const { route } = require('.');
const { model } = require('../../../Documents/WestMecY2/Second_semester/unit_02/express-locallibrary-tutorial-/models/book');
var router = express.Router();

//require mods
var login_controller = require('../controllers/loginController');
var incident_controller = require('../controllers/incidentController');
var people_controller = require('../controllers/peopleController');
var vehicle_controller = require('../controllers/vehicleController');

/// routes ///

// GET cat home page
router.get('/', login_controller.index);

//GET request for creating a vehicle form.
router.get('/vehicle/create', vehicle_controller.vehicle_create_get);

//POST request for creating vehicle form
router.get('/vehicle/create', vehicle_controller.vehicle_create_post);

//GET req to delete vehicle form
router.get('/vehicle/:id/delete', vehicle_controller.vehicle_delete_get);

//POST request to delete vehicle form
router.get('.vehicle/:id/delete', vehicle_controller.vehicle_delete_post);

// GET request to update vehicle form
router.get('/vehicle/:id/update', vehicle_controller.vehicle_update_get);

//POST request to update vehicle form



model.exports = router;