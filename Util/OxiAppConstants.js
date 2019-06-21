
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
	serviceURL : 'https://www.oxisalechannel.com/gs-convert-jar-to-war-0.1.0/consumer',
	apiBaseURL : 'https://www.oxisalechannel.com/gs-convert-jar-to-war-0.1.0',
	webAppBaseURL : 'https://www.oxisalechannel.com',
	aspectRatio : (2 / 3),
	scrollBufferSize: 2,	//size of the scrollHeight in number of pages (PageList component).  Must be > 1
	navRequestMap : {
		a : "Browse",
		b : "Profile",
		c : "Fitting",
		//search : "Search",
		//logout : "Logout"
	},
	toPortals:{
		consumer: '/shop/browse',
		retailer: '/retailer',
		designer: '/designer'
	},
	EntityTypes : {
		PROFILE : "PROFILE",
		OUTFIT : "OUTFIT",
		CONTENT: "CONTENT",
		ITEM : "ITEM",
		ITEM_CONTENT : "ITEMCONTENT",
		PICTURE : "PICTURE",
		BRAND: "BRAND",
		RETAILER: "RETAILER",
		APPAREL_TYPE: "APPAREL_TYPE",
		search:{
			ta: 'AVAILABLE_ITEMS',
		}
	},
	routeURIs:{
		login:'/user/account/login',
		browse: '/shop/browse',
		shop: '/shop',
		search:{
			a:'/searchItems',
			b:'/searchRetailerNames',
			c:'/searchUdr',
			d:'/searchUds',
			e:'/searchApparelTypes'
		}
	},
	appUris:{
		a: '/allApparelTypes'
	},
	MenuTypes : {
		FILTER: "FILTER",
		HELP: "HELP",
	},
	PageListIds:{
		ITEM_LIST_BROWSE: 'itemListBrowse',
		ITEM_AS_SEEN_ON_LIST: 'itemAsSeenOnList',
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
		DISCARD_EDITS:'DiscardEdits',
	},
	requestToBatchedDispatchMap : {
		outfits: {
			get: (dispatch) => {
				//navigate to browse
				dispatch(navigateTo(OxiAppConstants.navRequestMap.a.toLowerCase()));
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
			//type: {},
			//size: {},
			//retailer: '',
			product:{},
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