class Character {
	constructor() {
		this.attributes = {
			str: null,
			dex: null,
			con: null,
			int: null,
			wis: null,
			cha: null
		};
		this.xp = 0;
		this.level = 1;
		this.skill_proficiencies = new Set();
		this.weapon_proficiences = new Set();
		this.known_spells = {};
	}

	modifier(attr) {
		var score = this.attributes[attr];
		return Math.floor((score-10)/2);
	}

	get proficiency_bonus() {
		return 2 + this.level % 4;
	}


}