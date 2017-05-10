var perceptron = require("./perceptron.js")
var rsc = require("./record_stat_combiner.js")
var web_scraper = require("./web_scraper.js")
var Standardizer = require("./Standardize")
var p = perceptron();

exports.train = function(season) {
    return rsc.combine(season).then((data) => {
        data.forEach((datum) => {
            //console.log(datum);
            p.train(datum.stat_diffs, datum.outcome);
        });

        for (var i = 0; i < 10000; i++) {
            p.retrain();
        }
        return "success";
    }).catch(err => {
        "use strict";
        return "there was an error when training the perceptron";
    });
}

exports.predict = function(season, team1p, team2p) {
    return web_scraper.scrape(year).then(function(val) {
        var team1stats, team2stats, stat_diffs;
        for(var i = 0; i < val.length; i++) {
            if (Standardizer.standardize(val[i]['team_name'].toLowerCase()) === Standardizer.standardize(team1p.toLowerCase()))
                team1stats = val[i]['stats'];
            else if (Standardizer.standardize(val[i]['team_name'].toLowerCase()) === Standardizer.standardize(team2p.toLowerCase()))
                team2stats = val[i]['stats'];
        }
        stat_diffs = [];
        for(var i = 0; i < team1stats.length; i++) {
            stat_diffs.push((team1stats[i] - team2stats[i]).toFixed(2)/1.0);
        }

        return (p.perceive(stat_diffs) ? team1p : team2p);
    });
}