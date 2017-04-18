var express = require('express');
var router = express.Router();
var request = require('request-promise');
var fs = require('fs');

var year = process.argv[2];

const NBA_API = "http://www.basketball-reference.com/leagues/";

const field_decoder = {
                        "team_name": "team_name",
                        "fg":"field_goals",
                        "fga": "field_goal_attempts",
                        "fg_pct": "field_goal_percent",
                        "fg3": "field_goal_3pt",
                        "fg3a": "field_goal_3pt_attempts",
                        "fg3_pct": "field_goal_3pt_percent",
                        "fg2": "field_goal_2pt",
                        "fg2a": "field_goal_2pt_attempts",
                        "fg2_pct": "field_goal_2pt_percent",
                        "ft": "free_throws",
                        "fta": "free_throw_attempts",
                        "ft_pct":"free_throw_percent",
                        "orb": "offensive_rebounds",
                        "drb": "defensive_rebounds",
                        "trb": "total_rebounds",
                        "ast": "asists",
                        "stl": "steals",
                        "blk": "blocks",
                        "tov": "turnovers",
                        "pf": "personal_fouls",
                        "pts": "points"
                    };

request(NBA_API + "NBA_" + year + ".html", {json: true})
            .then(function(res) {
                var top_section = res.split(/team-stats-per_game/)[4].split(/all_opponent-stats-per_game/)[0];
                var data = top_section.match(/(data-stat="(fg|fga|fg_pct|fg3|fg3a|fg3_pct|fg2|fg2a|fg2_pct|ft|fta|ft_pct|orb|drb|trb|ast|stl|blk|tov|pf|pts)*"\s>[0-9]*.?[0-9]*<\/td>)|data-stat="team_name"\s><a\shref="\/teams\/(\w)*\/[0-9]*.html">(\w|\s)*/g);
                var i = -1;
                var json_strings = [];
                data.forEach(function(point) {
                    var stat_split = point.split(/data-stat="/);
                    var stat = stat_split[1].split(/"/)[0];
                    var value_split = stat_split[1].split(/<|>/);
                    var value = stat !== "team_name" ? value_split[1] : value_split[value_split.length-1];
                    if (stat == "team_name") {
                        if(i >= 0) {
                            json_strings[i] += "}";
                        }
                        i++;
                        json_strings[i] = "{"
                    } else {
                        json_strings[i] += ",";
                    }
                    json_strings[i] = json_strings[i] + '"'+field_decoder[stat] + '":"'+value+'"';
                });
                json_strings[i]+="}";
                json_data = json_strings.map(function(string) {
                    return JSON.parse(string);
                })
                json_data.forEach(function(team) {
                    console.log("********************* "+team.team_name+" *********************");
                    console.log(team);
                })
            })
            
            .catch(function(err) {
                console.log(err);
            })
