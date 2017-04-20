/** csv file
a,b,c
1,2,3
4,5,6
*/
const csvFileName='src/csvs/2015.csv'
var Converter = require("csvtojson").Converter;
var fs=require("fs"); 

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
			team1 = team['home'] > team['road'] ? team['home'] : team['road'];
			team2 = team['home'] < team['road'] ? team['home'] : team['road'];
			score1 = team['home'] > team['road'] ? team['hscore'] : team['rscore'];
			score2 = team['home'] < team['road'] ? team['hscore'] : team['rscore'];
			return {team1: team1, team2: team2, outcome: (parseFloat(score1) - parseFloat(score2) > 0) ? 1 : -1 };
		});
		callback(converted);
	});
}

exports.convert(function(response) {
	console.log(response);
});

