var csv_converter = require("./csv_converter.js");

csv_converter.convert(function(response) {
	var records = [];
	response.forEach(function(m) {
		if(!records[m.team1]) {
			records[m.team1] = {};
		}
		if(!records[m.team1][m.team2]) {
			records[m.team1][m.team2] = 0;
		}
		records[m.team1][m.team2] += m.outcome;
	});

	records.sort(function(a,b) {
		return a > b
	});

	var keys = Object.keys(records);
	keys.sort();
	for(key in keys) {
		var record = records[keys[key]];
		var record_keys = Object.keys(record);
		for(record_key in record_keys) {
			if(record[record_keys[record_key]] == 0) {
				delete record[record_keys[record_key]];
			} else {
				record[record_keys[record_key]] = record[record_keys[record_key]] > 0 ? 1 : 0;
			}
		}
	}

	console.log(records);
});