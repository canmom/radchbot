//class definitions for user commands to the bot

class Command {
	constructor(command,description,operation) {
		this.command = command;
		this.description = description;
		this.operation = operation;
	}

	respond(message,content) {
		message.reply(content);
	}

	check(message) {
		if ((message.content+" ").startsWith('!'+this.command + " ")) {
			var args = message.content.slice(1+this.command.length);
			this.respond(message,this.operation(args,message));
		}
	}

	get help() {
		return "\t!"+this.command+":"+"\t"+this.description+"\n";
	}
}

//Command that posts in the whole channel without @'ing a particular user
class SayCommand extends Command {
	respond(message,content) {
		message.channel.sendMessage(content);
	}
}

//Command triggered by a substring anywhere in a message
class Trigger extends SayCommand {
	check(message) {
		if (message.content.includes('command')) {
			this.respond(message,this.operation());
		}
	}
}

//Command that does not automatically print reply (useful for e.g. quit command)
class SilentCommand extends Command {
	check(message) {
		if (message.content.startsWith('!'+this.command)) {
			var args = message.content.slice(1+this.command.length);
			this.operation(args,message);
		}
	}
}

module.exports = {
	Command: Command,
	SayCommand: SayCommand,
	Trigger: Trigger,
	SilentCommand: SilentCommand
};