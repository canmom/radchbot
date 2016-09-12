//template of a module for the bot, showing the basic structure

Command = require('../command');
//uncomment this line if you need access to the bot object:
//Bot = require('../bot');

var commands = [];

//basic syntax for adding a new command
commands.push(
	new Command.Command(
		"grim",
		"Says what Grim is.",
		function(arguments,message) {
			return "Grim is wrong."
		}
	)
)

module.exports = {
	name: "grim",
	commands: commands
};