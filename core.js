// import the discord.js module
const Discord = require('discord.js');
const Command = require('./command');
const Utility = require('./utility');
const Dice = require('./dice');
const Songs = require('./songs');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

// the token of your bot
const token = 'MjIwNzcyMTE0NzE2Njg4Mzg0.CqlKCg.OQVdLHHSMhTGmEFAE4qk91jRMcY';

commands = [];

//The two absolutely vital commands
commands.push(new Command.Command(
	'help',
	'List known commands.',
	function() {
		commandList = "Known commands:\n"
		commands.forEach(function(command) {
			commandList += command.help;
		})
		return commandList;
	}));

commands.push(new Command.SilentCommand(
	'quit',
	'Make the bot log out on all servers.',
	function(a,message) {
		message.channel.sendMessage("OK, goodbye everyone! <3");
		console.log("Quitting by request of " + message.author.username);
		bot.destroy();
	})
)

//Load commands from modules
function loadCommands(module) {
	Array.prototype.push.apply(commands(module.commands))
}

loadCommands(Utility);
loadCommands(Dice);
loadCommands(Songs);


bot.on('ready', () => {
  console.log('I am ready!');
});

// create an event listener for messages
bot.on('message', function(message) {
	commands.forEach(function(command) {
		command.check(message);
	})
});

// log our bot in
bot.login(token);