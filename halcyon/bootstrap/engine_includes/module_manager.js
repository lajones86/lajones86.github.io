"use strict";

/* default module constructor
requires a module_name and a friendly_name
*/
class ManagedModule {
	constructor(raw_module) {
		if (!raw_module.panel0.panel_name){
			bad_message("module_manager.js failed to find . aborting module manager.");		
		}
		else { this.module_data = raw_module; }
	};
}
export var managed_modules = [];


// import and push modules here
import * as druidity from "../modules/druidity.js";
managed_modules.push(new ManagedModule(druidity));

export function bad_message(message_out) {
	console.log(message_out);
	alert(message_out);
	throw new Error(message_out);
}