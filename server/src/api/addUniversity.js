const { Router } = require('express');
const router = new Router();

const University = require('../models/University');

router.post('/', function(req, res) {
    //this post request can only happen if we are not in dev, else return 404
    if(process.env.NODE_ENV === 'production') {
        const error = new Error(`Not Found - ${req.originalUrl}`);
        res.status(404);
        return error;
    } else {
        var body = req.body;
        console.log(body);
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