function readInput(){
	var homeTeam = document.getElementById("home_team");
	var awayTeam = document.getElementById("away_team");
 	// call perceptron to compute prediction
 	var winner = homeTeam.value;
 	// display prediction
 	var div = document.getElementById('prediction');
	div.innerHTML = 'Predicted winer: ' + winner; 
}