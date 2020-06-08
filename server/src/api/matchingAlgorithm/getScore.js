var stringSimilarity = require('string-similarity');

//weights (for each attribute, can tweak)
let weights = {
    nightlife: 0.6,
    sports: 0.3,
    location: 0.7,
    typeofcampus: 0.5,
    averagerequiredgrades: 0.9,
};

/* eslint-disable no-unused-vars */
const getScores = function(body, universities) {
    console.log(body);
    var {
        subjectofstudy,
        nightlife,
        sports,
        location,
        typeofcampus,
        averagerequiredgrades
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
    var results = [];
    universities.forEach(uni => {
        let score = 0;

        //different method of getting score for each item
        for (let [key, value] of Object.entries(weights)) {
            console.log(typeof uni[key]);
            switch(key) {
            case 'nightlife':
                if (uni[key].includes(body[key])) {
                    score += value;
                }
                break;

            case 'sports': 
                score += sportsScore(value, uni[key], body[key]);
                break;

            case 'location': 
                score += locationScore(value, uni[key], body[key]);
                break;

            case 'typeofcampus': 
                if (uni[key] === body[key]) {
                    score += value;
                }        
                break;

            case 'averagerequiredgrades':
                score += gradeScore(value, uni[key], body[key]);
                break;
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

function sportsScore(weightValue, uniValue, userValue) {
    //for this, if the user DOESNT play sport, it doesn't matter
    // how much sport that uni plays, so give high score for all unis
    //if they do play a lot of sport, uni should at least match that level of sport
    switch(userValue) {
    case 'none': 
        //doesn't really matter if the uni plays sport
        return weightValue;

    case 'small': 
        //amount of sport >= small
        if (uniValue !== 'none') return weightValue;
        else return weightValue/2;  //not too far away from small but weight should be less
        
    case 'moderate': 
        if (uniValue === 'none') return 0;
        if (uniValue === 'small') return weightValue/2;
        else return weightValue;
    
    case 'athlete':
        if (uniValue === 'none' || uniValue === 'small') return 0;
        if (uniValue === 'moderate') return weightValue/2;
        else return weightValue;

    default: return 0;
    }
}

function locationScore(weightValue, uniValue, userValue) {
    //we can't just say that if they didn't pick the same location, score = 0
    // if they picked wales, and this location is southwest england, then score is still decently high.
    // whereas if they pick south england, and location is scotland, score is low.

    switch (userValue) {
    case 'scotland': 
        // gonna be so many nested switch statements :(
        switch (uniValue) {
        case 'scotland': return weightValue;
        case 'wales': return weightValue/4; //far distance
        case 'southengland': return weightValue/8; //bloody miles away
        case 'london': return weightValue/8;   //bout as far as you can get (maybe not geographically)
        case 'northengland': return weightValue/2;
        case 'midlands': return weightValue/4;
        default: return 0;
        }    
    case 'wales': 
        switch (uniValue) {
        case 'scotland': return weightValue/4;
        case 'wales': return weightValue; 
        case 'southengland': return weightValue/2; 
        case 'london': return weightValue/4;   
        case 'northengland': return weightValue/2;
        case 'midlands': return weightValue/2;
        default: return 0;
        }
    case 'southengland':
        switch (uniValue) {
        case 'scotland': return weightValue/8;
        case 'wales': return weightValue/2; 
        case 'southengland': return weightValue; 
        case 'london': return weightValue/4;   
        case 'northengland': return weightValue/4;
        case 'midlands': return weightValue/2;
        default: return 0;
        }
    case 'london':
        switch (uniValue) {
        case 'scotland': return weightValue/8;
        case 'wales': return weightValue/4; 
        case 'southengland': return weightValue/4; 
        case 'london': return weightValue;   
        case 'northengland': return weightValue/4;
        case 'midlands': return weightValue/2;
        default: return 0;
        }

    case 'northengland':
        switch (uniValue) {
        case 'scotland': return weightValue/2;
        case 'wales': return weightValue/2; 
        case 'southengland': return weightValue/4; 
        case 'london': return weightValue/4;   
        case 'northengland': return weightValue;
        case 'midlands': return weightValue/2;
        default: return 0;
        }

    case 'midlands':
        switch (uniValue) {
        case 'scotland': return weightValue/4;
        case 'wales': return weightValue/2; 
        case 'southengland': return weightValue/4; 
        case 'london': return weightValue/2;   
        case 'northengland': return weightValue/2;
        case 'midlands': return weightValue;
        default: return 0;
        }
    }
}

function gradeScore(weightValue, uniValue, userValue) {
    var similarity = stringSimilarity.compareTwoStrings(uniValue, userValue);
    return similarity*weightValue;  //the more similar, the higher the score 
}

exports.getScores = getScores;