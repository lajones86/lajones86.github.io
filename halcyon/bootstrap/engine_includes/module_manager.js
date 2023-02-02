"use strict";

console.log("module_manager.js is awake");

/* default module constructor
requires a module_name and a friendly_name
*/
class ManagedModule {
	constructor(raw_module) {
		for (let panel in raw_module) {
			if (!raw_module[panel].panel_name)
			{  console.log(raw_module);bad_message("module_manager.js failed to find panel_name in module. aborting module manager."); }
		}
		
		this.module_data = raw_module;
	};
}
export var managed_modules = [];

// import and push modules here

//FANTASY DRUID KIT
import * as druidity from "../modules/druidity.js";
managed_modules.push(new ManagedModule(druidity));




//public functions
export function bad_message(message_out) {
	console.log(message_out);
	alert(message_out);
	throw new Error(message_out);
}