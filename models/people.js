var mongoose = require('mongoose');

// const { DateTime } = require("luxon");

var Schema = mongoose.Schema;


var PeopleSchema = new Schema(
    {
        first_name: { type: String, required: true, maxlength: 100 },
        nickname: { type: String, require: true, maxlength: 100 },
        middle_name: { type: String, required: true, maxlength: 100 },
        last_name: { type: String, required: true, maxlength: 100 },
        phone_number:{type: String, required: true, maxlength: 10},
        date_of_birth: { type: Date, require: true},
        date_of_death: { type: Date },
        height: {type: String, required: true, maxlength: 3},
        weight: {type: String, required: true, maxlength: 3},
        unique_markings:{type: String, maxlength: 100},
        social_security:{type: String, maxlength:9},
        gang_affil:{type: String, maxlength:9},
        home_phone: { type: String, maxlength: 10, require: true},
        address: {type: String, maxlength:200, require: true},
        hazard: {type: String, maxlength: 1000}
        
    }
);

PeopleSchema.virtual('url').get(function(){
    return '/form/people/' + this._id;
})

PeopleSchema.virtual('lifespan').get(function () {
    var lifetime_string = '';
    if (this.date_of_birth) {
        lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
    }
    lifetime_string += ' - ';
    if (this.date_of_death) {
        lifetime_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    }
    return lifetime_string;
});

// Export model.
module.exports = mongoose.model('People', PeopleSchema);
