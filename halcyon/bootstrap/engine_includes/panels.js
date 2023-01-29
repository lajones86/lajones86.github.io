"use strict";

const framework_baseline_properties = ["module_name", "friendly_name"];

function generate_id(panel_name, field_name) {
	return(`${panel_name}-${field_name}`);
}

class Panel {
	constructor(module_data, target) {
		//set class members
		this.module_name = module_data.basepanel.module_name;
		this.title = module_data.basepanel.friendly_name;
		this.id = generate_id(this.module_name, this.module_name);
		this.action_id = generate_id(this.module_name, "panelbutton");
		this.view_id = generate_id(this.module_name, "viewbutton");
		this.paneldata_id = generate_id(this.module_name, "paneldata");
		
		//making the front end and back end play nice, i hope
		const self = this;
		
		this.action_click = function() {
			if (this.innerText == "Lock") {
				console.log(self.paneldata_id);
				this.className = "button orange";
				this.innerText = "Unlock";
			}
			else if (this.innerText == "Unlock") {
				console.log(self.paneldata_id);
				this.className = "button green";
				this.innerText = "Lock";
			}
			else { this.className = "button dead"; }
		}
		
		this.view_click = function() {
			if (this.innerText == "--") {
				(document.getElementById(self.paneldata_id)).className = "minimized";
				this.innerText = "[]";
			}
			else if (this.innerText == "[]") {
				console.log(self.paneldata_id);
				this.innerText = "--";
			}
			else {this.className = "button broken"};
		};
		
		//set dom data
		
		let html_string = `<div id=${this.id} class=module_box><div class=section_header><div id=${this.view_id} class="button blue">--</div><div class=section_title>${this.title}</div></div><div id=${this.paneldata_id} class=panel_data>`;
		for (let [key, value] of Object.entries(module_data.basepanel)) {
			if(!framework_baseline_properties.includes(`${key}`)){
				let input_id = generate_id(module_data.basepanel.module_name, key);
				html_string += (`<div>${key}</div><input id="${input_id}" type="text" value=${value}>`);
			}
		}
		html_string += "</div>";

		let input_id = generate_id(module_data.basepanel.module_name, "panelbutton");
		html_string += `<div id="${input_id}" class="button green">Lock</div>`;	
		html_string += "</div>";
	
		target.innerHTML = html_string;
		
	}

	set_event_listeners() {
		document.getElementById(this.action_id).addEventListener("click", this.action_click);		
		document.getElementById(this.view_id).addEventListener("click", this.view_click);
	}
}

export function build_panel(module_data, target) {
	var panel_out = new Panel(module_data, target);
	window.onload = function() { panel_out.set_event_listeners(); }
	return(panel_out);
}