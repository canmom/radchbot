Command = require('./command');

//basic functions for interacting with Discord

var commands = [];

commands.push(new Command.Command(
	'nickname ',
	"Change the bot's nickname in this server.",
	function(nickname,message) {
		message.guild.member(bot.user).setNickname(nickname);
		return "OK, I'm changing my nickname to " + nickname;
	})
)

commands.push(new Command.SilentCommand(
	'quit',
	'Make the bot log out on all servers.',
	function(a,message) {
		message.channel.sendMessage("OK, goodbye everyone! <3");
		console.log("Quitting by request of " + message.author.username);
		bot.destroy();
	})
)

module.exports = {
	commands: commands
};