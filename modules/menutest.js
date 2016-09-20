//Simple example menu for testing.

const Command = require('../command');
const Bot = require('../bot');
const Menus = require('./menus');

var presentMenu = function(a,message) {
	choice = "NO CHOICE MADE";
	Menu.present(message,["hugs","kisses","snuggles","licks"],function(selection) {choice = selection;});
	message.channel.sendMessage(`${message.guild.member(Bot.bot.user).nickname}`)
}