var csv_converter = require("./csv_converter.js");

csv_converter.convert(function(response) {
	var records = [];
	var totalOutcomes = 0;
	response.forEach(function(m) {
		if(!records[m.team1]) {
			records[m.team1] = {};
		}
		if(!records[m.team1][m.team2]) {
			records[m.team1][m.team2] = 0;
		}
		records[m.team1][m.team2] += m.outcome;
		totalOutcomes += m.outcome;
	});

	console.log(totalOutcomes);
});