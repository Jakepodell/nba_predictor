var express = require('express');
var router = express.Router();
var request = require('request-promise');
var fs = require('fs');

var year = process.argv[2];

const NBA_API = "http://www.basketball-reference.com/leagues/";

request(NBA_API + "NBA_" + year + ".html", {json: true})
            .then(function(res) {
                var top_section = res.split(/team-stats-per_game/)[4].split(/all_opponent-stats-per_game/)[0];
                var data = top_section.match(/(data-stat="(fg|fga|fg_pct|fg3|fg3a|fg3_pct|fg2|fg2a|fg2_pct|ft|fta|ft_pct|orb|drb|trb|ast|stl|blk|tov|pf|pts)*"\s>[0-9]*.?[0-9]*<\/td>)|data-stat="team_name"\s><a\shref="\/teams\/(\w)*\/[0-9]*.html">(\w|\s)*/g);
                for(var i = 0; i<data.length; i++) {
                    var stat_split = data[i].split(/data-stat="/);
                    var stat = stat_split[1].split(/"/)[0];
                    var value_split = stat_split[1].split(/<|>/);
                    var value = stat !== "team_name" ? value_split[1] : value_split[value_split.length-1];
                    console.log(JSON.parse('{"'+stat + '":"'+value+'"}'));
                }
            })
            
            .catch(function(err) {
                console.log(err);
            })
