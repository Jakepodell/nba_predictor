var express = require("express");
var app = express();
var path = require("path");;
var Constants = require("./Constants.js");
var NeuralNet = require("./NeuralNet.js");
var mrc = require("./matchup_record_converter.js");
var standardizer = require("./Standardize.js");

app.use("/style.css", express.static(__dirname + '/style.css'));
app.use("/scripts.js", express.static(__dirname + '/scripts.js'));
"use strict";

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/teams', function(req, res) {
    res.send(Constants.teams);
});

app.get('/seasons', function(req, res) {
    res.send(Constants.seasons);
});

app.post('/train', function(req, res) {
    var season = req.body.season;
    NeuralNet.train(season).then(data => {
        res.send(data);
    })
});

app.post('/predict', function(req, res) {
    console.log("predicting");
    var team1 = standardizer.standardize[req.body.team1.toLowerCase()];
    var team2 = standardizer.standardize[req.body.team2.toLowerCase()];
    var season = req.body.season;
    NeuralNet.predict(season, team1, team2).then(prediction => {
        return mrc.convert(season).then(data => {
            var correct_winner = data[team1][team2] ? req.body.team1 : req.body.team2;
            var predicted_winner = prediction.winner_index ? req.body.team1 : req.body.team2;
            return ({
                correct_winner: correct_winner,
                predicted_winner: predicted_winner,
                message: "the perceptron prediction was " + (correct_winner === predicted_winner ? "accurate" : "inaccurate")
            });
        })
    }).then(data => {
        res.send(data);
    });
});

app.post('/evaluate', (req, res) => {
   NeuralNet.evaluate(req.body.season).then(results => {
       res.send(results);
   }) ;
});

// app.post('/check', function(req, res) {
//     console.log("checking");
//     var team1 = standardizer.standardize[req.body.team1.toLowerCase()];
//     var team2 = standardizer.standardize[req.body.team2.toLowerCase()];
//     var prediction = standardizer.standardize[req.body.prediction.toLowerCase()];
//     var season = req.body.season;
//     mrc.convert(season).then(data => {
//         var correct_winner = data[team1][team2] ? team1 : team2;
//         res.json({correct_winner: correct_winner,
//             predicted_winner: prediction,
//             message: "the perceptron prediction was " + (correct_winner === prediction.result ? "accurate" : "inaccurate")});
//     });
// });

app.listen(3030, () => {
    console.log("listening on port 3030");
});