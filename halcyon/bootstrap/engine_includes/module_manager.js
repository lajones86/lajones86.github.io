"use strict";
console.log(`Module awake: ${(new Error).fileName}`)
import * as panels from "./panels.js";
import {ManagedModule} from "./ManagedModule.js";
var Gmodules = {};


//add modules here

//FANTASY DRUID KIT
import * as druidity from "../modules/druidity.js";
Gmodules["Druidity"] = new ManagedModule(druidity);



function janitor(x) {
	console.log(x);
}

//public functions
//do not eat
export function from_bootstrapped_config(config){
	for (let [module_name, module_data] of Object.entries(Gmodules)) {
		for (let mp of Object.entries(module_data.mod_panels)) {
			let new_display_panel = panels.build_panel(mp);
			module_data.display_panels[mp[0]] = new_display_panel;
		}
		
		//console.log(module_data.display_panels);
		for (let [k, v] of Object.entries(module_data.display_panels)) {
			let sb = ((v["event_listeners"])["select_boxes"]);
			
			for (let id in sb) {
				document.getElementById(sb[id]).addEventListener("change", function(){janitor(sb[id])});
			}				
		}
		
	}
}

export function bad_message(message_out) {
	console.log(message_out);
	alert(message_out);
	throw new Error(message_out);
}