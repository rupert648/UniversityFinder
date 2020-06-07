const { Router } = require('express');
const router = new Router();
var stringSimilarity = require('string-similarity');

const University = require('../models/University');

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
/* eslint-enable no-unused-vars */

function getScores(body, universities) {
    console.log(body);
    var {
        subjectofstudy,
        nightlife,
        sport,
        location,
        typeofcampus
    } = body;

    //filtered list with universities which offer subject or similar subjects
    // e.g. if accounting requested
    // shows unis with economics/finance
    universities = universities.filter(uni => {
        var matches = stringSimilarity.findBestMatch(subjectofstudy, uni.subjectsOffered);
        // give uni highest matching subject as new attribute
        uni.similarSubject = matches.bestMatch.target;
        //filter to only have unis where rating is > 0.3
        return matches.bestMatch.rating > 0.3;  
    });

    //iterate through these universities and give score based on matched attributes
    
    //weights (for each attribute, can tweak)
    var weights = {
        nightlife: 0.6,
        sports: 0.3,
        location: 0.7,
        typeofcampus: 0.5,
    };

    var results = [];
    universities.forEach(uni => {
        let score = 0;
        for (let [key, value] of Object.entries(weights)) {
            console.log(typeof uni[key]);
            if (typeof uni[key] === 'object') {
                if (uni[key].includes(body[key])) {
                    score += value;
                }
            } else {
                if (uni[key] === body[key]) {
                    score += value;
                }
            }
        }
        uni.score = score;
        results.push(uni);
    });

    //sort the scores
    results.sort(function(a, b) {
        return b.score - a.score;
    });

    // return top 5
    return results.slice(0, 5);
}

module.exports = router;