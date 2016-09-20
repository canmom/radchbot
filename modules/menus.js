//A simple way to request choices from a list from specific users

const Command = require('../command.js');

class Menu {
	constructor(channel,options,resolve,reject) {
		this.channel = channel;
		this.options = Set([...options]);
		this.resolove = resolve;
		this.reject = reject;
	}

	testChoice(selection,message) {
		if (this.options.has(selection)) {
			message.reply(`OK, you've chosen ${selection}.`)
			this.resolve(selection);
			return true;
		}
		else {
			message.reply(`I didn't recognise ${selection} as an available choice. Try again?`)
			return false;
		}
	}

	abort() {
		this.reject();
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

//create a Promise that will resolve when the specified user presents a valid choice
newMenu = function(message,options) {
	return new Promise(function(resolve,reject) {
		message.reply("please !choose one of the following options: " + options.toString());
		if (pending[message.user.id]) {
			pending[message.user.id].abort();
		}
		pending[message.user.id] = new Menu(message.channel,options,resolve,reject);

	})
}

module.exports = {
	commands: [new Command.Command("choose ","Pick an item on a menu.",choice)],
	present: newMenu
}