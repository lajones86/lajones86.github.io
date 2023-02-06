"use strict";

console.log(`Module awake: ${(new Error).fileName}`)

const framework_baseline_properties = ["_panel_name", "_event_listeners"];

function generate_id(panel_name, field_name) {
	return(`${panel_name}-${field_name}`);
}

function make_title_from_varname(varname) {
	//console.log(varname);
	if (varname.length == 2) { return(varname.toUpperCase()); }
	else {varname = varname.replaceAll("_", " ");return(varname.replaceAll(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); } )); }
}

class Panel {
	constructor(panel_data, target) {
		//set class members
		//console.log(panel_data);
		this._panel_name = panel_data._panel_name;
		this._event_listeners = panel_data._event_listeners;
		this.panel_name = this._panel_name;
		this.title = make_title_from_varname(this.panel_name);
		this.id = generate_id(this.panel_name, this.panel_name);
		this.action_id = generate_id(this.panel, "panelbutton");
		this.view_id = generate_id(this.panel_name, "viewbutton");
		this.panelwindow_id = generate_id(this.panel_name, "panelwindow");
		this.paneldata_id = generate_id(this.panel_name, "paneldata");
		this.select_boxes = [];
		
		//making the front end and back end play nice with this, i hope
		var class_root = this;
		
		// minimize maximize button function
		this.view_click = function() {
			if (this.innerText == "--") {
				(document.getElementById(class_root.panelwindow_id)).className = "minimized";
				this.innerText = "[]";
			}
			else if (this.innerText == "[]") {
				(document.getElementById(class_root.panelwindow_id)).className = "maximized";
				this.innerText = "--";
			}
			else {this.className = "button broken"};
		};
		
	
		//processing objects received from panels exported by modules
		//currently does a simple list to select box
		this.process_object = function(object_to_process, input_id) {
			//console.log(object_to_process);
			let html_string = `<select id="${input_id}">`;
			for (let entry in object_to_process) {
				let option_title = (make_title_from_varname((object_to_process[entry]).toString()));
				html_string += `<option value="${object_to_process[entry]}">${option_title}</options>`
			}
			html_string += "</select>";
			//console.log(html_string);
			return(html_string);
		}
		
		
		/*
		update the panel when a change has been registered
		*/
		this.update_panel = function(starting_field = undefined) {
			for (let sb in class_root.select_boxes) {
				let this_box = class_root.select_boxes[sb];
				if (starting_field){ if (this_box == starting_field) { starting_field = undefined; } }
				else {
					console.log(this_box);
				}
			}
		}
		
		//initial body load
		let html_string = `<div id=${this.id} class=module_box><div class=section_header><div id=${this.view_id} class="button blue">--</div><div class=section_title>${this.title}</div></div><div id=${this.panelwindow_id}><div id=${this.paneldata_id} class=panel_data>`;
		for (let [key, value] of Object.entries(panel_data)) {
			if (!framework_baseline_properties.includes(key)) {
				let input_id = `${this.panel_name}-${key}`;
											
				let value_type = typeof(value)
				
				if (value_type == "function") {
					let function_name = value.name.toString();
					value = panel_data[function_name](panel_data);
					value_type = typeof(value)
					if (value_type == "string" && value.length > 24) {value_type = "panel_quote"};
				};
				
				//add left side for 2-column entry
				if (value_type != "panel_quote") {
					let title = make_title_from_varname(key);
					html_string += (`<div>${title}</div>`);
				}
				
				if (["number", "string"].includes(value_type)) {
					html_string += `<input id="${input_id}" type="text" value=${value}>`;
				}

				//add right side for 2-column entry
				else if (value_type == "object") {
					html_string += this.process_object(value, input_id);
					panel_data[key] = value[0];
					this.select_boxes.push(input_id);
					//console.log(this.select_boxes);
				}
				
				else if (value_type == "panel_quote") {
					//html_string += "<div>foo</div><div>bar</div>";
					html_string += `<div class="grid_infopane">${value}</div>`;
				}
				
				//dunno what to do with this. here's what it is
				else { html_string += `<span>${value_type}</span>`; }
			}
		}
		html_string += "</div>";

		html_string += "</div></div>";
	
		target.insertAdjacentHTML('beforeend', html_string);
		
		document.getElementById(this.view_id).addEventListener("click", this.view_click);
		for (let sb in this.select_boxes) {
			let the_box = this.select_boxes[sb]
			//console.log(the_box);
			document.getElementById(the_box).addEventListener("change", function(){global_janitor(the_box)});
		}		
	}
}

var global_collection = {};

function global_janitor(changed_item) {
	let panel_base = changed_item.substring(0, changed_item.indexOf("-"));
	//let panel_field = changed_item.substring(changed_item.indexOf("-") + 1,);
	let starting_panel_object = Object.values(global_collection).filter(panel => panel._panel_name === panel_base)[0];
	
	starting_panel_object.update_panel(changed_item);
	
	let encountered_start = false;
	for (let pan in global_collection) {
		if (encountered_start){
			global_collection[pan].update_panel();
		}
		else {
			if (pan == panel_base) { encountered_start = true; }
		};
	}
}
	
	/*
	let starting_panel = `${panel_base}-${panel_base}`
	//console.log(`global janitor has awoken to deal with a change in ${starting_panel}`);
	
	//update the changed box, after the changed field
	//as well as all subsequent boxes
	let module_boxes = document.body.getElementsByClassName("module_box");
	let do_this_box = false;
	for (let mb in module_boxes) {
		let mb_id = module_boxes[mb].id;
		if (mb_id) {
			if (!do_this_box) {
				if (mb_id == starting_panel) {
					do_this_box = true;
					console.log("get the object and update panel from field");
					//console.log(module_boxes[mb]);
				}
			}
			else {console.log(`update panel ${mb_id}`)};
		};
	}
	//console.log(global_collection);
	//console.log(Object.values(global_collection));
	
	*/

function build_panel(panel_data, target) {
	var panel_out = new Panel(panel_data, target);
	return(panel_out);
}

function build_module(module, target) {
	for (let [key, panel_data] of Object.entries(module.module_data)) {
		let new_panel = build_panel(panel_data, target);
		global_collection[new_panel._panel_name] = new_panel;
	}
}

export function build_modules(modules, target) {
	console.log("panels.js received build_modules request");
	for (let m = 0; m < modules.length; m++){
		console.log(`attempting to build module ${m+1} of ${modules.length}`)
		build_module(modules[m], target);
	}
}