"use strict";

console.log(`Module awake: ${(new Error).fileName}`)

import {panel0} from "./mod.js";

class Panel {
	constructor(is_update = false) {
		let outstr = `<select id="panel0">`
		for (let key of panel0._panel_object._panel_display.paneldata){
			outstr += `<option value="${key}">${key}</option>`;
		}
		outstr += `</select><button id="refresh">refresh</button>`;
		
		if (!is_update) { document.body.innerHTML = outstr; }
		else {document.getElementById("panel0").outerHTML = outstr;}
	
		document.getElementById("refresh").addEventListener("click", go);
	}
}

export function go() {
	var x = new Panel();
};