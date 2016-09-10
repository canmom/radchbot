//output Imperial Radch songs

const Command = require('./command');

class Song extends SayCommand {
	constructor(command,title,verse,data) {
		this.command = command;
		this.description = title;
		if (typeof verse === 'function') {
			this.operation = verse;
		}
		else if (typeof verse === 'string') {
			this.operation = function() {
				return verse;
			}
		}
		this.data = data;
	}

	help() {
		//Don't let songs clutter up the command list
		return "";
	}

	describe() {
		return super.help();
	}
}

var songs = [];

function addSong(command,title,verse,data) {
	songs.push(new Song(command,title,verse,data));
}

addSong(
	'egg',
	'One Thousand Eggs',
	() => {
		verse = this.data.eggs.toString() + " eggs all nice and warm\n"+
			"Crack, crack, crack a little chick is born\n"+
			"Peep peep peep peep!\n"+
			"Peep peep peep peep!";
		this.data.eggs -= 1;
		if (this.data.eggs === 0) {
			verse.append("\n\nYou have hatched all the eggs! Bringing in another batch.");
			this.data.eggs = 1000;
		}
		return verse;
	},
	{
		eggs:1000
	}
);

addSong(
	'around',
	'My mother said it all goes around',
	() => {
		verse = ("My mother said it all goes around,\n" +
			"The " + this.data.list[this.data.index] + " goes round the " this.data.list[this.data.index+1] +"\n"+
			"It all goes around.")
		this.data.index += 1;
		if (this.data.index +1 === this.list.length) {
			this.data.index = 0;
		}
		return verse;
	},
	{
		list: ["ship", "station", "moon", "planet","sun","galaxy","supermassive black hole"],
		index: 0
	}
);

addSong(
	'aunt',
	'The Corpse Soldier',
	() => {
		verse = lines[index];
		this.data.index += 1;
		if (this.data.Index >= this.data.lines.length) {this.data.index = 0;}
		return verse;
	},
	{
		lines:["One, two, my aunt told me","Three, four, the corpse soldier","Five, six, it'll shoot you in the eye","Seven, eight, kill you dead","Nine, ten, break it apart and put it back together"],
		index: 0
	}
);

addSong(
	'fish',
	'My Heart is a Fish',
	"My heart is a fish\nHiding in the water-grass\nIn the green, in the green."
);

addSong(
	'weapons',
	'The person with weapons',
	"The person, the person, the person with weapons.\n"+
		"You should be afraid of the person with weapons. You should be afraid.\n"+
		"All around the cry goes out, put on armor made of iron.\n"+
		"The person, the person, the person with weapons.\n"+
		"You should be afraid of the person with weapons. You should be afraid."
);

addSong(
	'memory',
	'Memory is an event horizon',
	"Memory is an event horizon\nWhat's caught in it is gone but it's always there."
);

addSong(
	'memry',
	'Memory is an event horizon (misheard)',
	"Oh tree! Eat the fish!\nThis granite folds a peach!\nOh tree! Oh tree! Where's my ass?"
);

addSong(
	'death',
	"Death will overtake us",
	"Death will overtake us,\n"+
		"In whatever manner already fated\n"+
		"Everyone falls to it\n"+
		"And so long as I am ready\n"+
		"I don't fear it\n"+
		"No matter what form it takes."
);

addSong(
	'loved',
	"Who only loved once?\n"+
		'Who ever said "I will never love once"\n'+
		"And kept their word?"
);

addSong(
	'god',
	"Oh you, who live sheltered by God",
	"Oh you, who livs sheltered by God,\nWho live all your lives in her shadow."
);

addSong(
	'walking',
	'I was walking',
	"I was walking, I was walking\n"+
		"When I met my love\n"+
		"I was in the street walking\n"+
		"When I saw my true love\n"+
		'I said, "She is more beautiful than jewels, lovelier than jade or lapis, silver or gold."'
);

addSong(
	'battlefield',
	'Oh, have you gone to the battlefield?',
	"Oh, have you gone to the battlefield\n"+
		"Armored and well-armed?\n"+
		"And shall dreadful events\n"+
		"Force you to drop your weapons?"
);

addSong(
	'betrayer',
	'Betrayer',
	"Betrayer! Long ago we promised\n"+
		"To exchange equally, gift for gift\n"+
		"Take this curse: What you destroy will destroy you."
);

addSong(
	'jasmine',
	"Jasmine grew in my love's room",
	"Jasmine grew\n"+
		"In my love's room\n"+
		"It twined all around her bed\n"+
		"The daughters have fasted and shaved their heads\n"+
		"In a month they will visit the temple again\n"+
		"With roses and carmelias\n"+
		"But I will sustain myself\n"+
		"With nothing more than the perfume of jasmine flowers\n"+
		"Until the end of my life"
);

addSong(
	'soldier',
	'Here is the soldier',
	"Here is the soldier\n"+
		"So greedy, so hungry for songs.\n"+
		"So many she’s swallowed, they leak out,\n"+
		"They spill out of the corners of her mouth\n"+
		"And fly away, desperate for freedom."
);

addSong(
	'iamsoldier',
	'I am the soldier',
	"I am the soldier\n"+
		"So greedy, so hungry for songs.\n"+
		"So many I’ve swallowed, they leak out,\n"+
		"They spill out of the corners of my mouth\n"+
		"And fly away, desperate for freedom."
);

commands = Array(songs);

commands.push(new Command.Command('songs','List song commands.',
	function() {
		songs.forEach(function(song){
			song.describe()
		})
	}))

module.exports = {
	commands: commands;
}