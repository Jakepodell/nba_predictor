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


function convert(callback) {
	var stream = fs.createReadStream(csvFileName).pipe(csvConverter);
	stream.on('finish', function(){
		var response = stream.finalResult;
		var converted = response.map(function(team) {
			return {team1: team['home'], team2: team['road'], outcome: parseFloat(team['hscore']) - parseFloat(team['rscore']) > 0};
		});
		callback(converted);
	});
}

convert(function(response) {
	console.log(response);
});
