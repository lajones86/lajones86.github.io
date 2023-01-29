"use strict";

const framework_baseline_properties = ["module_name", "friendly_name"];

function generate_id(module_name, key_name, value) {
	return(module_name+key_name+value+Date.now());
}

export function build_panel(module_data) {
	
	let tile_string = `<div class=module_box><div class=section_header><div class="button view">O</div><div class=section_title>${module_data.basepanel.friendly_name}</div></div><div class=panel_data>`;
	
	for (let [key, value] of Object.entries(module_data.basepanel)) {
		if(!framework_baseline_properties.includes(`${key}`)){
			let input_id = generate_id(module_data.basepanel.module_name, key, value);
			tile_string += (`<div>${key}</div><input id="${input_id}" type="text" value=${value}>`);
		}
	}
	tile_string += "</div>";

	let input_id = generate_id(module_data.basepanel.module_name, "savebutton", "save");
	tile_string += `<div id="${input_id}" class="button tile_action">Save</div>`;
	
	tile_string += "</div>";
	
	return(tile_string)
}