var express = require("express");
var app = express();
var path = require("path");;
var Constants = require("./Constants.js");

app.use("/style.css", express.static(__dirname + '/style.css'));
app.use("/scripts.js", express.static(__dirname + '/scripts.js'));
"use strict";


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/teams', function(req, res) {
    res.send(Constants.teams);
});

app.get('/seasons', function(req, res) {
    res.send(Constants.seasons);
});

app.listen(3030, () => {
    console.log("listening on port 3030");
});