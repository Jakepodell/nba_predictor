/** csv file
a,b,c
1,2,3
4,5,6
*/
const csvFileName='src/csvs/2015.csv'
var Converter = require("csvtojson").Converter;
var fs=require("fs"); 
var standardizer = require("./Standardize.js");

var csvConverter=new Converter({});

//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed",function(jsonObj){
    return (jsonObj); //here is your result json object
});


exports.convert = function(callback) {
	var stream = fs.createReadStream(csvFileName).pipe(csvConverter);
	stream.on('finish', function(){
		var response = stream.finalResult;
		var converted = response.map(function(team) {
			home = standardizer.standardize[team['home'].toLowerCase()];
			road = standardizer.standardize[team['road'].toLowerCase()];
			if(!(home && road))return null;
			team1 = home < road ? home : road;
			team2 = home > road ? home : road;
			score1 = home < road ? team['hscore'] : team['rscore'];
			score2 = home > road ? team['hscore'] : team['rscore'];
			return {team1: team1, team2: team2, outcome: (parseFloat(score1) - parseFloat(score2) > 0) ? 1 : -1 };
		}).filter((team) => {
			return team != null;
		});
		callback(converted);
	});
}

// exports.convert(function(response) {
// 	console.log(response);
// });

