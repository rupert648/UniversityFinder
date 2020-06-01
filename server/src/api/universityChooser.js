const { Router } = require('express');
const router = new Router();

const University = require('../models/University');

router.post('/', 
    function(req, res) {
        //might change methods here so keeping separate function for now
        getMatches(req.body, res);
    }
);    

/* eslint-disable no-unused-vars */
function getMatches(body, res) {
    var nightlife = body.nightlife;
    var sports = body.sports;
    var location = body.location;
    var typeofcampus = body.typeofcampus;
    var expectedgrades = body.expectedgrades;

    //temporary - returns entire list of universities
    University.getAll(function(err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
            res.send(results);
        }
    });
}
/* eslint-enable no-unused-vars */

module.exports = router;