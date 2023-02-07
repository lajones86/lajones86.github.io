"use strict";

console.log(`Module awake: ${(new Error).fileName}`)

import {bad_message} from "../engine_includes/module_manager.js";

const framework_var_properties = ["_panel_name", "_panel_object"];
const panel_object_properties = ["_panel_display"];

function make_title_from_varname(varname) {
	if (varname.length == 2) { return(varname.toUpperCase()); }
	else {varname = varname.replaceAll("_", " ");return(varname.replaceAll(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); } )); }
}

class Panel {
	constructor(p) {
		var class_root = this;
		
		this._id = p._panel_name;
		
		this.title = make_title_from_varname(this._id);
		this.view_id = `${this._id}-view`;
		this.paneldata_id = `${this._id}-paneldata`;
		this.event_listeners = {
			select_boxes: [],
		}
		
		this.track_field = function(f_id, f_type) {
			if (f_type == "sb") { var tracker = this.event_listeners["select_boxes"] };
			
			if (!tracker.includes(f_id)) { tracker.push(f_id) };
		};
		
		//build grid row based on data type
		this.build_row = function(label, field) {
			//console.log(label, field);
			let ft = typeof(field);
			let html = `<div>${make_title_from_varname(label)}</div>`;
			
			//number data
			if (ft == "number") {
				html += `<input type="text" id="${this._id}-${label}" value="${field}">`;
			}
			
			//object data
			else if (ft == "object") {
				//arrays
				if (Array.isArray(field)) {	
					let sb_id = `${this._id}-${label}`
					html += `<select id="${sb_id}">`;
					for (let i in field) {
						let option_title = (make_title_from_varname((field[i]).toString()));
						html += `<option value="${field[i]}">${option_title}</options>`
					}
					html += "</select>";
					this.track_field(sb_id, "sb");
				}
				//unknown
				else { console.log(ft); }
			}
			
			//unknown
			else { console.log(ft); }
			
			return(html);
		};
		
		/*
		this.add_event_listeners = function() {
			var update_target = document.getElementById(this._id);
			for (let i in this.select_boxes) {
				let the_box = this.select_boxes[i];
				document.getElementById(the_box).addEventListener("change", function(){class_root.update(update_target)});
			};
		};
		*/
		
		this.update = function(target) {
			let html = `<div id=${this._id} class=module_box><div class=section_header><div id=${this.view_id} class="button blue">--</div><div class=section_title>${this.title}</div></div><div id=${this.paneldata_id} class=panel_data>`;
			
			for (let [label, field] of Object.entries(p._panel_object._panel_display)) {
				html += this.build_row(label, field);
			};
			
			html += "</div></div>";
			if (target == document.body) { target.insertAdjacentHTML('beforeend', html) }
			else { target.outerHTML = html };
			//this.add_event_listeners();
		};
		
		this.update(document.body);
	}
}


export function build_panel(panel_to_build, target = document.body) {
	console.log("panels.js received build_panel request");
	return(new Panel(panel_to_build[1]));
}


		
/*		
		//set class members
		this._panel_name = incoming_panel_data._panel_name;
		this._panel_object = incoming_panel_data._panel_object;
		
		if (!is_update) {

		}
		
		
		this.id = generate_id(this._panel_name, this._panel_name);
		this.view_id = generate_id(this._panel_name, "viewbutton");
		this.panelwindow_id = generate_id(this._panel_name, "panelwindow");
		this.paneldata_id = generate_id(this._panel_name, "paneldata");
		
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
			return(html_string);
		}
		
		if (!is_update) {
			//initial body load
			let html_string = `<div id=${this.id} class=module_box><div class=section_header><div id=${this.view_id} class="button blue">--</div><div class=section_title>${this.title}</div></div><div id=${this.panelwindow_id}><div id=${this.paneldata_id} class=panel_data>`;
			for (let [key, value] of Object.entries(panel_data)) {
				if (!framework_baseline_properties.includes(key)) {
					let input_id = `${this._panel_name}-${key}`;
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
					}
				
					else if (value_type == "panel_quote") {
						html_string += `<div class="grid_infopane">${value}</div>`;
					}
				
					//dunno what to do with this. here's what it is
					else { html_string += `<span>${value_type}</span>`; }
				}
			}
			
			html_string += "</div>";

			html_string += "</div></div>";
		
			if (!is_update) { target.insertAdjacentHTML('beforeend', html_string); }
			else { target.outerHTML = html_string; }
		
			//get event listeners in
			document.getElementById(this.view_id).addEventListener("click", this.view_click);
			for (let sb in this.select_boxes) {
				let the_box = this.select_boxes[sb]
				document.getElementById(the_box).addEventListener("change", function(){global_janitor(the_box)});
			}
		}
		
		//constructor(incoming_panel_data, target, is_update)
		this.update = function() {
			target = (document.getElementById(class_root.id));
			console.log(target);
			let html_string = `<div id=${this.id} class=module_box><div class=section_header><div id=${this.view_id} class="button blue">--</div><div class=section_title>${this.title}</div></div><div id=${this.panelwindow_id}><div id=${this.paneldata_id} class=panel_data>`;
			
			console.log(html_string);
			console.log(class_root._panel_object._panel_display);
			
		
			//get event listeners in
			document.getElementById(this.view_id).addEventListener("click", this.view_click);
			for (let sb in this.select_boxes) {
				let the_box = this.select_boxes[sb]
				document.getElementById(the_box).addEventListener("change", function(){global_janitor(the_box)});
			}
			console.log(html_string);
		}
		
		this.get_dom_object = function() { return(document.getElementById(class_root.id)) };
	}
}


var global_collection = {};

function global_janitor(changed_item) {
	let panel_base = changed_item.substring(0, changed_item.indexOf("-"));
	let starting_panel_object = Object.values(global_collection).filter(panel => panel._panel_name === panel_base)[0];
	starting_panel_object.update();

	let panel_rebuild = {
		_panel_name: starting_panel_object._panel_name,
		_panel_object: starting_panel_object._panel_object,
	};
	build_panel(panel_rebuild, starting_panel_object.get_dom_object(), true);
}

function build_panel(panel_data, target, is_update = false) {
	var panel_out = new Panel(panel_data, target, is_update);
	global_collection[panel_out._panel_name] = panel_out;
	return(panel_out);
}

function build_module(module, target) {
	for (let [key, panel_data] of Object.entries(module.module_data)) {
		build_panel(panel_data, target);
	}
}
*/