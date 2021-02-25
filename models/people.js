var mongoose = require('mongoose');

const { DateTime } = require("luxon");

var Schema = mongoose.Schema;


var PeopleSchema = new Schema(
    {
        first_name: { type: String, required: true, maxlength: 100 },
        middle_name: { type: String, required: true, maxlength: 100 },
        last_name: { type: String, required: true, maxlength: 100 },
        phone_number:{type: String, required: true, maxlength: 10},
        date_of_birth: { type: Date },
        date_of_death: { type: Date },
        height: {type: String, required: true, maxlength: 3},
        weight: {type: String, required: true, maxlength: 3},
        unique_markings:{type: String, maxlength: 100},
        social_security:{type: String, maxlength:9},
        gang_affil:{type: String, maxlength:9}
        
    }
);

PeopleSchema.virtual('url').get(function(){
    return '/form/people/' + this._id;
})

// Export model.
module.exports = mongoose.model('People', PeopleSchema);
