
//import { 
//	//setFormVisibility, 
//	navigateTo, 
//	//fetchEntities, 
//	//replaceProfile
//} from '../Components/Actions/indexActions.js';


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
	encodingPrefixes:{
		JPEG:{
			BASE64: 'data:image/jpeg;base64,',
		}
	},

	exifTags:{
		0x010e: {name: 'imageDescription', format: 0x02, maxComponents: undefined,},	
		0x010f: {name: 'make', format: 0x02, maxComponents: undefined,},	
		0x0110: {name: 'model', format: 0x02, maxComponents: undefined,},	
		0x0112: {name: 'orientation', format: 0x03, maxComponents: 1, },	
		0x011a: {name: 'xResolution', format: 0x05, maxComponents: 1, },	
		0x011b: {name: 'yResolution', format: 0x05, maxComponents: 1, },	
		0x0128: {name: 'resolutionUnit', format: 0x03, maxComponents: 1, },	
		0x0131: {name: 'software', format: 0x02, maxComponents: undefined, },	
		0x0132: {name: 'dateTime', format: 0x02, maxComponents: 20, },	
		0x013e: {name: 'whitePoint', format: 0x05, maxComponents: 2, },	
		0x013f: {name: 'primaryChromaticities', format: 0x05, maxComponents: 6, },	
		0x0211: {name: 'yCbCrCoefficients', format: 0x05, maxComponents: 3, },	
		0x0213: {name: 'yCbCrPositioning', format: 0x05, maxComponents: 1, },	
		0x0214: {name: 'referenceBlackWhite', format: 0x05, maxComponents: 6,},	
		0x8298: {name: 'copyright', format: 0x02, maxComponents: undefined, },	
		0x8769: {name: 'exifOffset', format: 0x04, maxComponents: 1, },	
	},

	subIFDTags: {
		0x829a:	{name: 'exposureTime', format: 0x05, maxComponents: 1, },
		0x829d:	{name: 'fNumber', format: 0x05, maxComponents: 1, },
		0x8822:	{name: 'exposureProgram', format: 0x03, maxComponents: 1, },
		0x8827:	{name: 'isoSpeedRatings', format: 0x03, maxComponents: 2, },
		0x9000:	{name: 'exifVersion', format: 0x07, maxComponents: 4, },
		0x9003:	{name: 'dateTimeOriginal', format: 0x02, maxComponents: 20, },
		0x9004:	{name: 'dateTimeDigitized', format: 0x02, maxComponents: 20, },
		0x9101:	{name: 'componentConfiguration', format: 0x07, maxComponents: undefined, },
		0x9102:	{name: 'compressedBitsPerPixel', format: 0x05, maxComponents: 1, },
		0x9201:	{name: 'shutterSpeedValue', format: 0x0a, maxComponents: 1, },
		0x9202:	{name: 'apertureValue', format: 0x05, maxComponents: 1, },
		0x9203:	{name: 'brightnessValue', format: 0x0a, maxComponents: 1, },
		0x9204:	{name: 'exposureBiasValue', format: 0x0a, maxComponents: 1, },
		0x9205:	{name: 'maxApertureValue', format: 0x05, maxComponents: 1, },
		0x9206:	{name: 'subjectDistance', format: 0x0a, maxComponents: 1, },
		0x9207:	{name: 'meteringMode', format: 0x03, maxComponents: 1, },
		0x9208:	{name: 'lightSource', format: 0x03, maxComponents: 1, },
		0x9209:	{name: 'flash', format: 0x03, maxComponents: 1, },
		0x920a:	{name: 'focalLength', format: 0x05, maxComponents: 1, },
		0x927c:	{name: 'makerNote', format: 0x07, maxComponents: undefined, },
		0x9286:	{name: 'userComment', format: 0x07, maxComponents: undefined, },
		0xa000:	{name: 'flashPixVersion', format: 0x07, maxComponents: 4, },
		0xa001:	{name: 'colorSpace', format: 0x03, maxComponents: 1, },
		0xa002:	{name: 'exifImageWidth', format: 0x04, maxComponents: 1, },
		0xa003:	{name: 'exifImageHeight', format: 0x04, maxComponents: 1, },
		0xa004:	{name: 'relatedSoundFile', format: 0x02, maxComponents: 1, },
		0xa005:	{name: 'exifInteroperabilityOffset', format: 0x03, maxComponents: 1, },
		0xa20e:	{name: 'focalPlaneXResolution', format: 0x05, maxComponents: 1, },
		0xa20f:	{name: 'focalPlaneYResolution', format: 0x05, maxComponents: 1, },
		0xa210:	{name: 'focalPlaneResolutionUnit', format: 0x03, maxComponents: 1, },
		0xa217:	{name: 'sensingMethod', format: 0x03, maxComponents: 1, },
		0xa300:	{name: 'fileSource', format: 0x07, maxComponents: 1, },
		0xa301:	{name: 'sceneType', format: 0x07, maxComponents: 1, },
	},

	/*
	* key: 		stored value
	* value: 	coresponding Bytes/Component
	*/
	exifDataFormats: {
		0x01: 1, 	//unsigned byte
		0x02: 1, 	//ascii strings
		0x03: 2, 	//unsigned short
		0x04: 4, 	//unsigned long
		0x05: 8, 	//unsigned rational
		0x06: 1, 	//signed byte
		0x07: 1, 	//undefined
		0x08: 2, 	//signed short
		0x09: 4, 	//signed long
		0x0a: 8, 	//signed rational
		0x0b: 4, 	//single float
		0x0c: 8, 	//double float
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
	browseSelection:{
		a: 'outfits',
		b: 'apparel',
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
		LIKE_COUNT: 'LIKE_COUNT',
		search:{
			ta: 'AVAILABLE_ITEMS',
		}
	},
	routeURIs:{
		login:'/user/account/login',
		browse: '/shop/browse',
		profile: '/shop/profile',
		fitting:'/shop/fitting',
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
		CONTENT_WITH_OUTFIT: "contentWithOutfitDtoes",
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
		CONTENT_WITH_OUTFIT: "contents",
		ITEM : "items",
		SIZE_CHART: "sizeChartDto",
		SIZE_GROUP:"sizeGroupDtos",
		PICTURE : "picture",
		BRAND: "brands",
		RETAILER: "retailers",
		LIKE_COUNT: 'likeCount',
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
	//requestToBatchedDispatchMap : {
	//	outfits: {
	//		get: (dispatch) => {
	//			//navigate to browse
	//			dispatch(navigateTo(OxiAppConstants.navRequestMap.a.toLowerCase()));
	//		},
	//	}
	//},
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