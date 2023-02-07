"use strict";
console.log(`Module awake: ${(new Error).fileName}`)

export class ManagedModule {
	constructor(mod_panels) {
		this.mod_panels = {};
		for (let [p_id, p_data] of Object.entries(mod_panels)) {
			this.mod_panels[p_id] = p_data;
		}
		
		this.display_panels = {};
	};
}