"use strict";
console.log(`Module awake: ${(new Error).fileName}`)
import * as panels from "./panels.js";
import {ManagedModule} from "./ManagedModule.js";
var Gmodules = {};


//add modules here

//FANTASY DRUID KIT
import * as druidity from "../modules/druidity.js";
Gmodules["Druidity"] = new ManagedModule(druidity);


//update the mod backend
//then the ui
function module_janitor(changed_field) {
	let section = changed_field.substring(0, changed_field.indexOf("-"));
	//we're only supporting a single panel for now
	let this_module = Object.values(Gmodules)[0];
	//this will need to be fixed to identify a module from many
	
	let mod_panels = this_module.mod_panels;
	let display_panels = this_module.display_panels;
	
	//info only flows down
	//no need to update earlier panels
	let encountered_panel = false;
	for (let prop in mod_panels) {
		if (mod_panels[prop]._panel_name == section) { encountered_panel = true; }
		if(encountered_panel) {
			/*
			prop is the module manager property name for both panel types
			it might need to be var or const someday
			console.log(prop);
			*/
			
			let backend_object = (mod_panels[prop]._panel_object);
			backend_object._update();
			
			let ui_object = display_panels[prop];
			ui_object.update(false, document.getElementById(changed_field));

		};
	}	
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
				document.getElementById(sb[id]).addEventListener("change", function(){module_janitor(sb[id])});
			}				
		}
		
	}
}

export function bad_message(message_out) {
	console.log(message_out);
	alert(message_out);
	throw new Error(message_out);
}