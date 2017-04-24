var Converter = require("csvtojson").Converter;
var fs=require("fs"); 
var standardizer = require("./Standardize.js");
var Promise = require('promise');

var csvConverter=new Converter({});

//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed",function(jsonObj){
    return (jsonObj); //here is your result json object
});

exports.convert = function(year) {
    return new Promise((resolve, reject) => {
        var stream = fs.createReadStream("../src/csvs/"+year+".csv").pipe(csvConverter);
        stream.on('finish', function() {
            var response = stream.finalResult;
            resolve(response.map((team) => {
                home = standardizer.standardize[team['home'].toLowerCase()];
                road = standardizer.standardize[team['road'].toLowerCase()];
                if (!(home && road))return null;
                team1 = home < road ? home : road;
                team2 = home > road ? home : road;
                score1 = home < road ? team['hscore'] : team['rscore'];
                score2 = home > road ? team['hscore'] : team['rscore'];
                return {team1: team1, team2: team2, outcome: parseFloat(score1) - parseFloat(score2) > 0 ? 1 : -1};
            }).filter((team)=>{return team}));
        });
    });
}

 // exports.convert.then((data) => {
 // 	console.log(data);
 // });
