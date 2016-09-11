class Race {
	constructor(name,size,speed,attributes,traits,weaponprofs,skillprofs,resistances) {
		this.name = name;
		this.size = size;
		this.speed = speed;
		this.attributes = attributes;
		this.traits = traits;
		this.weaponprofs = weaponprofs;
		this.skillprofs = skillprofs;
	}
}

races = {
	dwarf: new Race(
		"Dwarf",
		"medium",
		25,
		{con:2},
		["Darkvision","Tool Proficiency","Stonecunning"]
		["Battleaxe","Handaxe","Light Hammer","Warhammer"],
		[],
		["Poison"]),
	elf: new Race(
		"Elf",
		"medium",
		30,
		{dex:2},
		["Darkvision","Fey Ancestry","Trance"],
		[],
		["Perception"]),
	halfling: new Race(
		"Halfling",
		"small",
		25,
		{dex:2},
		["Lucky","Brave","Halfling Nimbleness"]),
	human: new Race(
		"Human",
		"medium",
		30,
		{
			str:1,
			dex:1,
			con:1,
			int:1,
			wis:1,
			cha:1
		},
		)
};