"use strict";

console.log("Module druidity.js is awake");

const summons = {
	get_type_info: (summon_type, stat) => {
		if (summon_type == "beast")	{
			if (stat == "level") { return([2, 3, 4, 5, 6, 7, 8, 9]) }
			if (stat == "subtype") { return([2, 3, 4, 5, 6, 7, 8, 9]) }
			else {return(`unknown:${stat}`)}
		}
		else if (summon_type == "fey") {
			if (stat == "level") { return([3, 4, 5, 6, 7, 8, 9]) }
			else {return(`unknown:${stat}`)}
		}
		else if (summon_type == "elemental") {
			if (stat == "level") { return([4, 5, 6, 7, 8, 9]) }
			else {return(`unknown:${stat}`)}
		}
		else {return(`unknown:${summon_type}`)}		
	},
}


//stuff for the panel manager
export var panel0 = {
  panel_name: "druidity",
  level: 6,
  casting_mod: 8,
  casting_save: 15,
  proficiency: 3,
}

export var panel05 = {
	panel_name: "totems",
	totem_type: ["unicorn", "bear", "hawk"],
}

export var panel20 = {
	panel_name: "summons",
	summon_type: ["beast", "fey", "elemental"],
	spell_level: (this_panel) => summons.get_type_info(this_panel.summon_type, "level"),
}

export var panel30 = {
	panel_name: "wild_shape",
}
	//summon_ac: (this_panel) => summons.ac(this_panel.summon_type),

//	summon_level: ,
	
	
	/*
	summon_subtype: (this_panel) => {
		let sT = this_panel.summon_type;
		let sL = this_panel.summon_level;
		
		if (sT == "beast") 
		else { return(`Bad:${sT}`); }
			
	},*/
	
	//summon_subtype: 
	/*
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
	maul_hit: (panels) => { return(me.panel0.casting_mod); },
	*/