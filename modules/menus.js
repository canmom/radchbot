//A simple way to request choices from a list from specific users

Command = require('../command.js');
Bot = require('../bot.js');

class Menu {
	constructor(channel,options,resultFunction) {
		this.channel = channel;
		this.options = Set([...options]);
		this.resultFunction = resultFunction;
	}

	testChoice(selection) {
		if (this.options.has(selection)) {
			this.resultFunction(selection);
		}
	}
}

pending = {};

choice = function(selection,message) {
	for (user in pending) {
		menu = pending[user]; 
		if (message.user === user && message.channel === menu.channel) {
			menu.testChoice(selection);
			break;
		}
	}
}

newMenu = function(user,channel,options,resultFunction) {
	pending[user] = new Menu(channel,options,resultFunction);
}

module.exports = {
	commands: [new Command.Command("choose ","Pick an item on a menu.",choice)],
	present: newMenu
}