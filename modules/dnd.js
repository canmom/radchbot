//A module for representing DnD characters and calling for particular checks

Command = require("../command")
Bot = require("../bot")
Dice = require("./dice")

class Race {
	constructor(name,size,speed,weaponprofs,abilities) {
		this.name = name;
		
	}
}

class Character {
	constructor() {
		this.abilities = {
			str: null,
			dex: null,
			con: null,
			int: null,
			wis: null,
			cha: null
		};
		this.xp = 0;
		this.level = 1;
		this.race = null;
		this.class = null;
		this.background = null;
		this.equipment = [];
	}

	modifier(attr) {
		score = this.abilities[attr];
		return Math.floor((score-10)/2);
	}

	get proficiency() {
		return 2 + this.level % 4;
	}


}

