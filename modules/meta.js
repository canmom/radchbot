//Commands which act on other commands

const Command = require("../command");
const Bot = require("../bot");

commands = [];

function repeat(args,message) {
	var iterations = parseInt(args.split(' ',1),10);
	var repeatedInstruction = args.slice(args.indexOf(' ')+1);

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
		var reply = `OK, I'm running '${repeatedInstruction}' ${iterations} times.\n`
		var repeatedCommandArgs = repeatedInstruction.slice(repeatedCommand.command.length);
		for (var i = 0; i<iterations; i++) {
			reply += ">" + repeatedInstruction + "\n";
			reply += repeatedCommand.operation(repeatedCommandArgs,message) + "\n";
		}
	}

	return reply;
}

function addCommand(args,message) {
	var newCommand = args.split(' ',1);
	var newCommandMessage = args.slice(args.indexOf(' ')+1);

	var commandAlreadyExists = false;

	for (command of Bot.commands) {
		if (command.command.startsWith(newCommand)) {
			commandAlreadyExists = true;
		}
	};

	if (commandAlreadyExists) {
		return "Sorry, but there's already a command by that name! Try calling it something else.";
	}
	else {
		Bot.commands.push(
			new Command.Command(
				newCommand,
				"Temporary command added by " + message.guild.member(message.author),
				function () {
					return newCommandMessage;
				}
			)
		);

		return "OK, when someone says !" + newCommand + ", I will say '" + newCommandMessage + "'!";
	}
}

commands.push(
	new Command.Command(
		"repeat ",
		"Repeat a command multiple times. Syntax: '!repeat <number> <command> <arguments>' e.g. '!repeat 6 roll 4d6b3'",
		repeat
	)
)

commands.push(
	new Command.Command(
		"newcommand ",
		"Add a simple, temporary command that returns a message when called. Syntax: !addcommand <command> <message>. Does not persist through bot shutdown!",
		addCommand
	)
)

module.exports = {
	name: "Meta",
	commands: commands
}