var mrc = require("./matchup_record_converter.js");
var mg = require("./matchup_generator.js");
var standardizer = require("./matchup_generator.js");

mg.generate_matchups(process.argv[2]).then((matchups) => {
	return [mrc.convert(), matchups];
})
.spread((outcomes, stats) => {
	var matchups = stats.map((stat) => {
		if (!outcomes[stat.abv1]) return;
		var outcome = outcomes[stat.abv1][stat.abv2];
		if (outcome != undefined) {
			stat.outcome = outcome;
			return stat;
		}
	}).filter((matchup) => {return matchup});
	console.log(matchups);
});