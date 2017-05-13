var perceptron = require("./perceptron.js");
var rsc = require("./record_stat_combiner.js");
var web_scraper = require("./web_scraper.js");
var p = perceptron();
var standardizer = require("./Standardize.js");

exports.train = function(season) {
    return rsc.combine(season).then((data) => {
        data.forEach((datum) => {
            p.train(datum.stat_diffs, datum.outcome);
        });
        for (var i = 0; i < 10000; i++) {
            p.retrain();
        }
        var roundedWeights = p.weights.map((weight, index) => {
            "use strict";
            let field = web_scraper.fields[Object.keys(web_scraper.fields)[index+1]];
            return (field || "bias") + " : " +weight.toFixed(2);
        })
        return {message: "Successfully trained the perceptron with the data from season " + season,
                weights: roundedWeights};
    }).catch(err => {
        "use strict";
        return {error: "there was an error when training the perceptron"};
    });
}

exports.predict = function(season, team1, team2) {
    return web_scraper.scrape(season).then(function(val) {
        if(!p.weights.length) throw new Error("the perceptron has not been trained yet, silly!", 5);
        var team1stats, team2stats, stat_diffs;
        for (var i = 0; i < val.length; i++) {
            if (!val[i]['team_name'])continue;
            if (standardizer.standardize[val[i]['team_name'].toLowerCase()] === team1)
                team1stats = val[i]['stats']
            else if (standardizer.standardize[val[i]['team_name'].toLowerCase()] === team2)
                team2stats = val[i]['stats'];
        }
        stat_diffs = [];
        for (var i = 0; i < team1stats.length; i++) {
            stat_diffs.push((team1stats[i] - team2stats[i]).toFixed(2) / 1.0);
        }
        return {
            message: "successfully predicted the winner",
            winner_index: p.perceive(stat_diffs),
            result: p.perceive(stat_diffs) ? team1 : team2
        }
    }).catch(err => {
        "use strict";
        return {message: "there was an error when attempting to make a prediction",
                error: err.message};
    })
}

exports.evaluate = function(season) {
    "use strict";
    return rsc.combine(season).then((data) => {
        var correct = 0;
        var incorrect = 0;
        data.forEach((datum) => {
            var outcome = datum.outcome;
            var prediction = p.perceive(datum.stat_diffs);
            if(outcome == prediction) correct++;
            else incorrect ++;
        });
        // console.log("predicted " + correct + " accurately, and " + incorrect + " inaccurately.");
        return {message: "evaluated the perceptrons ability to correctly predict outcomes from the " + season + " season.",
                percent_correct: correct/(correct + incorrect)};
    });
}