var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


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
                return /(A\*|[ABCDEOU]){3}/.test(v);    //regex for A*A*A*
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
UniEntry.plugin(uniqueValidator);

var UniversityEntry = module.exports = mongoose.model('UniversityEntry', UniEntry);

module.exports.getUniversityByName = function(name, callback) {
    var query = {uniName: name};
    UniversityEntry.findOne(query, callback);
};

module.exports.getAll = function(callback) {
    UniversityEntry.find(callback);
};

module.exports.createNewUni = function(newUni, callback) {
    newUni.save(callback);
};