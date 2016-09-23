//Simple example menu for testing.

const Command = require('../command');
const Bot = require('../bot');
const Menus = require('./menus');

lastOrders = new Map();

var presentMenu = function(a,message) {
	message.reply("what would you like?")
	Menus.present(message,["cake","scone","toast","doughnut","flapjack"]).then(
		function(choice) {
			message.reply(`great! Here is your ${choice}. I hope you enjoy it!`);
			lastOrders.set(message.author,choice);
		}
	);
}

var lastOrder = function(a,message) {
	if (lastOrders.has(message.author)) {
		return `the last thing you ordered was a ${lastOrders.get(message.author)}. Was it tasty?`;
	}
	else {
		return "it doesn't look like you've ordered anything from the café!"
	}
}

module.exports = {
	name: "Café",
	commands: [
		new Command.SilentCommand(
			"cafe",
			"Place an order at the café!",
			presentMenu
		),
		new Command.Command(
			"lastorder",
			"Check your last order from the café.",
			lastOrder
		)
	]
}