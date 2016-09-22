//A simple way to request choices from a list from specific users

const Command = require('../command.js');

class Menu {
	constructor(channel,options,resolve,reject) {
		this.channel = channel;
		this.options = new Set([...options]);
		this.resolve = resolve;
		this.reject = reject;
	}

	testChoice(selection,message) {
		if (this.options.has(selection)) {
			//message.reply(`OK, you've chosen ${selection}.`)
			this.resolve(selection);
			return true;
		}
		else {
			message.reply(`I didn't recognise **${selection}** as an available choice. Try again?`)
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
		if (message.author.id === userid && message.channel === menu.channel) {
			if(menu.testChoice(selection,message)) {
				delete pending[userid];
			}
			break;
		}
	}
}

//create a Promise that will resolve when the specified user presents a valid choice
newMenu = function(message,options) {
	return new Promise(function(resolve,reject) {
		message.reply(`please !choose one of the following options: **${options.join("**, **")}**`);
		if (pending[message.author.id]) {
			pending[message.author.id].abort();
		}
		pending[message.author.id] = new Menu(message.channel,options,resolve,reject);

	})
}

module.exports = {
	name: "Menus",
	commands: [new Command.SilentCommand("choose","Pick an item on a menu that has been presented to you.",choice)],
	present: newMenu
}