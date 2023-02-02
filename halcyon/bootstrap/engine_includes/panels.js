"use strict";

const framework_baseline_properties = ["panel_name"];

function generate_id(panel_name, field_name) {
	return(`${panel_name}-${field_name}`);
}

class Panel {
	constructor(panel_data, target) {
		//set class members
		this.panel_name = panel_data.panel_name;
		this.title = this.panel_name
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
			if(!framework_baseline_properties.includes(`${key}`)){
				this.input_id = `${this.module_name}-${key}`;
				html_string += (`<div>${key}</div><input id="${this.input_id}" type="text" value=${value}>`);
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
		console.log(this.view_id);
		document.getElementById(this.view_id).addEventListener("click", this.view_click);
	}
}

function build_panel(panel_data, target) {
	var panel_out = new Panel(panel_data, target);
	panel_out.set_event_listeners();
	console.log(panel_out);
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