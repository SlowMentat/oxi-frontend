
import { setFormVisibility, navigateTo, fetchEntities, replaceProfile} from '../Components/Actions/indexActions.js';


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
		CONFLICT:409,
		CUSTOM_REDIRECT:902
	},
	outfitFormRoot : document.getElementById('outfitForm'),
	modalRoot : document.getElementById('modalRoot'),
	serviceUrl : 'http://72.14.177.220/gs-convert-jar-to-war-0.1.0/consumer',
	apiBaseUrl : 'http://72.14.177.220/gs-convert-jar-to-war-0.1.0',
	aspectRatio : (2 / 3),
	/*ContenViewStates: {
		edit: {
			CROPPING: 'PREVIEWING',
			TAGGING: 'PREVIEWING'
		},
		preview: {
			PREVIEWING: 'PREVIEWING'
		}
	}*/
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
		PICTURE : "PICTURE",
		BRAND: "BRAND",
		RETAILER: "RETAILER"
	},
	MenuTypes : {
		FILTER: "FILTER",
		HELP: "HELP",
	},
	EmbeddedEntityPropertyNames : {	
		PROFILE : "profileDto",
		OUTFIT : "outfitDtoes",
		CONTENT: "contentDtos",
		ITEM : "itemDtos",
		PICTURE : "pictureDtos",
		BRAND: "brandDtos",
		RETAILER: "retailerDtos"	
	},
	JsonPropertyNames : {		
		PROFILE : "profile",
		OUTFIT : "outfits",
		CONTENT: "contents",
		ITEM : "items",
		PICTURE : "picture",
		BRAND: "brands",
		RETAILER: "retailers"
	},
	ContentDirectories : {
		IMAGES: 'Graphics'
	},
	viewState:{
		PREVIEW: 'preview',
		EDIT: 'edit',
		ADD: 'add'
	},
	FormType : {
		ADD_ITEM: 'AddItem',
		UPDATE_ITEM: 'UpdateItem',
		LOGIN: 'Login',
		DISCARD_EDITS:'DiscardEdits'
	},
	requestToBatchedDispatchMap : {
		outfits: {
			get: (dispatch) => {
				dispatch(navigateTo(OxiAppConstants.navRequestMap.profile.toLowerCase()));
			},
		}
	},
	Intent:{
		DISCARD_EDITS: 'discardEdits'
	},/*
	NavigationException:{
		USER_CANCELED: "User Canceled",
		USER_SUBMITTED: "User Submitted"
	}*/
	EntityTemplates:{
		OUTFIT: {
			id: null,
			likes:'',
			comments:'',
			contents:[],
			coverpicuri:''
		},
		CONTENT: {
			id: null,
			coverpicuri: '',
			picture: '',
			items: []
		},
		ITEM: {
			id: null,
			positionx: '',
			positiony: '',
			type: '',
			size: '',
			retailer: '',
			brand: ''
		},
		PICTURE: {
			id: null,
			thumbnailuri: '', 
			smalluri: '',
			largeuri: ''
		},
		ITEMCONTENT: {
			id: null,
			itemId: '',
			contentId: ''
		}
	},
	ItemTypesByIconName: {
		TypeJacket: {
			label: "jacket",
		},
		TypePants: {
			label: "pants",
		},
		TypeShorts: {
			label: "shorts",
		},
		TypeShirtLong: {
			label: "shirt",
		},
		TypeShirtT: {
			label: "T-shirt",
		},
		TypeSkirt: {
			label: "skirt",
		},
		TypeDress: {
			label: "dress",
		},
	},
	ItemTypesByLabel: {
		jacket: {
			iconName: 'TypeJacket',
		},
		pants: {
			iconName: 'TypePants',
		},
		shorts: {
			iconName: 'TypeShorts',
		},
		shirt: {
			iconName: 'TypeShirtLong',
		},
		'T-shirt': {
			iconName: 'TypeShirtT',
		},
		skirt: {
			iconName: 'TypeSkirt',
		},
		dress: {
			iconName: 'TypeDress',
		},
	}
});