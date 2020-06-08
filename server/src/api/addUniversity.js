// Requirements
const { Router } = require('express');
const router = new Router();

// Modules
const University = require('../models/University');

//  /add-new-university post request
router.post('/', function(req, res) {
    //Can only add uni if not in dev mode - else return 404 error
    if(process.env.NODE_ENV === 'production') {
        const error = new Error(`Not Found - ${req.originalUrl}`);
        res.status(404);
        return error;
    } else {
        //parse request into format and push into db
        var body = req.body;
        var newUni = new University({
            uniname: body.uniname,
            rankingGuardian: body.rankingGuardian,
            undergraduateClassSize: body.undergraduateClassSize,
            nightlife: body.nightlife,
            sports: body.sports,
            location: body.location,
            typeofcampus: body.typeofcampus,
            averagerequiredgrades: body.averagerequiredgrades,
            subjectsOffered: body.subjectsOffered,
            website: body.website
        });
        University.createNewUni(newUni, function(err, newUni){
            if(err) throw err;
            res.send('Success!' + newUni);
        });
    }
});

module.exports = router;