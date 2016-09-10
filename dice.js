//roll a single die
function rollDie(size) {
  size = Math.floor(size);
  return Math.floor(Math.random() * size) + 1;
}

//roll multiple identical dice and sum the result
function rollDice(number,size,sign) {
	var rollsList = [];
	var sumSoFar = 0;
	for (var i = 0; i < number; i++) {
		var thisRoll = rollDie(size);
		rollsList.push(thisRoll);
		sumSoFar += thisRoll;
	}

	if (sign==="-") {sumSoFar = -sumSoFar}

	return {
		expr:sign+String(number)+"d"+String(size),
		rolls:rollsList,
		value:sumSoFar
	};
}

//process a string representing a DnD style group of dice
function processDiceGroup(diceExpression) {
	//case +#d#b#
	if (diceExpression.search(/[\+\-]\d+d\d+[bw]\d+/) === 0) {
		var diceArray = diceExpression.split(/([\+\-dbw])/);
		// now we have an array ['','+','X','d','Y','b'/'w','Z']
		var roll = rollDice(
			parseInt(diceArray[2],10),
			parseInt(diceArray[4],10),
			diceArray[1]
		);
		roll.expr += diceArray[5]+diceArray[6];
		nDiceToKeep = parseInt(diceArray[6]);
		if (nDiceToKeep >= roll.rolls.length) {
			return roll;
		}
		roll.rolls.sort(function(a,b) {
			return b-a;
		});
		if (diceArray[5] === 'b') {
			rollsToKeep = roll.rolls.slice(0,nDiceToKeep);
		}
		else {
			rollsToKeep = roll.rolls.slice(-nDiceToKeep);
		}
		roll.value = rollsToKeep.reduce(function(total,currentRoll) {
			return total+currentRoll;
		});
		return roll;
	}
	//case +#d#
	else if (diceExpression.search(/[\+\-]\d+d\d+/) === 0) {
		var diceArray = diceExpression.split(/([\+\-d])/);
		// now we have an array ['','+','X','d','Y']
		return rollDice(
			parseInt(diceArray[2],10),	//number of dice
			parseInt(diceArray[4],10),	//size of each die
			diceArray[1]				//sign of the group
		);
	}
	// case +#
	else if (diceExpression.search(/[\+\-]\d+/) === 0) {
		return {
			expr: diceExpression,
			rolls: [],
			value: parseInt(diceExpression)
		};
	}
}

//process a sum of different groups of dice
function processFullExpression(diceExpression) {
	diceExpression = diceExpression.replace(/ /g,'');

	if (diceExpression.indexOf(/[\+\-]/) !== 0) {
    	diceExpression = '+'+diceExpression
    }

    console.log(" roll becomes " + diceExpression);

	var diceGroups = diceExpression.match(/[\+\-]\d+d?\d*[bw]?\d*/g);
	
	return diceGroups.map(processDiceGroup);

}

var respond = function(message) {
	var diceExpression = message.content.slice(6);

    console.log("rolling " + diceExpression + " for " + message.author.username);
    
    var rolls = processFullExpression(diceExpression)

    var total = 0;
    rolls.forEach(function(roll) {
    	total += roll.value;
    });
	
	reply = "total: " + total.toString();

	rolls.forEach(function(roll) {
		reply += "\n   " + roll.expr + (roll.rolls.length !== 0 ? 
			":\t" + roll.value.toString() + 
			"\t(" + roll.rolls.toString() + ")" 
			: "");
	});

    return reply;

}

module.exports = {
	respond: respond
};