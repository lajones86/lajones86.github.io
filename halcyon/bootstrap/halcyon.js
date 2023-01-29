function hal_bootstrap() {
	console.log("Starting HTE bootstrap");
	
	/*
	make the bootstrapper freak out
	if it's trying to run
	and there's already stuff in the body
	*/
	if (((document.body.innerHTML).trim()) || ((document.body.innerHTML).trim())) {
		message_out = "HTE bootstrap does not currently support non-empty HTML bodies. Intended use is to edit the JSON and Javascript. Aborting HTE bootstrap.";
		console.log(message_out);
		alert(message_out);
		throw new Error(message_out);
	}
	else {
		console.log("Preboot OK. Attempting to load char_stats module.");
	}	
}