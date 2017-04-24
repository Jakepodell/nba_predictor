var web_scraper = require("./web_scraper.js");
var request = require('request-promise');

exports.generate_matchups = function(year) {
	var matchups = [];
	return web_scraper.scrape(year).then(function(val){
	    for(var i = 0; i < val.length; i++) {
	    	for(var j = i + 1; j < val.length; j++) {
	    		var team1 = val[i];
	    		var team2 = val[j];
	    		var team_name1 = team1['team_name'];
	    		var team_name2 = team2['team_name'];
	    		var stats1 = team1['stats'];
	    		var stats2 = team2['stats'];
	    		var stat_diffs = [];
	    		for(var k = 0; k < stats1.length; k++) {
	    			stat_diffs.push((stats1[k] - stats2[k]).toFixed(2)/1.0);
	    		}
	    		// console.log("team1: " + team_name1 + ", team2: " + team_name2 + ", stat_diffs: " + stat_diffs);
	    		matchups.push({abv1: team_name1, abv2: team_name2, stat_diffs: stat_diffs});
	    	}
	    }
	    return matchups;
	})    
  .catch(function(err) {
  //	console.log(err);
  });
}

 // exports.generate_matchups(process.argv[2]).then(function(val) {
 //     console.log(val);
 // })

