// Populate selct object [select] with option values from array [options]
function populateDropdown(select, options) {
	for (var i = 0; i < options.length; i++) {
		var opt = options[i];
		var e = document.createElement("option");
		e.textContent = opt;
		e.value = opt;
		select.appendChild(e);
	}
}

// Populate dropdowns with data on window load
$.get(
	"/teams",
	{},
	function(data){
		populateDropdown(document.getElementById("team1"), data);
		populateDropdown(document.getElementById("team2"), data);
	}
);
$.get(
	"/seasons",
	{},
	function(data){
		populateDropdown(document.getElementById("train_season"), data);
		populateDropdown(document.getElementById("predict_season"), data);
	}
);

/*window.onload = function (){

	var options = Seasons.seasons;
	var teams = Teams.teams;
	console.log(options);
	populateDropdown(document.getElementById("train_season"), options);
	populateDropdown(document.getElementById("predict_season"), options);
	populateDropdown(document.getElementById("team1"), teams);
	populateDropdown(document.getElementById("team2"), teams);
};*/

function train() {
	var season = document.getElementById("train_season").value;
	//call Perceptron.train(season) and if successful enable the forecast button
	document.getElementById("forecast").disabled = false;
}

function readInput(){
	var team1 = document.getElementById("team1").value;
	var team2 = document.getElementById("team2").value;
 	// call perceptron to compute prediction
 	var winner = team1;
 	// display prediction
 	var div = document.getElementById('prediction');
	div.innerHTML = 'Predicted winer: ' + winner; 
}

