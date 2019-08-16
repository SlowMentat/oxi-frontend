
import { 
	//setFormVisibility, 
	navigateTo, 
	//fetchEntities, 
	//replaceProfile
} from '../Components/Actions/indexActions.js';


//Constant global variables
export const OxiAppConstants = Object.freeze({	
	debug : false,
	maxContentCount:6,
	ControlConstants:{
		ButtonTypes:{
			a:'staticIconButton',
			b:'dynamicIconButton',
			c:'staticIconToggle',
			d:'submitButton',
			e:'popupIconButton'
		}
	},
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
	fitResultValues:{
		a:'✔',//'Perfect Fit',
		b:'⦸',//'Bad Fit',
		c:'⦸',//Too Tight',
	},
	toPortals:{
		consumer: '/shop/browse',
		retailer: '/retailer',
		designer: '/designer'
	},
	ListTypes:{
		a : 'SAVED_ITEM'
	},
	MapTypes:{
		a: 'SAVED_ITEM_MAP'
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
		SIZE_CHART:'SIZE_CHART',
		SIZE_GROUP:'SIZE_GROUP',
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
		},
		retailer:'/retailer',
	},
	iconDefaults:{
		colors:{
			stroke:'#999999',
			fill:'none',
			highlights:{
				stroke:'var(--color4)',
				fill:'var(--color4)',				
			}
		},
		dimensions:{
			strokeWidth:"3",
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
		SIZE_CHART: "sizeChartDtos",
		SIZE_GROUP:"sizeGroupDtos",
		PICTURE : "pictureDtos",
		BRAND: "brandDtos",
		RETAILER: "retailerDtos"	
	},
	JsonPropertyNames : {		
		PROFILE : "profile",
		OUTFIT : "outfits",
		CONTENT: "contents",
		ITEM : "items",
		SIZE_CHART: "sizeChartDto",
		SIZE_GROUP:"sizeGroupDtos",
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
	PLATFORM: 'wearsit',
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
			sizeChartDto:{
				id:null,
				chartName:null,
				sizeGroupDtos:[]
			},
			sizeGroupId:null,
			brand: '',
			platform:null,
		},
		SIZE_GROUP:{
			id:null,
			metric:{},
			sizeLabel:null,
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
		},
		CUSTOM_PRODUCT_TEMPLATE:{
			handle:null,
			udr:null,
			uds:null,
			onlineStoreUrl:null
		},
		STANDARD_PRODUCT_TEMPLATE:{
			handle:null,
			featuredImage:{
				originalSrc:null
			},
			description:null,
			size:null,
			retailer: null	
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