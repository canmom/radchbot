const Command = require('./command.js');

//bot is in another file in order to allow it to be exposed to submodules
const Bot = require('./bot.js')

//Hide the token in a separate file, make sure it exposes 'token'!
const Token = require('./token.js');

//which submodules to load
var modules = require("./modules.js").modules;

//load submodules
modules = modules.map(function(moduleName) {
	moduleName = './modules/' + moduleName + '.js';
	return require(moduleName);
})

//Load commands from modules
function loadCommands(module) {
	Array.prototype.push.apply(Bot.commands,module.commands);
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
	Bot.commands.forEach(function(command) {
		command.check(message);
	})
});

// log our bot in
Bot.bot.login(Token.token);