"use strict";

console.log(`Module awake: ${(new Error).fileName}`)


//summon models

const data_obj = {
	moe: {
		hair: "bowl",
	},
	larry: {
		hair: "curly",
	},
	curly: {
		hair: "none",
	},
};

//summons panel

class SummonsPanel {
	constructor() {
		this._panel_display = {
			paneldata: Object.keys(data_obj),
		};
	};
}

export var panel0 = {
	_panel_name: "summons",
	_panel_object: new SummonsPanel(),
};