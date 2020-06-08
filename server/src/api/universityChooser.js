const { Router } = require('express');
const router = new Router();

const University = require('../models/University');
const { getScores } = require('./matchingAlgorithm/getScore');

router.post('/', 
    function(req, res) {
        //might change methods here so keeping separate function for now
        getMatches(req.body, res);
    }
);    

/* eslint-disable no-unused-vars */
function getMatches(body, res) {
    
    //temporary - returns entire list of universities
    University.getAll(function(err, results) {
        if (err) {
            console.log(err);
        } else {
            //res.send(results);
            results = getScores(body, results);
            res.send(results);
        }
    });
}


module.exports = router;