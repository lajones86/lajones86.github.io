"use strict";

const framework_baseline_properties = ["panel_name"];

function generate_id(panel_name, field_name) {
	return(`${panel_name}-${field_name}`);
}

function make_title_from_varname(varname) {
	if (varname.length == 2) { return(varname.toUpperCase()); }
	else {return(varname.replace(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); } )); }
}
	

class Panel {
	constructor(panel_data, target) {
		//set class members
		this.panel_name = panel_data.panel_name;
		this.title = make_title_from_varname(this.panel_name);
		this.id = generate_id(this.panel_name, this.panel_name);
		this.action_id = generate_id(this.panel, "panelbutton");
		this.view_id = generate_id(this.panel_name, "viewbutton");
		this.panelwindow_id = generate_id(this.panel_name, "panelwindow");
		this.paneldata_id = generate_id(this.panel_name, "paneldata");
		
		if (panel_data.action_button){ this.actionbutton = true;}
		
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
		
		//set dom data
		let html_string = `<div id=${this.id} class=module_box><div class=section_header><div id=${this.view_id} class="button blue">--</div><div class=section_title>${this.title}</div></div><div id=${this.panelwindow_id}><div id=${this.paneldata_id} class=panel_data>`;
		for (let [key, value] of Object.entries(panel_data)) {
			if(!framework_baseline_properties.includes(key)) {
				this.input_id = `${this.panel_name}-${key}`;
				
				///get label from key
				let title = make_title_from_varname(key);
				html_string += (`<div>${title}</div>`);
				
				let value_type = typeof(value)
				
				if (value_type == "function") {
					let function_name = value.name.toString();
					value = panel_data[function_name](panel_data);
				};
				
				
				if (["number", "string", "function"].includes(value_type)) {
					html_string += `<input id="${this.input_id}" type="text" value=${value}>`;
				}

				else if (value_type == "object") {
					html_string += `<select id="${this.input_id}">`;
					for (let entry in value) {
						html_string += `<option value="${value[entry]}">${value[entry]}</options>`
					}
					html_string += "</select>";
					panel_data[key] = value[0];
				}
				
				else { html_string += `<span>${value_type}`; }
			}
		}
		html_string += "</div>";

		if (this.action_button) {
			html_string += `<div id="${this.action_id}" class="button green">Lock</div>`;	
		}
		html_string += "</div></div>";
	
		target.insertAdjacentHTML('beforeend', html_string);
		
	}
	
	set_event_listeners() {
		document.getElementById(this.view_id).addEventListener("click", this.view_click);
	}
}

function build_panel(panel_data, target) {
	var panel_out = new Panel(panel_data, target);
	panel_out.set_event_listeners();
	return(panel_out);
}

function build_module(module, target) {
	for (let [key, value] of Object.entries(module.module_data)) {
		build_panel(value, target);
	}
}

export function build_modules(modules, target) {
	for (let m = 0; m < modules.length; m++){
		build_module(modules[m], target);
	}
}