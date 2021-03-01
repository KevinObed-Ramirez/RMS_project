var mongoose = require('mongoose');
// const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var VehicleSchema = new Schema({
    vehicle_make:{type: String, maxlength: 30},
    vehicle_model:{type: String, maxlength: 30},
    vehicle_plate:{type: String, maxlength: 7},
    vehicle_year:{ type: String, maxlength: 4},
    vehcile_vin:{ type: String, maxlength: 17},
    vehicle_details:{type: String, maxlength: 100},
    vehicle_reg:{type: String, maxlength: 100},
    vehicle_body:{type: String,  maxlength: 2}


});

VehicleSchema.virtual('url').get(function(){
    return '/form/vehicle/' + this._id;
})

// Export model.
module.exports = mongoose.model('Vehicle', VehicleSchema);