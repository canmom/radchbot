const Command = require('./command.js');

//bot is in another file in order to allow it to be exposed to submodules
const Bot = require('./bot.js')

//Hide the token in a separate file, make sure it exposes 'token'!
const Token = require('./token.js');

//which submodules to load
var modules = ['utility','dice','songs','badgermodule','grim'];

//load submodules
modules = modules.map(function(moduleName) {
	moduleName = './modules/' + moduleName + '.js';
	return require(moduleName);
})

commands = [];

//global help command
commands.push(
	new Command.Command(
		'help',
		'List known commands.',
		function() {
			commandList = "I know the following commands:\n"
			commands.forEach(function(command) {
				commandList += command.help;
			})
			return commandList;
		}
	)
);

//Load commands from modules
function loadCommands(module) {
	Array.prototype.push.apply(commands,module.commands);
}

for (module of modules) {
	loadCommands(module);
	console.log("Loaded commands from module " + module.name);
}

Bot.bot.on('ready', () => {
  console.log('I am ready!');
});

// create an event listener for messages
Bot.bot.on('message', function(message) {
	commands.forEach(function(command) {
		command.check(message);
	})
});

// log our bot in
Bot.bot.login(Token.token);