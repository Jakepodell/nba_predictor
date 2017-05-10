var express = require("express")
var Teams = require("./Teams.js")
var app = express()
var path = require("path");

app.use("/style.css", express.static(__dirname + '/style.css'));
app.use("/scripts.js", express.static(__dirname + '/scripts.js'));


app.get('/', function(req, res) {
    "use strict";
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/teams', function(req, res) {
    "use strict";
    res.send(Teams.teams);
});

app.listen(3030, () => {
    "use strict";
    console.log("listening on port 3030");
})