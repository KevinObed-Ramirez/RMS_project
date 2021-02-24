var mongoose = require('mongoose');

const { DateTime } = require("luxon");

var Schema = mongoose.Schema;


var PeopleSchema = new Schema(
    {
        first_name: { type: String, required: true, maxlength: 100 },
        family_name: { type: String, required: true, maxlength: 100 },
        date_of_birth: { type: Date },
        date_of_death: { type: Date },
        height: {type: String, required: true, maxlength: 3},
        weight: {type: String, required: true, maxlength: 3},
        
    }
);


// Export model.
module.exports = mongoose.model('People', PeopleSchema);
