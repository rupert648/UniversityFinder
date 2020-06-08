// Requirements
const { Router } = require('express');
const router = new Router();

// Modules
const University = require('../models/University');
const { getScores } = require('./matchingAlgorithm/getScore');

//  /uni-finder/ route
router.post('/', 
    function(req, res) {
        //might change methods here so keeping separate function for now
        getMatches(req.body, res);
    }
);    


// Function calls the matching algorithm to return a list of 5 universities to send back to the client.
function getMatches(body, res) {
    //returns entire list of universities
    University.getAll(function(err, results) {
        if (err) {
            console.log(err);
        } else {
            //passes list, with user requests to the matching algorithm
            results = getScores(body, results);
            res.send(results);
        }
    });

}



module.exports = router;