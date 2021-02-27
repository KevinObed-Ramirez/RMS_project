var express = require('express');
// const { route } = require('.');
// const { model } = require('#');
var router = express.Router();

//require mods
var login_controller = require('../controllers/loginController');
var incident_controller = require('../controllers/incidentController');
var people_controller = require('../controllers/peopleController');
var vehicle_controller = require('../controllers/vehicleController');

/// routes ///

// GET cat home page
router.get('/', login_controller.index);


//---------- PEOPLE ROUTES ----------// 

// GET request fro creating poeple and incident's form
// router.get('/incident+people/create', incident_controller && people_controller.incident_create_get + people_create_get);

// //POST request for creating people and incident form
// router.post('/incident+people/create', incident_controller && people_controller.incident_create_post + people_create_post);

// //GET request to delete people and incident form
// router.get('incident+people/delete', incident_controller && people_controller.incident_delete_get + people_delete_get);

// //POST request to delete people and incident form
// router.post('/incident+people/delete', incident_controller && people_controller.incident_delete_post + people_delete_post);

// //GET request to update people and incident form
// router.get('incident+people/update', incident_controller && people_controller.incident_update_get + people_update_get);

// //POST request to update people and incident form
// router.post('/incident+people/update', incident_controller && people_controller.incident_update_post + people_update_post);


// //---------- VEHICLE ROUTES ----------// 

// //GET request for creating a vehicle form.
// router.get('/vehicle/create', vehicle_controller.vehicle_create_get);

// //POST request for creating vehicle form
// router.post('/vehicle/create', vehicle_controller.vehicle_create_post);

// //GET req to delete vehicle form
// router.get('/vehicle/:id/delete', vehicle_controller.vehicle_delete_get);

// //POST request to delete vehicle form
// router.post('/vehicle/:id/delete', vehicle_controller.vehicle_delete_post);

// // GET request to update vehicle form
// router.get('/vehicle/:id/update', vehicle_controller.vehicle_update_get);

// //POST request to update vehicle form
// router.post('/vehicle/:id/update', vehicle_controller.vehicle_update_post);




module.exports = router;