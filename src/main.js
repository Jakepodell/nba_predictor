var perceptron = require("./perceptron.js")
var rsc = require("./record_stat_combiner.js")
var p = perceptron();

predict().then(data => {
   console.log(data);
});

function predict() {
   return rsc.combine(process.argv[2]).then((data) => {
   	data.forEach((datum) => {
   		//console.log(datum);
   		p.train(datum.stat_diffs, datum.outcome);
   	});

   	 // practice makes perfect (we hope...)
   	for(var i = 0; i < 10000; i++) {
   		p.retrain();
           // console.log(p.weights);
       }

   	var correct = 0;
   	var incorrect = 0;
   	data.forEach((datum) => {
   		var outcome = datum.outcome;
   		var prediction = p.perceive(datum.stat_diffs);
   		if(outcome == prediction) correct++;
   		else incorrect ++;
   	});
   	// console.log(p.weights);

   	// console.log("predicted " + correct + " accurately, and " + incorrect + " inaccurately.");
   	return ("percent correct: "+ correct/(correct + incorrect));

   });
}


// console.log(p.perceive([1, 1])) // => 1
// p.perceive([0, 1]) // => 0
// p.perceive([1, 0]) // => 0
// p.perceive([0, 0]) // => 0

