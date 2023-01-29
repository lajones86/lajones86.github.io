"use strict";

const framework_baseline_properties = ["module_name", "friendly_name"]

// make sure this is a module in the module manager
const entry_module_name = "druidity";

import * as mm from "./module_manager.js";


function generate_id(module_name, key_name, value) {
	return(module_name+key_name+value+Date.now());
}


function build_module_box(module_data) {
	console.log({module_data});
	
	let tile_string = `<div class=module_box><div class=section_header><div class="button view">O</div><div class=section_title>${module_data.basepanel.friendly_name}</div></div><div class=panel_data>`;
	
	for (let [key, value] of Object.entries(module_data.basepanel)) {
		if(!framework_baseline_properties.includes(`${key}`)){
			console.log(`${key}: ${value}`);
			let input_id = generate_id(module_data.basepanel.module_name, key, value);
			tile_string += (`<div>${key}</div><input id="${input_id}" type="text" value=${value}>`);
		}
	}
	tile_string += "</div>";

	let input_id = generate_id(module_data.basepanel.module_name, "savebutton", "save");
	tile_string += `<div id="${input_id}" class="button tile_action">Save</div>`;
	
	tile_string += "</div>";
	
	console.log(tile_string);
	return(tile_string)
}


export function update_panel() { console.log("update what now?"); }


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
		update_panel();
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