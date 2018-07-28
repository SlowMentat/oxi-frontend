//Constant global variables
export const OxiAppConstants = Object.freeze({	
	debug : false,
	HttpStatus : {
		SUCCESS:201,
		REDIRECT:302,
		UNAUTHORIZED:401,
		NOT_FOUND:404,
		CUSTOM_REDIRECT:902
	},
	outfitFormRoot : document.getElementById('outfitForm'),
	modalRoot : document.getElementById('modalRoot'),
	apiBaseUrl : 'http://72.14.177.220/gs-convert-jar-to-war-0.1.0',
	navRequestMap : {
		home : () => {console.log("home pressed")},
		profile : () => {console.log("profile pressed")},
		settings : () => {console.log("settings pressed")},
		search : () => {console.log("serach pressed")},
		logout : () => {sendAsyncRequest({}, {}, 'POST', 'http://72.14.177.220/gs-convert-jar-to-war-0.1.0/logout', null)}
	}
});