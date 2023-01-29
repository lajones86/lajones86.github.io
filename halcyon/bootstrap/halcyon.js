"use strict";

// make sure this is a module in the module manager
const entry_module_name = "druidity";

import * as mm from "./engine_includes/module_manager.js";
import * as panels from "./engine_includes/panels.js";

function update_panel() {
	console.log("update what now?");
}


export function bootstrap() {
	console.log("HTE bootstrapper started");
	
	/*	make the bootstrapper freak out and throw
	if it's trying to run
	and there's already stuff in the body
	*/
	if ((document.body.innerHTML).trim()) {
		mm.bad_message("HTE bootstrapper does not currently support non-empty HTML bodies. Intended use is to add modules to module_manager.js and the modules folder. Aborting HTE bootstrap.");
	}
	
	// onward with the bootstrapping!
	else {
		console.log("HTE bootstrapper is attempting to load entry module");
		let tile = panels.build_panel(mm.query(entry_module_name));
		//update_panel();
		return(tile);
	}


	// Something's gone wrong if we trigger this block
	{
		let message_out = "HTE bootstrapper got nothing from entry module";
		console.log(message_out);
		return(message_out);
	}
}