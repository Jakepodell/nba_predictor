var perceptron = require("./perceptron.js")
var rsc = require("./record_stat_combiner.js")
var p = perceptron();

rsc.combine(process.argv[2]).then((data) => {
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
		// console.log(outcome);
		// console.log(prediction);
		// console.log();
		if(outcome == prediction) correct++;
		else incorrect ++;
	});
	console.log(p.weights);

	console.log("predicted " + correct + " accurately, and " + incorrect + " inaccurately.");
	console.log("percent correct: "+ correct/(correct + incorrect));

   // var uta = [ 36.1,
   //      80.4,
   //      0.449,
   //      8.5,
   //      23.9,
   //      0.355,
   //      27.6,
   //      56.5,
   //      0.488,
   //      17.1,
   //      23,
   //      0.744,
   //      10.7,
   //      32.5,
   //      43.2,
   //      19,
   //      7.7,
   //      5.2,
   //      14.9,
   //      20.2,
   //      97.7 ];
   //
   // var lac = [ 38.3,
   //     82.4,
   //     0.465,
   //     9.7,
   //     26.7,
   //     0.364,
   //     28.6,
   //     55.7,
   //     0.513,
   //     18.2,
   //     26.2,
   //     0.692,
   //     8.8,
   //     33.3,
   //     42,
   //     22.8,
   //     8.6,
   //     5.6,
   //     13,
   //     21.3,
   //     104.5 ];
   //
   // var utalac = [];
   // for(var i =0; i<uta.length; i++) {
   //     utalac.push(uta[i]-lac[i]);
   // }
   // console.log(p.perceive(utalac));



});


// console.log(p.perceive([1, 1])) // => 1
// p.perceive([0, 1]) // => 0
// p.perceive([1, 0]) // => 0
// p.perceive([0, 0]) // => 0

