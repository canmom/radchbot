//A simple way to request choices from a list from specific users

const Command = require('../command.js');
const Bot = require('../bot.js');

class Menu {
	constructor(channel,options,resultFunction) {
		this.channel = channel;
		this.options = Set([...options]);
		this.resultFunction = resultFunction;
	}

	testChoice(selection,message) {
		if (this.options.has(selection)) {
			this.resultFunction(selection);
			return true;
		}
		else {
			message.reply(`I didn't recognise ${selection.toString()} as an available choice. Try again?`)
			return false;
		}
	}
}

var pending = {};

choice = function(selection,message) {
	for (userid in pending) {
		menu = pending[userid]; 
		if (message.user.id === userid && message.channel === menu.channel) {
			if(menu.testChoice(selection)) {
				delete pending[userid];
			}
			break;
		}
	}
}

newMenu = function(userid,channel,options,resultFunction) {
	pending[userid] = new Menu(channel,options,resultFunction);
}

module.exports = {
	commands: [new Command.Command("choose ","Pick an item on a menu.",choice)],
	present: newMenu
}