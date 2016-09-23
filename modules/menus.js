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

	get optionsList() {
		return `**${[...this.options].join("**, **")}**`
	}

	abort() {
		this.reject();
	}
}

var pending = new Map();

var choice = function(selection,message) {
	for (user of pending.keys()) {
		menu = pending.get(user); 
		if (message.author === user && message.channel === menu.channel) {
			if(menu.testChoice(selection,message)) {
				pending.delete(user);
			}
			break;
		}
	}
}

//create a Promise that will resolve when the specified user presents a valid choice
var newMenu = function(message,options) {
	return new Promise(function(resolve,reject) {
		message.reply(`please !choose one of the following options: **${options.join("**, **")}**`);
		if (pending.has(message.author)) {
			pending.get(message.author).abort();
		}
		pending.set(message.author, new Menu(message.channel,options,resolve,reject));

	})
}

var checkPending = function() {
	var reply;
	if (pending.size !== 0) {
		reply = "I'm waiting for answers for the following..."
		pending.forEach(function(menu,user) {
			reply += `\n${user} needs to !choose between ${menu.optionsList} in channel ${menu.channel}!`
		})
	}
	else {
		reply = "I've got all the answers I need for now."
	}
	return reply;
}

module.exports = {
	name: "Menus",
	commands: [
		new Command.SilentCommand("choose","Pick an item on a menu that has been presented to you.",choice),
		new Command.SayCommand("pending","List currently open menu questions.",checkPending)
		],
	present: newMenu
}