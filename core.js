// import the discord.js module
const Discord = require('discord.js');
const Dice = require('./dice');
//const Songs = require('./songs');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

// the token of your bot
const token = 'MjIwNzcyMTE0NzE2Njg4Mzg0.CqlKCg.OQVdLHHSMhTGmEFAE4qk91jRMcY';



var songs = {eggs : 1000, aroundIndex : 0, aroundSet : ["ship", "station", "moon", "planet","sun","galaxy","supermassive black hole"], auntIndex: 0}


commands = [];




bot.on('ready', () => {
  console.log('I am ready!');
});

// create an event listener for messages
bot.on('message', function(message) {
	if (message.content.indexOf('!roll ') === 0) {
	    message.reply(Dice.respond(message));
	}
	else if (message.content.toLowerCase().indexOf('anaander') !== -1 && message.author != bot.user) {
		message.channel.sendMessage("ALL HAIL ANAANDER MIANAAI, OVERLORD OF THE RADCH!");
	}
	else if(message.content.indexOf('!nickname ') === 0) {
		nickname = message.content.slice(10);
		message.reply("OK, I'm changing my nickname to " + nickname);
		message.guild.member(bot.user).setNickname(nickname);
	}
	else if(message.content.indexOf('!egg') === 0) {
		message.channel.sendMessage(songs.eggs.toString() + " eggs all nice and warm\n"+
			"Crack, crack, crack a little chick is born\n"+
			"Peep peep peep peep!\n"+
			"Peep peep peep peep!");
		songs.eggs -= 1;
		if (songs.eggs === 0) {
			message.reply("You have hatched the last egg! Bringing in another batch.");
			songs.eggs = 1000;
		}
	}
	else if (message.content.indexOf('!around') === 0) {
		message.channel.sendMessage("My mother said it all goes around,\n" +
			"The " + songs.aroundSet[songs.aroundIndex] + " goes round the " + songs.aroundSet[songs.aroundIndex+1] + 
			"\nIt all goes around.");
		songs.aroundIndex += 1;
		if (songs.aroundIndex + 1 === songs.aroundSet.length) {
			songs.aroundIndex = 0;
		}
	}
	else if (message.content.indexOf('!aunt') === 0) {
		lines = ["One, two, my aunt told me","Three, four, the corpse soldier","Five, six, it'll shoot you in the eye","Seven, eight, kill you dead","Nine, ten, break it apart and put it back together"];

		message.channel.sendMessage(lines[songs.auntIndex]);

		songs.auntIndex += 1;
		if (songs.auntIndex >= lines.length) {songs.auntIndex = 0;}
	}
	else if (message.content.indexOf('!fish') === 0) {
		message.channel.sendMessage("My heart is a fish\nHiding in the water-grass\nIn the green, in the green.");
	}
	else if (message.content.indexOf('!weapons') === 0) {
		message.channel.sendMessage("The person, the person, the person with weapons.\n"+
			"You should be afraid of the person with weapons. You should be afraid.\n"+
			"All around the cry goes out, put on armor made of iron.\n"+
			"The person, the person, the person with weapons.\n"+
			"You should be afraid of the person with weapons. You should be afraid.");
	}
	else if (message.content.indexOf('!memory') === 0) {
		message.channel.sendMessage("Memory is an event horizon\nWhat's caught in it is gone but it's always there.");
	}
	else if (message.content.indexOf('!memry') === 0) {
		message.channel.sendMessage("Oh tree! Eat the fish!\nThis granite folds a peach!\nOh tree! Oh tree! Where's my ass?");
	}
	else if (message.content.indexOf('!death') === 0) {
		message.channel.sendMessage( "Death will overtake us,\n"+
			"In whatever manner already fated\n"+
			"Everyone falls to it\n"+
			"And so long as I am ready\n"+
			"I don't fear it\n"+
			"No matter what form it takes.");
	}
	else if (message.content.indexOf('!loved') === 0) {
		message.channel.sendMessage( "Who only loved once?\n"+
			'Who ever said "I will never love once"\n'+
			"And kept their word?");	
	}
	else if (message.content.indexOf('!god') === 0) {
		message.channel.sendMessage( "Oh you, who live sheltered by God,\n"+
			"Who live all your lives in her shadow.");
	}
	else if (message.content.indexOf('!walking')===0) {
		message.channel.sendMessage( "I was walking, I was walking\n"+
			"When I met my love\n"+
			"I was in the street walking\n"+
			"When I saw my true love\n"+
			'I said, "She is more beautiful than jewels, lovelier than jade or lapis, silver or gold."');
	}
	else if (message.content.indexOf('!battlefield')===0) {
		message.channel.sendMessage( "Oh, have you gone to the battlefield\n"+
			"Armored and well-armed?\n"+
			"And shall dreadful events\n"+
			"Force you to drop your weapons?");
	}
	else if (message.content.indexOf('!betrayer') === 0) {
		message.channel.sendMessage("Betrayer! Long ago we promised\n"+
			"To exchange equally, gift for gift\n"+
			"Take this curse: What you destroy will destroy you.");
	}
	else if (message.content.indexOf('!jasmine') === 0) {
		message.channel.sendMessage("Jasmine grew\n"+
			"In my love's room\n"+
			"It twined all around her bed\n"+
			"The daughters have fasted and shaved their heads\n"+
			"In a month they will visit the temple again\n"+
			"With roses and carmelias\n"+
			"But I will sustain myself\n"+
			"With nothing more than the perfume of jasmine flowers\n"+
			"Until the end of my life");
	}
	else if (message.content.indexOf('!soldier') === 0) {
		message.channel.sendMessage("Here is the soldier\n"+
			"So greedy, so hungry for songs.\n"+
			"So many she’s swallowed, they leak out,\n"+
			"They spill out of the corners of her mouth\n"+
			"And fly away, desperate for freedom.");
	}
	else if (message.content.indexOf('!iamsoldier') === 0) {
		message.channel.sendMessage("I am the soldier\n"+
			"So greedy, so hungry for songs.\n"+
			"So many I’ve swallowed, they leak out,\n"+
			"They spill out of the corners of my mouth\n"+
			"And fly away, desperate for freedom.")
	}
	else if (message.content.indexOf('!songs') === 0) {
		message.reply( "I know the following songs:\n"+
			"!egg\t\tA thousand eggs\n"+
			"!around\t\tIt all goes around\n"+
			"!aunt\t\tOne, two, my aunt told me (the corpse soldier)\n"+
			"!fish\t\tMy heart is a fish\n"+
			"!weapons\t\tThe person with weapons\n"+
			"!memory\t\tMemory is an event horizon\n"+
			"!memry\t\tMemory is an event horizon (misheard in Radchaai)\n"+
			"!death\t\tDeath will overtake us\n"+
			"!loved\t\tWho only loved once?\n"+
			"!god\t\tOh you, who live sheltered by God\n"+
			"!walking\t\tI was walking\n"+
			"!battlefield\t\tOh, have you gone to the battlefield\n"+
			"!betrayer\t\tBetrayer! Long ago...\n"+
			"!jasmine\t\tJasmine grew\n"+
			"!soldier\t\tHere is the soldier\n"+
			"!iamsoldier\t\tI am the soldier [Breq's reply]");
	}
	else if (message.content.indexOf('!quit') === 0) {
		message.channel.sendMessage("OK, goodbye everyone! <3");
		console.log("Quitting by request of " + message.author.username);
		bot.destroy();
	}
});

// log our bot in
bot.login(token);