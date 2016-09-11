// Make the Discord bot object accessible to submodules

const Discord = require('discord.js');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

module.exports = {
	bot: bot
}