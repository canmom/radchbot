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
	}

	modifier(attr) {
		score = this.attributes[attr];
		return Math.floor((score-10)/2);
	}

	get proficiency() {
		return 2 + this.level % 4;
	}


}