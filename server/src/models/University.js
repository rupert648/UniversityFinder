//mongoose University entry schema
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

//University Schema
var UniEntry = mongoose.Schema({
    uniname: {
        type: String,
        required: true,
        unique: true
    },
    rankingGuardian: {
        type: Number,
        required: true,
    },
    undergraduateClassSize: {
        type: Number,
        required: true,
    },
    nightlife: [{
        type: String,
        required: true,
        enum: ['club', 'houseparty', 'bonfire', 'quietnight', 'pub', 'ball']
    }],
    sports: {
        type: String,
        required: true,
        enum: ['none', 'small', 'moderate', 'athlete']
    },
    location: {
        type: String,
        required: true,
        enum: ['scotland', 'wales', 'southengland', 'london', 'northengland', 'midlands']
    },
    typeofcampus: {
        type: String,
        required: true,
        enum: ['campus', 'smalltown', 'largecity']
    },
    subjectsOffered: [{
        type: String,
        required: true,
    }],
    averagerequiredgrades: {
        type: String,
        validate: {
            validator: function(v) {    //for now only checking for A level grades
                return /(A\*|[ABCDEOU]){3}/.test(v);    //regex to check entry is A Level Grade format - uni required grades only 3 letters
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'Expected grade required']
    },
    website: {
        type: String,
        required: true,
    }
});
UniEntry.plugin(uniqueValidator);   //enable unique entries

//export SChema
var UniversityEntry = module.exports = mongoose.model('UniversityEntry', UniEntry);

//Function to query the db for a university given its name
module.exports.getUniversityByName = function(name, callback) {
    var query = {uniName: name};
    UniversityEntry.findOne(query, callback);
};

//Function to return all universities from the db
module.exports.getAll = function(callback) {
    UniversityEntry.find(callback);
};

//function to save a new university to the db
module.exports.createNewUni = function(newUni, callback) {
    newUni.save(callback);
};