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
		populateDropdown(document.getElementById("eval_season"), data);
		populateDropdown(document.getElementById("predict_season"), data);
	}
);

function forEachHelper(item) {
	var div = document.getElementById('weight_table');
	div.innerHTML += item + '<br>';
}

function train() {
	var season = document.getElementById("train_season").value;
	var div = document.getElementById('weights');
	div.className = 'loader';
	//call Perceptron.train(season) and if successful enable the forecast button
	$.post(
		"/train",
		{season},
		function(data){
			if (!data.error) {
				div.className = '';	
				var weight_table = document.getElementById('weight_table');
				weight_table.innerHTML = '<h3>Computed Weights</h3>';
				data.weights.forEach(forEachHelper);
				document.getElementById("forecast").disabled = false;
				document.getElementById("evaluate").disabled = false;
			} else {
				div.className = '';
				div.innerHTML = 'Error occurred. Please try retraining';
			}
		}
	);
}

function evalSeason() {
	var season = document.getElementById("eval_season").value;
	var div = document.getElementById('prediction');
	div.innerHTML = '';
	var spinner = document.getElementById('prediction_loader');
	spinner.className = 'loader';
	//call Perceptron.evaluate(season) and if successful enable the forecast button
	$.post(
		"/evaluate",
		{season},
		function(data){
			// display evaluation
			console.log(data);
 			spinner.className ='';
			div.innerHTML = 'Percent correct for ' + season + ' season: ' + data.percent_correct.toFixed(3); 
 		}
	);
}

function readInput(){
	var season = document.getElementById("predict_season").value;
	var team1 = document.getElementById("team1").value;
	var team2 = document.getElementById("team2").value;
	var div = document.getElementById('prediction');
	div.innerHTML = '';
	if (team1 == team2) {
		div.innerHTML = '<span style= "color:red;">Error: cannot predict when Team 1 and Team 2 are the same</span>';
	} else {
		var spinner = document.getElementById('prediction_loader');
		spinner.className = 'loader';
 		// call perceptron to compute prediction
 		$.post(
 			"/predict",
 			{season,team1,team2},
 			function(winner) {
 				// display prediction
 				console.log(winner);
 				spinner.className ='';
				div.innerHTML = 'Predicted winner: ' + winner.predicted_winner + "<br>" + 'Correct winner: ' + winner.correct_winner; 
 			}
 		);
 	}
}