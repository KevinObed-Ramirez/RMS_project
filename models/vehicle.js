var mongoose = require('mongoose');
const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var VehicleSchema = new Schema({
    vehicle_make:{},
    vehicle_model:{},
    vehicle_plate:{},
    vehicle_year:{},
    vehicle_miles:{},
    vehicle_title:{},
    vehicle_color:{},
    vehcile_vin:{},
    vehicle_details:{},
    vehicle_registration:{},
    vehicle_body:{}


});

VehicleSchema.virtual('url').get(function(){
    return '/form/vehicle/' + this._id;
})

// Export model.
module.exports = mongoose.model('Vehicle', VehicleSchema);