//commands for interacting with Discord

Command = require('../command');
Bot = require('../bot');

var commands = [];

commands.push(new Command.SilentCommand(
	'quit',
	'Make me log out on all servers.',
	function(a,message) {
		message.channel.sendMessage("OK, goodbye everyone! <3");
		console.log("Quitting by request of " + message.author.username);
		Bot.bot.destroy();
	})
)

commands.push(new Command.Command(
	'nickname ',
	"Change my nickname in this server.",
	function(nickname,message) {
		message.guild.member(Bot.bot.user).setNickname(nickname);
		return "OK, I'm changing my nickname to " + nickname;
	})
)

module.exports = {
	name: "Utility",
	commands: commands
};