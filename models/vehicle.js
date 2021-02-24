var mongoose = require('mongoose');
const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var VehicleSchema = new Schema({

});

VehicleSchema.virtual('url').get(function(){
    return '/form/incident/' + this._id;
})