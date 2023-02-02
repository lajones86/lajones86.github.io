"use strict";

console.log("Halcyon TTRPG Engine Bootstrapper is online.")

import * as mm from "./engine_includes/module_manager.js";
import * as panels from "./engine_includes/panels.js";

export function bootstrapper() {
	console.log("HTE bootstrapper started");
	
	/*	make the bootstrapper freak out and throw
	if it's trying to run
	and there's already stuff in the body
	*/
	if ((document.body.innerHTML).trim()) {
		mm.bad_message("HTE bootstrapper does not currently support non-empty HTML bodies. Intended use is to add modules to module_manager.js and the modules folder. Aborting HTE bootstrap.");
	}
	
	// onward with the bootstrapping! tallyho!
	else {
		console.log("HTE bootstrapper is attempting to load module_manager.js and panels.js");
		panels.build_modules(mm.managed_modules, document.body);
		console.log(document.body.innerHTML);
		return(0);
	}
}