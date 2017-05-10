$.get(
    "/teams",
    {},
    function(data) {
        alert('page content: ' + data);
    }
);
function train() {
	var season = document.getElementById("train_season").value;
	document.getElementById("forecast").disabled = false;
}

function readInput(){
	var team1 = document.getElementById("team1");
	var team2 = document.getElementById("team2");
 	// call perceptron to compute prediction
 	var winner = team1.value;
 	// display prediction
 	var div = document.getElementById('prediction');
	div.innerHTML = 'Predicted winer: ' + winner; 
}

