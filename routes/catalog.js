var express = require('express');
// const { route } = require('.');
// const { model } = require('#');
var router = express.Router();

//require mods
var login_controller = require('../controllers/loginController');
var incident_controller = require('../controllers/incidentController');
var people_controller = require('../controllers/peopleController');
var vehicle_controller = require('../controllers/vehicleController');
// const people = require('../models/people');

/// routes ///

// GET cat home page
router.get('/', login_controller.index);


//---------- PEOPLE ROUTES ----------// 

// GET request fro creating poeple and incident's form
router.get('/incident/create', incident_controller.inc_create_get);

// //POST request for creating people and incident form
router.post('/incident/create', incident_controller.inc_create_post);

// GET request to delete people and incident form
router.get('incident/delete', incident_controller.inc_delete_get);

// POST request to delete people and incident form
router.post('/incident/delete', incident_controller.inc_delete_post);

// GET request to update people and incident form
router.get('incident/update', incident_controller.inc_update_get);

// POST request to update people and incident form
router.post('/incident/update', incident_controller.inc_update_post);

//---------- POEPLE ROUTING ------------//

//GET request for creating people from
router.get('/people/create', people_controller.people_create_get);
//POST request for creating poeple form
router.get('/people/create', people_controller.people_create_post);
//GET request to delete poeple form
router.get('/people/delete', people_controller.people_delete_get);
//POST request to delete popele form
router.get('/people/delete', people_controller.people_delete_post);
//GET request to update poeple form
router.get('/people/update', people_controller.people_update_get);
//POST request to update people form
router.get('/people/update', people_controller.people_update_post);


//---------- VEHICLE ROUTES ----------// 

//GET request for creating a vehicle form.
router.get('/vehicle/create', vehicle_controller.vehicle_create_get);

//POST request for creating vehicle form
router.post('/vehicle/create', vehicle_controller.vehicle_create_post);

//GET req to delete vehicle form
router.get('/vehicle/:id/delete', vehicle_controller.vehicle_delete_get);

//POST request to delete vehicle form
router.post('/vehicle/:id/delete', vehicle_controller.vehicle_delete_post);

// GET request to update vehicle form
router.get('/vehicle/:id/update', vehicle_controller.vehicle_update_get);

//POST request to update vehicle form
router.post('/vehicle/:id/update', vehicle_controller.vehicle_update_post);




module.exports = router;