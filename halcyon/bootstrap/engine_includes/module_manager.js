"use strict";

/* default module constructor
requires a module_name and a friendly_name
*/
class ManagedModule {
	constructor(raw_module) {
		if ((!raw_module.basepanel.module_name) || (!raw_module.basepanel.friendly_name)){
			bad_message("module_manager.js failed to find module_name, friendly_name, or both in valid basepanel object. aborting module manager.");		
		}
		else { this.module_data = raw_module; }
	};
}
var managed_modules = [];


// import and push modules here
import * as druidity from "../modules/druidity.js";
managed_modules.push(new ManagedModule(druidity));





//magic below here
let live_panels = [];


// public bits
export function query(module_name){
	//console.log(`requested ${module_name} from module_manager.js`);
	return((managed_modules.find(x => x.module_data.basepanel.module_name === module_name)).module_data);
}

export function bad_message(message_out) {
	console.log(message_out);
	alert(message_out);
	throw new Error(message_out);
}