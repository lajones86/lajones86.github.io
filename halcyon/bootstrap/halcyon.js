"use strict";

// make sure this is a module in the module manager
const entry_module_name = "char_stats";

import * as mm from "./module_manager.js";


export function bootstrap() {
	console.log("HTE bootstrapper started");
	
	/*	make the bootstrapper freak out and throw
	if it's trying to run
	and there's already stuff in the body
	*/
	if (((document.body.innerHTML).trim()) || ((document.body.innerHTML).trim())) {
		mm.bad_message("HTE bootstrapper does not currently support non-empty HTML bodies. Intended use is to add modules to module_manager.js and the modules folder. Aborting HTE bootstrap.")
	}
	
	// onward with the bootstrapping!
	else {
		console.log("HTE bootstrapper is attempting to load entry module")
		let bootstrap_data = mm.query(entry_module_name);
		console.log(bootstrap_data);
		return(`${bootstrap_data.friendly_name} loaded by bootstrapper`);
	}


	// Something's gone wrong if we trigger this block
	{
		let message_out = "HTE bootstrapper got nothing from entry module";
		console.log(message_out);
		return(message_out);
	}
}