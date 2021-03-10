var express = require('express');
// const { route } = require('.');
// const { model } = require('#');
var router = express.Router();

//require mods
// var login_controller = require('../controllers/loginController');
var incident_controller = require('../controllers/incidentController');
var people_controller = require('../controllers/peopleController');
var vehicle_controller = require('../controllers/vehicleController');
// const vehicle = require('../models/vehicle');
// const people = require('../models/people');

/// routes ///

// GET catalog home page
router.get('/', incident_controller.index);


//---------- INCIDENTS ROUTES ----------// 

// GET request fro creating poeple and incident's form
router.get('/incident/create', incident_controller.inc_create_get);

// //POST request for creating people and incident form
router.post('/incident/create', incident_controller.inc_create_post);

// GET request to delete people and incident form
router.get('incident/:id/delete', incident_controller.inc_delete_get);

// POST request to delete people and incident form
router.post('/incident/:id/delete', incident_controller.inc_delete_post);

// GET request to update people and incident form
router.get('incident/:id/update', incident_controller.inc_update_get);

// POST request to update people and incident form
router.post('/incident/:id/update', incident_controller.inc_update_post);

//GET request for one incident
router.get('/incident/:id', incident_controller.inc_detail);

// GET request for list of all incident
router.get('/incident', incident_controller.inc_list);

//---------- POEPLE ROUTING ------------//

//GET request for creating people from
router.get('/people/create', people_controller.people_create_get);

//POST request for creating poeple form
router.get('/people/create', people_controller.people_create_post);

//GET request to delete poeple form
router.get('/people/:id/delete', people_controller.people_delete_get);

//POST request to delete popele form
router.get('/people/:id/delete', people_controller.people_delete_post);

//GET request to update poeple form
router.get('/people/:id/update', people_controller.people_update_get);

//POST request to update people form
router.get('/people/:id/update', people_controller.people_update_post);

//GET request for one poeple
router.get('/people/:id', people_controller.people_detail);

//GET request for list of all people
router.get('/people', people_controller.people_list);


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

//GET request for one vehicle
router.get('/vehicle/:id', vehicle_controller.vehicle_detail);

//GET request for list of all vehicle
router.get('/vehicle', vehicle_controller.vehicle_list);



module.exports = router;