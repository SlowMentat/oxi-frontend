

//Constant global variables
export const OxiAppConstants = Object.freeze({	
	debug : false,
	HttpStatus : {
		OK: 200,
		CREATED:201,
		REDIRECT:302,
		UNAUTHORIZED:401,
		FORBIDDEN:403,
		NOT_FOUND:404,
		CUSTOM_REDIRECT:902
	},
	outfitFormRoot : document.getElementById('outfitForm'),
	modalRoot : document.getElementById('modalRoot'),
	serviceUrl : 'http://72.14.177.220/gs-convert-jar-to-war-0.1.0/consumer',
	apiBaseUrl : 'http://72.14.177.220/gs-convert-jar-to-war-0.1.0',
	navRequestMap : {
		home : "Home",
		profile : "Profile",
		settings : "Settings",
		search : "Search",
		logout : "Logout"
	},
	EntityTypes : {
		PROFILE : "PROFILE",
		OUTFIT : "OUTFIT",
		CONTENT: "CONTENT",
		ITEM : "ITEM",
		ITEM_CONTENT : "ITEMCONTENT",
		PICTURE : "PICTURE"
	},
	ContentDirectories : {
		IMAGES: 'Graphics'
	}
});