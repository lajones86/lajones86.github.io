"use strict";

const framework_baseline_properties = ["module_name", "friendly_name"]

// make sure this is a module in the module manager
const entry_module_name = "druidity";


import * as mm from "./module_manager.js";


function build_module_box(module_data) {
	//console.log({module_data});
	
	let tile_string = `<div class=module_box><div class=section_header><div class="button view">O</div><div class=section_title>${module_data.basepanel.friendly_name}</div></div><div class=panel_data>`;
	
	for (let [key, value] of Object.entries(module_data.basepanel)) {
		if(!framework_baseline_properties.includes(`${key}`)){
			//console.log(`${key}: ${value}`);
			tile_string += (`<div class=>${key}</div><div>${value}</div>`);
		}		
	}
	tile_string += "</div></div>";
	
	//console.log(tile_string);
	return(tile_string)
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
		let tile = build_module_box(mm.query(entry_module_name));
		//console.log(tile);
		return(tile);
	}


	// Something's gone wrong if we trigger this block
	{
		let message_out = "HTE bootstrapper got nothing from entry module";
		console.log(message_out);
		return(message_out);
	}
}