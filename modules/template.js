//template of a module for the bot, showing the basic structure

Command = require('../command');

var commands = [];

commands.push(
	new Command.Command(
		"command",
		"description",
		function(arguments,message) {
			return "something"
		}
	)
)

module.exports = {
	name: "[module name here]",
	commands: commands
};