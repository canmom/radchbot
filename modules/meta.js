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
		return reply;
	}
	else {
		return `I'm sorry, I don't recognise the command ${repeatedInstruction}, so I can't repeat it!`;
	}

	
}

function addCommand(args,message) {
	var newCommand = args.split(' ',1)[0];
	var newCommandMessage = args.slice(args.indexOf(' ')+1);

	var commandAlreadyExists = false;

	for (command of Bot.commands) {
		var commandCall = command.command;
		if (commandCall.endsWith(' ')) {
			commandCall = commandCall.slice(0,-1);
		}
		if (commandCall === newCommand) {
			commandAlreadyExists = true;
			break;
		}
	}

	if (commandAlreadyExists) {
		return `Sorry, but there's already a command called ${newCommand}! Try calling it something else.`;
	}
	else {
		Bot.commands.push(
			new Command.Command(
				newCommand,
				"Temporary command added by " + message.author,
				function () {
					return newCommandMessage;
				}
			)
		);

		return `OK, when someone says !${newCommand}, I will say '${newCommandMessage}'!`;
	}
}

function deleteCommand(args) {
	var protectedCommands = ['help','quit'];

	var commandToDelete = args.split(' ',1)[0];
	if (protectedCommands.includes(commandToDelete)) {
		return `Sorry, I can't delete ${commandToDelete} as it is a protected command.`
	}
	else {
		var ind = null;
		Bot.commands.forEach(function(command,commandInd) {
			commandCall = command.command;
			if (commandCall.endsWith(' ')) {
				commandCall = commandCall.slice(0,-1);
			}
			if (commandToDelete === commandCall) {
				ind = commandInd;
			}
		})

		if (ind === null) {
			return `Sorry, ${commandToDelete} does not seem to exist, so I can't delete it!`
		}
		else {
			Bot.commands.splice(ind,1);
			return `OK, I've forgotten the command ${commandToDelete}. Hope it wasn't important!`
		}
	}
}

commands.push(
	new Command.Command(
		"repeat",
		"Repeat a command multiple times. Syntax: '!repeat <number> <command> <arguments>' e.g. '!repeat 6 roll 4d6b3'",
		repeat
	)
)

commands.push(
	new Command.Command(
		"newcommand",
		"Add a simple, temporary command that returns a message when called. Syntax: !addcommand <command> <message>. Does not persist through bot shutdown!",
		addCommand
	)
)

commands.push(
	new Command.Command(
		"deletecommand",
		"Remove a command. Syntax: !deletecommand <command>. Does not persist through bot shutdown. Still, be careful!",
		deleteCommand
	)
)

module.exports = {
	name: "Meta",
	commands: commands
}