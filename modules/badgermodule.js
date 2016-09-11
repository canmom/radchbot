//template of a module for the bot, showing the basic structure

Command = require('../command');
Bot = require("../bot");
Dice = require("./dice");

var commands = [];

commands.push(
	new Command.Command(
		"daughter",
		"It seems.",
		function(arguments,message) {
			randomNumber = Math.floor(Math.random()*10);
			return "It seems you have asked about " + message.guild.member(Bot.bot.user).nickname +
			", Radchdome's chat client auto-responder. This is a program designed to imitate" + 
			" the already inimitably rad typing style, tone, cadence, personality, and substance" + 
			" of retort while various members are away from the computer. The algorithms are " +
			`guaranteed to be 9${randomNumber}` + "% indistinguishable from the crew's native" +
			" neurological responses, based on some statistical analysis I basically just pulled " +
			"out of my ass right now.";
		}
	)
)

module.exports = {
	name: "[Responder]",
	commands: commands
};