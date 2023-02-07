"use strict";

console.log(`Module awake: ${(new Error).fileName}`)


//druidity panel
class StatsPanel {
	constructor(){
		this._panel_display = stats_defaults;
	}
}
var stats_defaults = {
		level: 6,
		casting_mod: 8,
		casting_save: 15,
}
export var panel0 = {
	_panel_name: "stats",
	_panel_object: new StatsPanel(),
};


//summons panel
class Summon {
	constructor(s) {
		this.min_level = s.min_level;
		this.subtypes = s.subtypes;
	};
}
//summon models
const summon_models = {
	beast: {
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
		min_level: 3,
		subtypes: {
		"fuming": {},
		"mirthful": {},
		"tricksy": {}
		}
	},
	elemental: {
		min_level: 4,
		subtypes: {
			"air": {},
			"earth": {},
			"fire": {},
			"water": {}
		},
	},
};

//summons panel
class SummonsPanel {
	constructor() {
		
		var class_root = this;

		this.summons_objects = {};
		for (let k of Object.keys(summon_models)){
			this.summons_objects[k] = new Summon(summon_models[k]);
		}
		
		
		this.get_current_summon = function() {
			let current_summon_field = document.getElementById("summons-summon_type");
			if (!current_summon_field) { return(this.summons_objects[Object.keys(this.summons_objects)[0]]) }
			else { return(this.summons_objects[current_summon_field.value]) };
		};
		

		this._update = function() {
			console.log("druidity.js _update called");
			let panel_display = {};
			//summon_type
			panel_display["summon_type"] = Object.keys(summon_models);
			
			let current_summon = class_root.get_current_summon();
			//console.log(current_summon);
			
			//subtype
			panel_display["subtype"] = Object.keys(current_summon.subtypes);
			
			
			//replace _panel_display object
			
			class_root._panel_display = panel_display;
			//console.log(panel_display);
			//return(class_root);
		};
		
		

		//call the update function to build the _panel_display
		this._update();
	};
}

export let panel20 = {
	_panel_name: "summons",
	_panel_object: new SummonsPanel(),
};



/*
//totems panel
export var panel40 = {
	_panel_name: "totems",
	totem_type: [1, 2, 3],
};
*/