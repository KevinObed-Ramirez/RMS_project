var mongoose = require('mongoose');

const { DateTime } = require("luxon");

var Schema = mongoose.Schema;


var PeopleSchema = new Schema(
    {
        first_name: { type: String, required: true, maxlength: 100 },
        family_name: { type: String, required: true, maxlength: 100 },
        date_of_birth: { type: Date },
        date_of_death: { type: Date },
    }
);

// Virtual for author "full" name.
PeopleSchema.virtual('name').get(function () {
    return this.family_name + ', ' + this.first_name;
});

// Virtual for this author instance URL.
PeopleSchema.virtual('url').get(function () {
    return '/catalog/people/' + this._id;
});

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

PeopleSchema.virtual('date_of_birth_yyyy_mm_dd').get(function () {
    return DateTime.fromJSDate(this.date_of_birth).toISODate(); //format 'YYYY-MM-DD'
});

PeopleSchema.virtual('date_of_death_yyyy_mm_dd').get(function () {
    return DateTime.fromJSDate(this.date_of_death).toISODate(); //format 'YYYY-MM-DD'
});

// Export model.
module.exports = mongoose.model('People', PeopleSchema);
