"use strict";

/* default module constructor
requires a module_name and a friendly_name
*/
class ManagedModule {
	constructor(raw_module) {
		if ((!raw_module.module_name) || (!raw_module.friendly_name)){
			bad_message("module_manager.js encountered a missing module_name, friendly_name, or both. aborting module manager.");		
		}
		else { this.module_data = raw_module; }
	};
}
var managed_modules = [];

// import and push modules here
import {char_stats} from "./modules/char_stats.js";
managed_modules.push(new ManagedModule(char_stats));


// public bits
export function query(module_name){
	console.log(`requested ${module_name} from module_manager.js`);
	return((managed_modules.find(x => x.module_data.module_name === module_name)).module_data);
	bad_message("The query function in module_manager.js should not hit this statement");
}

export function bad_message(message_out) {
	console.log(message_out);
	alert(message_out);
	throw new Error(message_out);
}