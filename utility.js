Command = require('./command');

//basic functions for interacting with Discord

var commands = [];

commands.push(new Command.Command(
	'nickname ',
	"Change my nickname in this server.",
	function(nickname,message) {
		message.guild.member(bot.user).setNickname(nickname);
		return "OK, I'm changing my nickname to " + nickname;
	})
)

module.exports = {
	commands: commands
};