"use strict";

console.log(`Module awake: ${(new Error).fileName}`)

const framework_baseline_properties = ["panel_name"];

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
		this.panel_name = panel_data.panel_name;
		this.title = make_title_from_varname(this.panel_name);
		this.id = generate_id(this.panel_name, this.panel_name);
		this.action_id = generate_id(this.panel, "panelbutton");
		this.view_id = generate_id(this.panel_name, "viewbutton");
		this.panelwindow_id = generate_id(this.panel_name, "panelwindow");
		this.paneldata_id = generate_id(this.panel_name, "paneldata");
		
		//making the front end and back end play nice with this, i hope
		var class_root = this;
		
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
		
		//initial body load
		let html_string = `<div id=${this.id} class=module_box><div class=section_header><div id=${this.view_id} class="button blue">--</div><div class=section_title>${this.title}</div></div><div id=${this.panelwindow_id}><div id=${this.paneldata_id} class=panel_data>`;
		for (let [key, value] of Object.entries(panel_data)) {
			if (!framework_baseline_properties.includes(key)) {
				this.input_id = `${this.panel_name}-${key}`;
				
							
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
					html_string += `<input id="${this.input_id}" type="text" value=${value}>`;
				}

				//add right side for 2-column entry
				else if (value_type == "object") {
					html_string += `<select id="${this.input_id}">`;
					for (let entry in value) {
						let option_title = (make_title_from_varname((value[entry]).toString()));
						html_string += `<option value="${value[entry]}">${option_title}</options>`
					}
					html_string += "</select>";
					panel_data[key] = value[0];
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
		
	}
	
	set_event_listeners() {
		document.getElementById(this.view_id).addEventListener("click", this.view_click);
	}
}

function build_panel(panel_data, target, panel_collection) {
	var panel_out = new Panel(panel_data, target, panel_collection);
	panel_out.set_event_listeners();
	return(panel_out);
}

function build_module(module, target) {
	let panel_collection = {};
	for (let [key, panel_data] of Object.entries(module.module_data)) {
		let new_panel = build_panel(panel_data, target, panel_collection);
		panel_collection[new_panel.name] = new_panel;
	}
}

export function build_modules(modules, target) {
	console.log("panels.js received build_modules request");
	for (let m = 0; m < modules.length; m++){
		console.log(`attempting to build module ${m+1} of ${modules.length}`)
		build_module(modules[m], target);
	}
}