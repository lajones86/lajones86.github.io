"use strict";

console.log(`Module awake: ${(new Error).fileName}`)
console.log("Halcyon TTRPG Engine Bootstrapper is online.")

import * as module_manager from "./engine_includes/module_manager.js";
import {_config} from "./config.js";

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
		console.log("HTE bootstrapper is attempting to hand off to module_manager.js");
		module_manager.from_bootstrapped_config(_config);
		console.log(new XMLSerializer().serializeToString(document));
		return(0);
	}
}