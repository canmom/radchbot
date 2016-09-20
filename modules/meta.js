//Commands which act on other commands

const Command = require("../command");
const Bot = require("../bot");

commands = [];

function repeat(args,message) {
	var iterations = parseInt(args.split(' ',1),10);
	var repeatedInstruction = args.slice(args.indexOf(' ')+1);
	var reply = `OK, I'm running '${repeatedInstruction}' ${iterations} times.\n`

	// if the user has written !command instead of just command, remove the !
	if (repeatedInstruction.startsWith('!')) {
		repeatedInstruction = repeatedInstruction.slice(1);
	}

	var repeatedCommand = false;

	//identify the command to be repeated
	for (command of Bot.commands) {
		if (repeatedInstruction.startsWith(command.command)) {
			repeatedCommand = command;
			break;
		}
	}

	//if a command has been identified, execute it N times and append the results to message
	if (repeatedCommand) {
		var repeatedCommandArgs = repeatedInstruction.slice(repeatedCommand.command.length);
		for (var i = 0; i<iterations; i++) {
			reply += ">" + repeatedInstruction + "\n";
			reply += repeatedCommand.operation(repeatedCommandArgs,message) + "\n";
		}
	}

	return reply;
}

commands.push(
	new Command.Command(
		"repeat ",
		"Repeat a command multiple times. Syntax: '!repeat <number> <command> <arguments>' e.g. '!repeat 6 roll 4d6b3'",
		repeat
	)
)

module.exports = {
	name: "Meta",
	commands: commands
}