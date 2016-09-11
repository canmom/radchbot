class Race {
	constructor(name,size,speed,weaponprofs,abilities) {
		this.name = name;
		this.size = size;
		this.speed = speed;
		this.weaponprofs = weaponprofs;
		this.abilities = {
			str:0,
			dex:0,
			con:0,
			int:0,
			wis:0,
			cha:0
		};
		for (score in this.abilities) {
			this.abilities[score] += abilities[score];
		}

	}
}