"use strict";

console.log(`Module awake: ${(new Error).fileName}`)

class Summon {
	constructor(s) {
		this.summon_type = s.summon_type;
		this.min_level = s.min_level;
		this.subtypes = s.subtypes;
	};
	
	update_subtypes() {
		return(Object.keys(this.subtypes));
	};
}


let summon_types = {
	beast: {
		summon_type: "beast",
		min_level: 2,
		subtypes: {
			"land": {
				"hp": 30,
			},
			"air": {
				"hp": 20,
			},
			"water": {
				"hp": 30,
			}
		}
	},
	fey: {
		summon_type: "fey",
		min_level: 3,
		subtypes: {
		"fuming": {},
		"mirthful": {},
		"tricksy": {}
		}
	},
	elemental: {
		summon_type: "elemental",
		min_level: 4,
		subtypes: {
			"air": {},
			"earth": {},
			"fire": {},
			"water": {}
		},
	},
};

//summons panel helpers
const summons = [
	new Summon(summon_types["beast"]),
	new Summon(summon_types["fey"]),
	new Summon(summon_types["elemental"]),
	]

function get_summon() {
	let summon_type = document.getElementById("summons-summon_type");
	if (summon_type) { var summon_type_name = summon_type.value; }
	else { var summon_type_name = Object.keys(summon_types)[0]; }
	var summon = summons.filter(summon_instance => {
		return summon_instance.summon_type === summon_type_name });
	if (summon.length == 1) { summon = summon[0] };
	return(summon);
}


//druidity panel
export var panel0 = {
	_panel_name: "druidity",
	level: 6,
	casting_mod: 8,
	casting_save: 15,
};

//summons panel
export var panel20 = {
	_panel_name: "summons",
	summon_type: Object.keys(summon_types),
	subtype: get_summon().update_subtypes(),
};

/*onload functions
function summon_type_changed() {
	console.log("Summon type changed");
	let target = document.getElementById("summons-subtype");
	console.log(target.value = false);
	console.log("get the panel_janitor function going");
}

function documentLoaded() {
	document.getElementById("summons-summon_type").addEventListener("change", summon_type_changed);
}

window.addEventListener("load", documentLoaded);
*/