"use strict";

export const panel0 = {
  panel_name: "druidity",
  level: 6,
  casting_mod: 8,
  casting_save: 15,
}

export var panel1 = {
	panel_name: "beasts",
	beast_spell_level: [2, 3, 4, 5, 6, 7, 8, 9],
	beast_type: ["land", "air", "water"],
	
	speed: (this_panel) => {
		let bt = this_panel.beast_type;
		if (bt == "land") { return("30ft/30ft climb"); }
		else if (bt == "air") { return("fly 60ft"); }
		else if (bt == "water") { return("swim 30ft"); }
		else { return(`Sad:${bt}`); }
	}
}

export const panel2 = {
	panel_name: "fey",
}