"use strict";

export var panel0 = {
  panel_name: "druidity",
  level: 6,
  casting_mod: 8,
  casting_save: 15,
  proficiency: 3,
}

export var panel1 = {
	panel_name: "beasts",
	beast_spell_level: [2, 3, 4, 5, 6, 7, 8, 9],
	beast_type: ["land", "air", "water"],
	
	ac: (this_panel) => {return(this_panel.beast_spell_level + 11);},
	
	hp: (this_panel) => {
		let sl = this_panel.beast_spell_level;
		let bt = this_panel.beast_type;
		let bonus_hp = (sl - 2) * 5;
		let default_hp = 0;
		if (bt == "air") { default_hp = 20; }
		else { default_hp = 30; }
		return(default_hp + bonus_hp);
	},
	
	speed: (this_panel) => {
		let bt = this_panel.beast_type;
		if (bt == "land") { return("30ft/30ft_climb"); }
		else if (bt == "air") { return("fly_60ft"); }
		else if (bt == "water") { return("swim_30ft"); }
		return(0);
	},
	
	attacks: (this_panel) => { return(Math.floor(this_panel.beast_spell_level/2)); },
	maul_hit: (druidity_panel) => {	return(druidity_panel.casting_mod); },
	
}

export const panel2 = {
	panel_name: "fey",
}