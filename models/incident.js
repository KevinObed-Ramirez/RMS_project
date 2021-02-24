var mongoose = require('mongoose');
const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var IncidentSchema = new Schema({
    occurence_date: { type: Date},
    occurence_time: { type: DateTime},
    incident_type: { type: String, require: true, },
    location: { type: String, require: true, },
    location_name: {type: String, require: true, }
});

IncidentSchema.virtual('url').get(function(){
    return '/form/incident/' + this._id;
})

// Export model.
module.exports = mongoose.model('Incident', IncidentSchema);