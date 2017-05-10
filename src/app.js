var express = require("express");
var app = express();
var path = require("path");;
var Constants = require("./Constants.js");
var NeuralNet = require("./NeuralNet.js");

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
  //  console.log(req);
    var season = req.body.season;
    console.log(req.body);

    NeuralNet.train(season).then(data => {
        res.send(data);
    })
});

app.listen(3030, () => {
    console.log("listening on port 3030");
});