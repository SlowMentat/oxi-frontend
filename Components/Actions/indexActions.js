
//Do this in every file where you use `fetch`
import fetch from 'cross-fetch'
import axios from 'axios';

//import sendAsyncRequest from '../../Util/AsyncRequest.js';
//import {sendAsyncRequest} from '../../App.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import {normalize, denormalize} from 'normalizr';
import {outfitsSchema, profileSchema, contents, items} from '../../Util/Schema.js';
import {buildItemContentsObject} from '../../Util/Schema.js'
import Cookies from 'universal-cookie';
import qs from 'qs';
//const FormData = require('form-data');

//import {FormData} from 'form-data';

//Action Types
export const SET_VISIBLE_FORM 		= 'SET_VISIBLE_FORM';
export const SHOW_MODAL 			= 'SHOW_MODAL';
export const SET_XCSRF_TOKEN 		= 'SET_XCSRF_TOKEN';
export const SET_REQUEST_BODY 		= 'SET_REQUEST_BODY';
export const SET_LP_PROFILE_MENU	= 'SET_LP_PROFILE_MENU';
export const SET_LP_CREATE_ACCOUNT_VIEW			= 'SET_LP_CREATE_ACCOUNT_VIEW';
export const CREATE_ITEM 			= 'CREATE_' 	+ OxiAppConstants.EntityTypes.ITEM;
export const UPDATE_ITEM 			= 'UPDATE_' 	+ OxiAppConstants.EntityTypes.ITEM;
export const REPLACE_ITEM 			= 'REPLACE_' 	+ OxiAppConstants.EntityTypes.ITEM;
export const CREATE_CONTENT 		= 'CREATE_' 	+ OxiAppConstants.EntityTypes.CONTENT;
export const UPDATE_CONTENT 		= 'UPDATE_' 	+ OxiAppConstants.EntityTypes.CONTENT;
export const REPLACE_CONTENT 		= 'REPLACE_' 	+ OxiAppConstants.EntityTypes.CONTENT;
export const EDIT_CONTENT_VIEW 		= "EDIT_CONTENT_VIEW";
export const PREVIEW_CONTENT		= "PREVIEW_CONTENT";
export const SHOW_CONTENT_VIEW 		= "SHOW_CONTENT_VIEW"; //TODO: replace this with PREVIEW_CONTENT const
export const SELECT_OUTFIT 			= "SELECT_" 	+ OxiAppConstants.EntityTypes.OUTFIT;
export const CREATE_OUTFIT 			= "CREATE_" 	+ OxiAppConstants.EntityTypes.OUTFIT;
export const CREATE_ITEMCONTENT 	= "CREATE_" 	+ OxiAppConstants.EntityTypes.ITEM_CONTENT;
export const UPDATE_ITEMCONTENT		= 'UPDATE_'		+ OxiAppConstants.EntityTypes.ITEM_CONTENT;
export const UPDATE_OUTFIT 			= "UPDATE_" 	+ OxiAppConstants.EntityTypes.OUTFIT;
export const REPLACE_OUTFIT 		= "REPLACE_" 	+ OxiAppConstants.EntityTypes.OUTFIT;
export const DELETE_OUTFIT			= "DELETE_" 	+ OxiAppConstants.EntityTypes.OUTFIT;
export const SELECT_PAGE 			= "SELECT_PAGE";
export const CREATE_PICTURE			= "CREATE_"		+ OxiAppConstants.EntityTypes.PICTURE;
export const CREATE_APPAREL_TYPE	= "CREATE_"		+ OxiAppConstants.EntityTypes.APPAREL_TYPE;
export const SET_BROWSER_SELECTION   = "SET_BROWSER_SELECTION";

//Action on for entities added to client
export const ADD_ITEM				= 'ADD_'				+ OxiAppConstants.EntityTypes.ITEM;
export const MODIFY_ITEM			= 'MODIFY_'				+ OxiAppConstants.EntityTypes.ITEM;
export const REMOVE_ITEM			= 'REMOVE_'				+ OxiAppConstants.EntityTypes.ITEM;
export const SELECT_NEW_ITEM		= 'SELECT_NEW_'			+ OxiAppConstants.EntityTypes.ITEM;
export const ADD_ITEMCONTENT		= 'ADD_'				+ OxiAppConstants.EntityTypes.ITEM_CONTENT;
export const REMOVE_ITEMCONTENT		= 'REMOVE_'				+ OxiAppConstants.EntityTypes.ITEM_CONTENT;
export const ADD_CONTENT			= 'ADD_'				+ OxiAppConstants.EntityTypes.CONTENT;
export const ADD_CONTENTS			= 'ADD_'				+ OxiAppConstants.EntityTypes.CONTENT	+'S';
export const MODIFY_CONTENT			= 'MODIFY_'				+ OxiAppConstants.EntityTypes.CONTENT;
export const REMOVE_CONTENT			= 'REMOVE_'				+ OxiAppConstants.EntityTypes.CONTENT;
export const SELECT_CONTENT			= 'SELECT_'				+ OxiAppConstants.EntityTypes.CONTENT;
export const ADD_OUTFIT				= 'ADD_'				+ OxiAppConstants.EntityTypes.OUTFIT;
export const MODIFY_OUTFIT			= 'MODIFY_'				+ OxiAppConstants.EntityTypes.OUTFIT;
export const REMOVE_OUTFIT			= 'REMOVE_'				+ OxiAppConstants.EntityTypes.OUTFIT;
export const ADD_PROFILE			= 'ADD_'				+ OxiAppConstants.EntityTypes.PROFILE;
export const MODIFY_PROFILE			= 'MODIFY_'				+ OxiAppConstants.EntityTypes.PROFILE;
export const REMOVE_PROFILE			= 'REMOVE_'				+ OxiAppConstants.EntityTypes.PROFILE;
export const SELECT_NEW_PROFILE		= 'SELECT_NEW_'			+ OxiAppConstants.EntityTypes.PROFILE;
export const CREATE_PROFILE			= 'CREATE_PROFILE'		+ OxiAppConstants.EntityTypes.PROFILE;
export const REPLACE_PROFILE		= "REPLACE_"			+ OxiAppConstants.EntityTypes.PROFILE;
export const REPLACE_BRAND			= 'REPLACE_' 			+ OxiAppConstants.EntityTypes.BRAND;
export const REPLACE_RETAILER		= 'REPLACE_' 			+ OxiAppConstants.EntityTypes.RETAILER;
export const REPLACE_PICTURE		= 'REPLACE_' 			+ OxiAppConstants.EntityTypes.PICTURE;
export const REPLACE_APPAREL_TYPE   = 'REPLACE_'			+ OxiAppConstants.EntityTypes.APPAREL_TYPE;

//Async action types
export const REQUEST_LOGIN 			= "REQUEST_LOGIN";
export const REQUEST_ENTITIES 		= "REQUEST_ENTITIES";
export const RECEIVE_ENTITIES 		= "RECEIVE_ENTITIES";
export const SERVER_INVALIDATE_ENTITIES 	= "SERVER_INVALIDATE_ENTITIES";
//Fetch HTTP request actions
export const FETCH_ENTITIES_REQUEST = "FETCH_ENTITIES_REQUEST";//type of action informing reducers request began
export const FETCH_ENTITIES_FAILURE = "FETCH_ENTITIES_FAILURE";//type of action infiorming reducers the request failed
export const FETCH_ENTITIES_SUCCESS = "FETCH_ENTITIES_SUCCESS";//type of action infiorming reducers the request finished successfully

export const FETCH_AUTH_REQUEST 	= "FETCH_AUTH_REQUEST";
export const FETCH_AUTH_FAILURE 	= "FETCH_AUTH_FAILURE";
export const FETCH_AUTH_SUCCUSS 	= "FETCH_AUTH_SUCCUSS";
export const SELECT_WEB_APP_VIEW	= "SELECT_WEB_APP_VIEW";

export const SELECT_ITEM 			= "SELECT_"		+ OxiAppConstants.EntityTypes.ITEM;
export const DISABLE_BUTTON			= "DISABLE_BUTTON";
export const DISABLE_CONTENT_BUTTON = 'DISABLE_CONTENT_BUTTON';

export const REQUEST_NAVIGATION		= 'REQUEST_NAVIGATION';

export const UPDATE_PROFILE 		= 'UPDATE_' + OxiAppConstants.EntityTypes.PROFILE;

export const SET_POSITION_FILTER	= 'SET_POSITION_' + OxiAppConstants.MenuTypes.FILTER;
export const SET_POSITION_HELP		= 'SET_POSITION_' + OxiAppConstants.MenuTypes.FILTER;
export const SET_VISIBLE_HELP		= 'SET_VISIBLE_' + OxiAppConstants.MenuTypes.HELP;
export const SET_VISIBLE_FILTER		= 'SET_VISIBLE_' + OxiAppConstants.MenuTypes.HELP;

export const UPDATE_OUTFIT_COVERPICURI = 'UPDATE_OUTFIT_COVERPICURI';

export const RECEIVED_EXISTING_ITEMS_SEARCH = 'RECEIVED_EXISTING_ITEMS_SEARCH';
export const RECEIVED_RETAILER_NAMES_SEARCH = 'RECEIVED_RETAILER_NAMES_SEARCH';
export const RECEIVED_UDR_NAMES_SEARCH = 'RECEIVED_UDR_NAMES_SEARCH';
export const RECEIVED_UDS_LABELS_SEARCH = 'RECEIVED_UDS_LABELS_SEARCH';
export const RECEIVED_ALL_APPAREL_TYPES ='RECEIVED_ALL_APPAREL_TYPES';
export const RECEIVED_SIZE_GROUPS_BY_ITEM_ID = 'RECEIVED_SIZE_GROUPS_BY_ITEM_ID';

export const REPLACE_SIZE_GROUP = 'REPLACE_SIZE_GROUP';
export const REPLACE_SIZE_CHART = 'REPLACE_SIZE_CHART';
export const CREATE_SIZE_GROUP = 'CREATE_SIZE_GROUP';

export const SET_PREVIEW_FOCUS = 'SET_PREVIEW_FOCUS';
export const UNSET_PREVIEW_FOCUS = 'UNSET_PREVIEW_FOCUS';


//global variables
let nextItemId = 0;
let nextOutfitId = 0;
let nextContentId = 0;

const defaultProfileData = {
	'id':'',
	'username':'',
	'bodyShape':'',
	'apparelInterest': '',
	'height':'',
	'neck':'',
	'fullShoulder':'',
	'halfShoulder':'',
	'chest':'',
	'waist':'',
	//'hips':'',
	'sleeve':'',
	'frontLength':'',
	'backLength':'',
	'pantOutseam':'',
	'pantInseam':'',
	'thigh':'',
	'calf':''	
};


export const setBrowserSelection= makeActionCreator(SET_BROWSER_SELECTION, null, 'browseSelection');

export const setFormVisibility	= makeActionCreator(SET_VISIBLE_FORM, null, 'modal', 'prevRequestUrl', 'prevRequestType', 'otherData');
export const editContentView 	= makeActionCreator(EDIT_CONTENT_VIEW, null, 'viewState');
export const previewContent		= makeActionCreator(PREVIEW_CONTENT, null, 'shownContentId')
export const showContentView 	= makeActionCreator(SHOW_CONTENT_VIEW, null, 'isContentViewVisible');
export const showModal 			= makeActionCreator(SHOW_MODAL, null, 'isModalVisible');
export const setXcsrfToken 		= makeActionCreator(SET_XCSRF_TOKEN, null, 'xCsrfToken');

export const selectPage 		= makeActionCreator(SELECT_PAGE, null, 'page');
export const setWebAppView		= makeActionCreator(SELECT_WEB_APP_VIEW, null, 'webAppView');

export const selectItem 		= makeActionCreator(SELECT_ITEM, OxiAppConstants.EntityTypes.ITEM, 'id');
export const selectContent 		= makeActionCreator(SELECT_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'id');
export const selectOutfit 		= makeActionCreator(SELECT_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'id');

//BRAND actions
export const replaceBrands 		= makeActionCreator(REPLACE_BRAND, OxiAppConstants.EntityTypes.BRAND, 'entities');

//RETAILER actions
export const replaceRetailers	= makeActionCreator(REPLACE_RETAILER, OxiAppConstants.EntityTypes.RETAILER, 'entities');

//PROFILE actions
export const replaceProfile		= makeActionCreator(REPLACE_PROFILE, OxiAppConstants.EntityTypes.PROFILE, 'entities');
export const updateProfile 		= makeActionCreator(UPDATE_PROFILE, OxiAppConstants.EntityTypes.PROFILE, 'id');

//OUTFIT Actions
export const createOutfit 		= makeActionCreator(CREATE_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'entities');
export const updateOutfit 		= makeActionCreator(UPDATE_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'id');
export const replaceOutfits 	= makeActionCreator(REPLACE_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'entities');
export const deleteOutfit 		= makeActionCreator(DELETE_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'id', 'likes', 'comments', 'coverpicuri', 'contents', 'profile');
//export const addOutfit 			= makeActionCreator(ADD_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'id', 'likes', 'comments', 'coverpicuri', 'contents', 'profile');
export const addOutfit 			= makeActionCreator(ADD_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'entity');
export const modifyOutfit 		= makeActionCreator(MODIFY_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'entity');

//ITEM Actions
export const createItem 		= makeActionCreator(CREATE_ITEM, OxiAppConstants.EntityTypes.ITEM, 'entities');
export const updateItem 		= makeActionCreator(UPDATE_ITEM, OxiAppConstants.EntityTypes.ITEM, 'id');
//export const updateItems 		= makeActionCreator(UPDATE_ITEM, OxiAppConstants.EntityTypes.ITEM, 'ids');
export const replaceItems 		= makeActionCreator(REPLACE_ITEM, OxiAppConstants.EntityTypes.ITEM, 'entities');
//export const addItem 			= makeActionCreator(ADD_ITEM, OxiAppConstants.EntityTypes.ITEM, 'type','positionx', 'positiony', 'size', 'retailer', 'brand');
export const addItem 			= makeActionCreator(ADD_ITEM, OxiAppConstants.EntityTypes.ITEM, 'entity');
export const modifyItem 		= makeActionCreator(MODIFY_ITEM, OxiAppConstants.EntityTypes.ITEM, 'entity');

//ITEMCONTENT Actions
//export const createItemContent 	= makeActionCreator(CREATE_ITEMCONTENT, OxiAppConstants.EntityTypes.ITEM_CONTENT,'id', 'itemId', 'contentId');
export const createItemContent 	= makeActionCreator(CREATE_ITEMCONTENT, OxiAppConstants.EntityTypes.ITEM_CONTENT, 'entities');
export const updateItemContent 	= makeActionCreator(UPDATE_ITEMCONTENT, OxiAppConstants.EntityTypes.ITEM_CONTENT,'id', 'itemId', 'contentId');
//export const addItemContent 	= makeActionCreator(ADD_ITEMCONTENT, OxiAppConstants.EntityTypes.ITEM_CONTENT, 'itemId', 'contentId');
export const addItemContent 	= makeActionCreator(ADD_ITEMCONTENT, OxiAppConstants.EntityTypes.ITEM_CONTENT, 'entity');

//CONTENT Actions
export const createContent 		= makeActionCreator(CREATE_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'entities');
export const updateContent 		= makeActionCreator(UPDATE_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'id');
export const replaceContents 	= makeActionCreator(REPLACE_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'entities');

//export const addContent 		= makeActionCreator(ADD_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'id', 'outfitId', 'items');
export const addContent 		= makeActionCreator(ADD_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'entity');
export const addContents 		= makeActionCreator(ADD_CONTENTS, OxiAppConstants.EntityTypes.CONTENT, 'entities');

//Action primarily used to modify the items propterty of the content entity in the addedEntityReducer tree 
//after an item entity has been added to addedEntityRedercer.items branch
//This is also invoked when modifying the coverpicuri property once a picture/s is/are selected during an "add outfit" operation
export const modifyContent 		= makeActionCreator(MODIFY_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'entity')

//PICTURE Actions
export const createPictures		= makeActionCreator(CREATE_PICTURE, OxiAppConstants.EntityTypes.PICTURE, 'entities');
export const replacePictures 	= makeActionCreator(REPLACE_PICTURE, OxiAppConstants.EntityTypes.PICTURE, 'entities');

export const createSizeGroups	= makeActionCreator(CREATE_SIZE_GROUP, OxiAppConstants.EntityTypes.SIZE_GROUP, 'entities');
export const replaceSizeGroups	= makeActionCreator(REPLACE_SIZE_GROUP, OxiAppConstants.EntityTypes.SIZE_GROUP, 'entities');
export const replaceSizeCharts	= makeActionCreator(REPLACE_SIZE_CHART, OxiAppConstants.EntityTypes.SIZE_CHART, 'entities');

export const selectAddedOutfit 	= makeActionCreator(SELECT_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'id');
export const selectAddedContent = makeActionCreator(SELECT_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'id');

export const removeAddedOutfit	= makeActionCreator(REMOVE_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'id');
export const removeAddedContent = makeActionCreator(REMOVE_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'id');
export const removeAddedItem	= makeActionCreator(REMOVE_ITEM, OxiAppConstants.EntityTypes.ITEM, 'id');

export const disableAddOutfit 	= makeActionCreator(DISABLE_BUTTON, null, 'disabled');
export const disableAddContentButton = makeActionCreator(DISABLE_CONTENT_BUTTON, null, 'disabled');

export const updateOutfitCoverpicuri = makeActionCreator(UPDATE_OUTFIT_COVERPICURI, OxiAppConstants.EntityTypes.OUTFIT, 'entity');

export const createApparelTypes = makeActionCreator(CREATE_APPAREL_TYPE, OxiAppConstants.EntityTypes.APPAREL_TYPE, 'entities');
export const replaceApparelTypes = makeActionCreator(REPLACE_APPAREL_TYPE, OxiAppConstants.EntityTypes.APPAREL_TYPE, 'entities');

export const receivedSearchExistingItem = makeActionCreator(RECEIVED_EXISTING_ITEMS_SEARCH, null, 'retailerItemResults');
export const receivedSearchRetailers = makeActionCreator(RECEIVED_RETAILER_NAMES_SEARCH, null, 'retailerNameResults');
export const receivedSearchUserDefinedRetailers = makeActionCreator(RECEIVED_UDR_NAMES_SEARCH, null, 'udrNameResults');
export const receivedSearchUserDefinedSizes = makeActionCreator(RECEIVED_UDS_LABELS_SEARCH, null, 'udsLabelResults');
export const receivedAllApparelTypes = makeActionCreator(RECEIVED_ALL_APPAREL_TYPES, null, 'allApparelTypes');
export const receivedSizeGroupsByItemId = makeActionCreator(RECEIVED_SIZE_GROUPS_BY_ITEM_ID, null, 'sizeResults');

export const setPreviewFocus = makeActionCreator(SET_PREVIEW_FOCUS, null, 'isFocusedPreview');
export const unsetPreviewFocus = makeActionCreator(UNSET_PREVIEW_FOCUS, null, 'isFocusedPreview');


//PROFILE Actions
export const addProfile = (profileData) => {
	let completeData = Object.assign({}, defaultProfileData, profileData)
	return({
		type: ADD_PROFILE,
		typeSpecifier: OxiAppConstants.EntityTypes.PROFILE,
		payload: {
			entity: completeData
		}

	});
};

//removes all profile entities from addedEntitiesReducer
export const removeProfile = makeActionCreator(REMOVE_PROFILE, OxiAppConstants.EntityTypes.PROFILE, "id");
export const modifyProfile = makeActionCreator(MODIFY_PROFILE, OxiAppConstants.EntityTypes.PROFILE, "entity");

export const cookies = new Cookies();

const postConfig = (url, data) => {
	//let authScheme = cookies.get('auth_scheme') !== null ? cookies.get('auth_scheme') : '';
	//let authToken = '';// cookies.get('auth_token') !== null ? cookies.get('auth_token') : '';
	return {
		method: 'POST',
		//headers: {'content-type': 'application/x-www-form-urlencoded'},
		//data: qs.stringify(data),
		headers:{
			//'content-type': 'application/x-www-form-urlencoded',
			'content-type': 'application/json;charset=UTF-8',
			//'Authorization':(authScheme + authToken)
		},
		data: data,
		url
	};
}

export const loginConfig = (username, password) => {
	return postConfig(
		OxiAppConstants.apiBaseURL + '/login',
		{
			//'X-CSRF-TOKEN' : cookies.get('csrf_token'),
			'username' : username,
			'password' : password
		}
	);
}

//Sets the navigation location in application state.  This is refered back to in the event of a dipatched confirmation or login modal during site navigation
export const requestNavigation = makeActionCreator(REQUEST_NAVIGATION, null, 'location');

//Thunks dispatched by anonymous callback functions passed to Axios request interceptor
export function handleUnauthorizedRequest(response){
	return function(dispatch){
		console.log('response', response);
		if(response.status === OxiAppConstants.HttpStatus.UNAUTHORIZED || response.status === OxiAppConstants.HttpStatus.REDIRECT){
			console.log('Setting new csrf token');
			console.log(response.headers['x-csrf-token']);
			cookies.set('csrf_token', response.headers['x-csrf-token']);
			cookies.set('authorization', response.headers['www-authenticate'] + ' ');
			axios.defaults.headers.common['authorization'] = cookies.get('authorization'); 
			dispatch(setFormVisibility("Login", response.request.responseURL, response.config.method));
			return response;
		}
		return response;
	}	
};

//Thunks dispatched by anonymous callback functions passed to Axios response interceptor
export const insertCsrfToken = (config) => {
	console.log("Adding to request headers the csrf_token stored in cookies");
	console.log(cookies.get('csrf_token'));
	if(cookies.get('csrf_token') !== null){
		console.log("csrf_token in cookies is not null");
		config['X-CSRF-TOKEN'] = cookies.get('csrf_token')		
	}
	return config;
};

//---------------------------------------------------------------------------------------------------------------------------------------
//ASYNCHRONOUS Actions
//export const requestLogin = makeActionCreator(REQUEST_LOGIN, "", 'usersname', 'password');
//export const requestEntities = makeActionCreator(REQUEST_ENTITIES, "", '');

/*export const receiveProfile = makeActionCreator(RECEIVED_PROFILE, OxiAppConstants.EntityTypes.PROFILE, '' );
export const receiveOutfit = makeActionCreator(RECEIVED_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, '' );
export const receiveContent = makeActionCreator(RECEIVED_CONTENT, OxiAppConstants.EntityTypes.CONTENT, '' );
export const receiveItem = makeActionCreator(RECEIVED_ITEM, OxiAppConstants.EntityTypes.ITEM, '' );
export const receivePicture = makeActionCreator(RECEIVED_PICTURE, OxiAppConstants.EntityTypes.PICTURE, '' );
export const receiveRetailer = makeActionCreator(RECEIVED_RETAILER, OxiAppConstants.EntityTypes.RETAILER, '' );
export const receiveBrand = makeActionCreator(RECEIVED_BRAND, OxiAppConstants.EntityTypes.BRAND, '' );*/


//======== GENERIC LIST ACTIONS ========

export const addToList = (listType, listElement) => {
	return function(dispatch){
		dispatch(makeActionCreator(`ADD_${listType.toUpperCase()}`, listType.toUpperCase(), 'id')(listElement));
	}
} 

export const removeFromList = (listType, listElement) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REMOVE_${listType.toUpperCase()}`, listType.toUpperCase(), 'id')(listElement));
	}
}

export const clearList = (listType, listElement) => {
	return function(dispatch){
		dispatch(makeActionCreator(`CLEAR_${listType.toUpperCase()}`, listType.toUpperCase(), 'id')(listElement));
	}
}

export const updateList = (listType, listElement) => {
	return function(dispatch){
		dispatch(makeActionCreator(`UPDATE_${listType.toUpperCase()}`, listType.toUpperCase(), 'id')(listElement));
	}
}


//======== GENERIC MAP ACTIONS ========

export const addToMap = (mapType, ...keyValuePair) => {
	return function(dispatch){
		dispatch(makeActionCreator(`PUT_TO_${mapType.toUpperCase()}`, mapType.toUpperCase(), 'itemId', 'createdOn')(keyValuePair[0], keyValuePair[1]));
	}
}

export const replaceMap = (mapType, newMap) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REPLACE_${mapType.toUpperCase()}`, mapType.toUpperCase(), 'newMap')(newMap));
	}
}

export const removeFromMap = (mapType, itemId) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REMOVE_FROM_${mapType.toUpperCase()}`, mapType.toUpperCase(), 'itemId')(itemId));
	}
}


//========================================

export const receiveEntitiesTest = (entityType, data) => {
	dispatch(makeActionCreator(`RECEIVED_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'receivedAt')(data));
}

export const updatePrevSelectedEntity = (entityType, entityId) => {
	return function(dispatch){
		dispatch(makeActionCreator(`UPDATE_PREV_SELECTED_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'prevSelected')(entityId));
	}	
}

export const selectEntity = (entityType, entityId) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SELECT_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'selected')(entityId));
	}
}

export const selectMultipleEntity = (entityType, entityId) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SELECT_MUL_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'selected')(entityId));
	}
}

export const deselectMultipleEntity = (entityType, entityId) => {
	return function(dispatch){
		dispatch(makeActionCreator(`DESELECT_MUL_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'selected')(entityId));
	}
}

export const clearSelectMultipleEntity = (entityType) => {
	return function(dispatch){
		dispatch(makeActionCreator(`CLEAR_SELECT_MUL_${entityType.toUpperCase()}`, entityType.toUpperCase())());
	}
}


//======== Popup Menu Actions ======== 

export const showMenu = (menuType, isVisible) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SET_VISIBLE_${menuType.toUpperCase()}`, menuType.toUpperCase(), 'isVisible')(isVisible));
	}
}

export const placeMenu = (menuType, positionx, positiony) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SET_POSITION_${menuType.toUpperCase()}`, menuType.toUpperCase(), 'positionx', 'positiony')(positionx, positiony));
	}
}


//======== ADDED ENTITIES ACTIONS ========

export const removeEntity = (entityType, entityId) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REMOVE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'id')(entityId));
	}
}

//Removes a multiple entities specified by entityIds array from the addedEntitiesReducer state tree
export const removeEntities = (entityType, entityIds) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REMOVE_MULTIPLE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'ids')(entityIds));
	}
}

//Remove all entities from the addedEntitiesReducer state tree
export const removeAllEntities = (entityType) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REMOVE_ALL_${entityType.toUpperCase()}`, entityType.toUpperCase())());
	}
}


//======== ADDED ENTITIES ACTIONS ========

//Removes a single entity from the addedEntitiesReducer state tree
export const removeAddedEntity = (entityType, entityId) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REMOVE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'id')(entityId));
	}
}

//Removes a multiple entities specified by entityIds array from the addedEntitiesReducer state tree
export const removeAddedEntities = (entityType, entityIds) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REMOVE_MULTIPLE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'ids')(entityIds));
	}
}

//Remove all entities from the addedEntitiesReducer state tree
export const removeAllAddedEntities = (entityType) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REMOVE_ALL_ADDED_${entityType.toUpperCase()}`, entityType.toUpperCase())());
	}
}


//======== EDITTING IDS ACITONS ========


//appends the given id to the specified entityType's allEdittingIds state array
export const addToEdittingIds = (entityType, entityId) => {
	return function(dispatch){
		dispatch(makeActionCreator(`ADD_TO_${entityType.toUpperCase()}_EDITTING_IDS`, entityType.toUpperCase(), 'id')(entityId));
	}
};

//replaces the array of ids to the specified entityType's allEdittingIds state array
export const replaceEdittingIds = (entityType, entityIds) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REPLACE_${entityType.toUpperCase()}_EDITTING_IDS`, entityType.toUpperCase(), 'ids')(entityIds));
	}
};

//clears the array of ids to the specified entityType's allEdittingIds state array
export const clearEdittingIds = (entityType) => {
	return function(dispatch){
		dispatch(makeActionCreator(`CLEAR_${entityType.toUpperCase()}_EDITTING_IDS`, entityType.toUpperCase())());
	}
};


//========CLIENT INVALIDATION ACTIONS========

//add specified entityIds to the clientInvalidated Leaf of entitiesStateReducer
export const clientInvalidateEntities = (entityType, entityIds=[]) => {
	return function(dispatch){
		dispatch(makeActionCreator(`CLIENT_INVALIDATE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'ids')(entityIds));
	}
};
//Remove specified entityIds from the clientInvalidated Leaf of entitiesStateReducer
export const removeClientInvalidation = (entityType, entityIds=[]) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REMOVE_CLIENT_INVALIDATE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'ids')(entityIds));
	}
};
//Remove all entityIds from the clientInvalidated Leaf of entitiesStateReducer
export const clearClientInvalidation = (entityType) => {
	return function(dispatch){
		dispatch(makeActionCreator(`CLEAR_CLIENT_INVALIDATE_${entityType.toUpperCase()}`, entityType.toUpperCase())());
	}
};


//========CLIENT PAGING ACTIONS========

//add specified entityIds to the clientInvalidated Leaf of entitiesStateReducer
export const setEntityCurrentPage = (entityType, pageNumber) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SET_CURRENT_PAGE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'currentPage')(pageNumber));
	}
};
//Remove specified entityIds from the clientInvalidated Leaf of entitiesStateReducer
export const setEntityLastPage = (entityType, pageNumber) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SET_LAST_PAGE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'lastPage')(pageNumber));
	}
};
//add {page:ids} to tail of pages object
/*export const pageEntityDown = (entityType, ids) => {
	return function(dispatch){
		dispatch(makeActionCreator(`PAGE_BUFFER_DOWN_${entityType.toUpperCase()}`, entityType.toUpperCase('ids'))(ids));
	}
};
//remove {page:ids} from tail of pages object
export const pageEntityUp = (entityType, ids) => {
	return function(dispatch){
		dispatch(makeActionCreator(`PAGE_BUFFER_UP_${entityType.toUpperCase()}`, entityType.toUpperCase('ids'))(ids));
	}
};*/
export const modifyPagedEntityIds = (entityType, page, ids) => {
	return function(dispatch){
		dispatch(makeActionCreator(`MODIFY_PAGED_${entityType.toUpperCase()}`, entityType.toUpperCase(), `${page}`)(ids));
	}
}
//Set maxBufferedPages
export const setPageBuffer = (entityType, pages) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SET_PAGE_BUFFER_SIZE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'pageBufferSize')(pages));
	}
};

export const receiveEntities = (entityType, error) => {
	return function(dispatch){
		dispatch(makeActionCreator(`RECEIVE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'receivedAt', 'error')(Date.now(), error));
	}
}

export const requestEntities = (entityType) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REQUEST_${entityType.toUpperCase()}`, entityType.toUpperCase())());
	}
}

export const setNextPageURL = (entityType, URL) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SET_NEXT_${entityType.toUpperCase()}_PAGE_URL`, entityType.toUpperCase(), 'nextPageURL')(URL));
	}
}

export const setPrevPageURL = (entityType, URL) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SET_PREV_${entityType.toUpperCase()}_PAGE_URL`, entityType.toUpperCase(), 'prevPageURL')(URL));
	}
}

export const setCurrentEntityPage = (entityType, page) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SET_CURRENT_${entityType.toUpperCase()}_PAGE`, entityType.toUpperCase(), 'currentPage')(page));
	}
}

export const setEntityScrollPageHeight = (entityType, scrollPageHeight) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SET_${entityType.toUpperCase()}_SCROLL_PAGE_HEIGHT`, entityType.toUpperCase(), 'scrollPageHeight')(scrollPageHeight));
	}
}



//========CLIENT INVALIDATION ACTIONS========

//add specified entityIds to the clientInvalidated Leaf of entitiesStateReducer
export const clientDeleteEntities = (entityType, entityIds=[]) => {
	return function(dispatch){
		dispatch(makeActionCreator(`CLIENT_DELETE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'ids')(entityIds));
	}
};
//Remove specified entityIds from the clientInvalidated Leaf of entitiesStateReducer
export const removeClientDeleteEntities = (entityType, entityIds=[]) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REMOVE_CLIENT_DELETE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'ids')(entityIds));
	}
};
//Remove all entityIds from the clientInvalidated Leaf of entitiesStateReducer
export const clearClientDeleteEntities = (entityType) => {
	return function(dispatch){
		dispatch(makeActionCreator(`CLEAR_CLIENT_DELETE_${entityType.toUpperCase()}`, entityType.toUpperCase())());
	}
};


//========SERVER INVALIDATION ACTIONS========

//add specified entityIds to the serverInvalidation Leaf of entitiesStateReducer
export const serverInvalidateEntities = (entityType, entityIds=[]) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SERVER_INVALIDATE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'ids')(entityIds));
	}
};
//Remove specified entityIds from the serverInvalidated Leaf of entitiesStateReducer
export const removeServerInvalidation = (entityType, entityIds=[]) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REMOVE_SERVER_INVALIDATION_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'ids')(entityIds));
	}
};
//Remove all entityIds from the serverInvalidated Leaf of entitiesStateReducer
export const clearServerInvalidation = (entityType) => {
	return function(dispatch){
		dispatch(makeActionCreator(`CLEAR_SERVER_INVALIDATION_${entityType.toUpperCase()}`, entityType.toUpperCase())());
	}
};


//========ENTITY PROPERTIES MODIFICATION ACTIONS========

//modifiedProperties is of the form {[targetEntityId]:{ ...<properties modified> }}
export const modifyEntityProperties = (entityType, modifiedProperties={} ) => {
	return function(dispatch){
		dispatch(makeActionCreator(`MODIFY_${entityType.toUpperCase()}_PROPERITIES`, entityType.toUpperCase(), 'modifiedProperties')(modifiedProperties));
	}
} 


//========ENTITY PAGED IDS MODIFICATION ACTIONS========



/*export const receiveEntities = (entityType, json, error) => {
	return(error ? {
		type: RECEIVE_ENTITIES,
		payload:{
			entityType: entityType.toLowerCase(),
			entities: json.entities,
			receivedAt: Date.now(),
			isFetching: false,
			error: true,
		} :
		{
			type: RECEIVE_ENTITIES,
			payload:{
				entityType: entityType.toLowerCase(),
				entities: json.entities,
				receivedAt: Date.now(),
				isFetching: false,
				error: false,
			}
		} 
	});
};*/
/*
export const requestEntities = (entityType) => {
	return({
		type: REQUEST_ENTITIES,
		payload:{
			entityType: entityType.toLowerCase(),
			isFetching: true,
		} 
	});
};*/

export const showProfileMenu = (shown) => {
	return({
		type: SET_LP_PROFILE_MENU,
		payload:{
			'profileMenu':shown
		}
	})
}

export const setCreateAccountView = (accountType) => {
	return({
		type: SET_LP_CREATE_ACCOUNT_VIEW,
		payload: {
			'createAccountView': accountType
		}
	});
}

function selectDestination(location, dispatch, isOwnerProfileEntityPresent){
	console.log('destination = ', location)
	switch(location){
		case OxiAppConstants.navRequestMap.a.toLowerCase():

			dispatch(setWebAppView(location));
			//Fetch all entities.  
			//TODO:  filtered fetch via queary parameters
			
			isOwnerProfileEntityPresent ? null : dispatch(fetchEntities(OxiAppConstants.EntityTypes.PROFILE, '', ''));
			dispatch(fetchEntities(OxiAppConstants.EntityTypes.OUTFIT, '', 'all'));
			dispatch(unsetPreviewFocus());
			break;
		case OxiAppConstants.navRequestMap.b.toLowerCase():
			console.log('about to dispatch fetchItemMenus()')
			//Get the Brand and Retailer Lists
			dispatch(fetchItemMenus()).then((response) => {
				//dispatch(deselectAndPropogate(OxiAppConstants.EntityTypes.OUTFIT));
				dispatch(fetchEntities(OxiAppConstants.EntityTypes.OUTFIT, '', ''));
				dispatch(fetchEntities(OxiAppConstants.EntityTypes.PROFILE, '', ''));			
			}).then(response => {
				dispatch(setWebAppView(location));	
			}).catch((error) => {
				console.log('exception occured within dispatch to fetchItemMenus.  Reason is: ', error);
				dispatch(handleUnauthorizedRequest(error.response));
			})
			
			dispatch(unsetPreviewFocus());
			break;
		case OxiAppConstants.navRequestMap.c.toLowerCase():
			dispatch(showProfileMenu(true));
			//dispatch(setWebAppView('landing'));
			dispatch(unsetPreviewFocus());
			break;
		default:
			break;
	}
}

export function navigateTo(location, isOwnerProfileEntityPresent){
	return function(dispatch, getState){
		console.log('in navigateTo()')
		dispatch(requestNavigation(location))
		//Check if user is in EditView mode and, if so, validate nav action
		//TDOO:  below seems hacky sacky...	
		if(getState().appView.webAppView === OxiAppConstants.navRequestMap.b.toLowerCase() && getState().contentViewState.viewState !== OxiAppConstants.viewState.PREVIEW){
			dispatch(verifyIntent(OxiAppConstants.Intent.DISCARD_EDITS))
		}else{
			dispatch(selectEntity(OxiAppConstants.EntityTypes.ITEM, false));
			dispatch(selectEntity(OxiAppConstants.EntityTypes.CONTENT, false));
			dispatch(selectEntity(OxiAppConstants.EntityTypes.OUTFIT, false));

			dispatch(removeAllEntities(OxiAppConstants.EntityTypes.ITEM_CONTENT));
			dispatch(removeAllEntities(OxiAppConstants.EntityTypes.CONTENT));
			dispatch(removeAllEntities(OxiAppConstants.EntityTypes.ITEM));
			dispatch(removeAllEntities(OxiAppConstants.EntityTypes.OUTFIT));

			selectDestination(location, dispatch, isOwnerProfileEntityPresent);
			dispatch(requestNavigation(null));
		}/*
		}).then((response) => {
			console.log('about to call select Navigation')
			selectDestination(location, dispatch)
		}).catch((reason) => {
			console.log('caught exception in navigatTo():', reason)			
			switch(reason){
				case OxiAppConstants.NavigationException.USER_CANCELED:
					//dispatch(setFormVisibility(null));
					console.log('navigation to ' + location + 'canceled by user');	
					break;
				case OxiAppConstants.NavigationException.USER_SUBMITTED:					
					selectDestination(location, dispatch)
					break;
				default:
					break;			
			}
		});*/
	}
}

//Create User account, then logs the user in with created user account credentials.
//TODO:  this should be replaced with an email verification login on initial account creation.
export function createUser(email, password, username){
	return function(dispatch){
		return axios.post(OxiAppConstants.apiBaseURL + '/account/user/register', {			
			'email': email,
			'password': password,
			'username': username			
		})
		.then(response => {
			if(response.status === OxiAppConstants.HttpStatus.CONFLICT){
				//dispatch 409 handler
			}else if(response.status === OxiAppConstants.HttpStatus.OK || response.status === OxiAppConstants.HttpStatus.CREATED){
				//save _csrf token in cookies
				console.log('response headers: ');
				console.log(response);
				cookies.set('csrf_token', response.headers['x-csrf-token']);
				//Log user in
				console.log('skipping login')
				//axios(loginConfig(username, password))
				//.then(response => {
				//	if(response.status === OxiAppConstants.HttpStatus.OK){
				//		//append the authorization token expected in the 200 /login response onto the defualt Authorization header
				//		cookies.set('authorization', `${response.headers['www-authenticate']} ${response.headers['authorization']}`);
				//		console.log('www-authenticate = ', response.headers['www-authenticate']);
				//		axios.defaults.headers.common['authorization'] = cookies.get('authorization');
				//		console.log('username = ', username);
				//		//create a new profile with provisioned username in redux store
				//		dispatch(addProfile(Object.assign({}, {'username': username}, response.data)));
				//		dispatch(showProfileMenu(true));
				//	}else{
				//		console.log("Could not sign in")
				//	}
				//});
			}
		})
		//.then(response => callback(event, response));		
	}
}

export function createCompany(formData){
	return function(dispatch){
		
		return axios.post(OxiAppConstants.apiBaseURL + '/account/retailer/register', (({email, password, companyName, country, state, city, address1, address2}) => ({email, password, companyName, country, state, city, address1, address2}))(formData) )
		.then(response => {
			if(response.status === OxiAppConstants.HttpStatus.CONFLICT){
				//dispatch 409 handler
			}else if(response.status === OxiAppConstants.HttpStatus.OK || response.status === OxiAppConstants.HttpStatus.CREATED){
				//save _csrf token in cookies
				console.log('response headers: ');
				console.log(response);
				cookies.set('csrf_token', response.headers['x-csrf-token']);
				//Log user in
				console.log('skipping login')
				
				//axios.post(OxiAppConstants.apiBaseURL + '/retailer/createAccount', (({country, state, city, address1, address2}) => ({country, state, city, address1, address2}))(formData) )
				//.then(response =>{
				//	if(response.status === OxiAppConstants.HttpStatus.CONFLICT){
				//		//dispatch 409 handler
				//	}else if(response.status === OxiAppConstants.HttpStatus.OK || response.status === OxiAppConstants.HttpStatus.CREATED){
				//		//save _csrf token in cookies
				//	}
				//})
			}
		})
		//.then(response => callback(event, response));		
	}
}

//Post new profile entities to the server.  There should only ever be one profile entity,
//however support for multiple profile entities is implemented here
export function postProfile(profile){
	return function(dispatch){
		//keep loacal ids
		let id = profile.id;
		
		//strip local ids from all profile entities
		profile.id = '';
		return axios.put(OxiAppConstants.serviceURL + '/profile',
			//denormalize(profile, profileSchema, {});
			profile
		).then(response => {
			if(response.status == OxiAppConstants.HttpStatus.CREATED){
				console.log("dispatching removeProfile");
				//Change switch to profile view
				//dispatch(setWebAppView('profile'));
				dispatch(navigateTo(OxiAppConstants.navRequestMap.b.toLowerCase()));
				//Add new profile data returned in the response body to the redux tree
				dispatch(replaceProfile({'owner': response.data}));
				//populate the profile view with usr content
				///dispatch(fetchEntities('outfit', response.data.id));
				//remove the sent profile from local addedEntitesReducer store
				dispatch(removeProfile(id));
			}
		})
	}
}

export function postSaveItem(itemId, onSuccess){
	let itemID = itemId.toUpperCase();
	return function(dispatch){
		return axios.post(`${OxiAppConstants.serviceURL}/bookmark/${itemId}`, {}).then(response => {
			if(response.status == OxiAppConstants.HttpStatus.CREATED){
				dispatch(addToMap(OxiAppConstants.MapTypes.a, itemID, response.data));
			}else{
				console.log("request failed");
			}
		});
	}
}

export function deleteSavedItem(itemId, onSuccess){
	let itemID = itemId.toUpperCase();
	return function(dispatch){
		return axios.delete(`${OxiAppConstants.serviceURL}/bookmark/${itemId}`, { data: {} }).then(response => {
			if(response.status == OxiAppConstants.HttpStatus.OK){
				dispatch(removeFromMap(OxiAppConstants.MapTypes.a, itemID));
			}else{
				console.log("request failed");
			}
		});
	}
}

export function getSavedItems(){
	return function(dispatch){
		return axios.get(`${OxiAppConstants.serviceURL}/bookmarks`).then(response => {
			if(response.status == OxiAppConstants.HttpStatus.OK){
				dispatch(replaceMap(OxiAppConstants.MapTypes.a, response.data));
			}else{
				console.log("request failed");
			}
		})
	}
}

export function fetchMetrics(outfitId){
	return function(dispatch){
		dispatch(requestEntities(OxiAppConstants.EntityTypes.PROFILE));
		//Check outfit Id is valid
		return axios.get(OxiAppConstants.serviceURL + '/profile?filter=' + outfitId)
		.then((response) => {
			if(response.status === OxiAppConstants.HttpStatus.OK){
				//The return entity is not nested so we do not need to make calls to normalizr before dropping into redux tree
				dispatch(receiveEntities(OxiAppConstants.EntityTypes.PROFILE.toLowerCase(), null));
				dispatch(replaceProfile({'host' : response.data}));

			}
		});
	}
}

export function fetchItemMenus(){
	return function(dispatch){
		return new Promise((resolve, reject) => {
			//dispatch(fetchEntities(OxiAppConstants.EntityTypes.BRAND, '', ''))			
			dispatch(fetchEntities(OxiAppConstants.EntityTypes.APPAREL_TYPE, '', ''))
			.then((response) => {
				resolve();
				//dispatch(fetchEntities(OxiAppConstants.EntityTypes.RETAILER, '', ''))
				//.then(response => resolve())
				//.catch(reason => reject(reason))
			})
			.catch(reason => reject(reason))
		});
	}
}

export function fetchSuggestion(uri){
	return function(dispatch){
		return axios.get(`${OxiAppConstants.serviceURL}${uri}`).then(response => {
			if(response.status === OxiAppConstants.HttpStatus.OK){
				switch(true){
					//searchItems
					case uri.includes(OxiAppConstants.routeURIs.search.a):
						dispatch(receivedSearchExistingItem(response.data));
						break;
					case uri.includes(OxiAppConstants.routeURIs.search.b):
						dispatch(receivedSearchRetailers(response.data));
						break;
					case uri.includes(OxiAppConstants.routeURIs.search.c):
						dispatch(receivedSearchUserDefinedRetailers(response.data));
						break;
					case uri.includes(OxiAppConstants.routeURIs.search.d):
						dispatch(receivedSearchUserDefinedSizes(response.data));
						break;
					//Note this is not a suggest request.  Rather it gets all ApparelTypes
					//TODO:  depricated in favor of single GET requtest for all apparel type resources from sql database when navigating to profile page
					case uri.includes(OxiAppConstants.appUris.a):
						dispatch(receivedAllApparelTypes(response.data));
						break;
					default:
						break;
				}
			}
		})
	}
}

export function getSizeChartByItemId(itemId){
	return function(dispatch){
		return axios.get(`${OxiAppConstants.serviceURL}/sizeChart?itemId=${itemId}`).then(response => {
			if(response.status === OxiAppConstants.HttpStatus.OK){
				dispatch(receivedSizeGroupsByItemId(response.data.sizeGroupDtos))
			}			
		})
	}	
}

export function fetchEntities(entityType, username, filter, linkURL=null, pageStart=0, pageSize=10){
	return function(dispatch){
		dispatch(requestEntities(entityType));
		let URI = '';
		let requestParams = '';
		let customReqParams = '';
		let pageBufferSize = 2;
		let reqResponse = null;

		switch(entityType){
			case OxiAppConstants.EntityTypes.APPAREL_TYPE:
				return axios.get(OxiAppConstants.serviceURL + `/apparelTypes?page=${0}&size=${50}`)
				.then(response => {
					if(response.status === OxiAppConstants.HttpStatus.OK){
						let normalizedJson = response.data._embedded.apparelTypeDtoes.reduce((accumulator, currentObject) => {
							return(Object.assign(accumulator, {
								[currentObject.id]: {
									'id': currentObject.id, 
									'name': currentObject.name,
									'iconName': currentObject.iconName
								}
							}));
						},{});
						console.log('normalizedJson ApparelType:  ', normalizedJson);
						dispatch(receiveEntities(entityType.toLowerCase(), null));
						dispatch(replaceApparelTypes(normalizedJson));
					}else{
						throw 'Unexpected response status received when fetching brands:  ' + response.status; 
					}
				})
				break;
			case OxiAppConstants.EntityTypes.BRAND:
				return axios.get(OxiAppConstants.serviceURL + `/brands?page=${0}&size=${50}`)
				.then(response => {
					if(response.status === OxiAppConstants.HttpStatus.OK){
						let normalizedJson = response.data._embedded.brandDtoes.reduce((accumulator, currentObject) => {
							return(Object.assign(accumulator, {
								[currentObject.id]: {
									'id': currentObject.id, 
									'link': currentObject.link,
									'name': currentObject.name,
									'red': currentObject.red, 
									'green': currentObject.green,
									'blue': currentObject.blue
								}
							}));
						},{});
						console.log('normalizedJson Brand:  ', normalizedJson);
						dispatch(receiveEntities(entityType.toLowerCase(), null));
						dispatch(replaceBrands(normalizedJson));
					}else{
						throw 'Unexpected response status received when fetching brands:  ' + response.status; 
					}
				})
				break;
			case OxiAppConstants.EntityTypes.RETAILER:
				return axios.get(OxiAppConstants.serviceURL + `/retailers?page=${0}&size=${50}`)
				.then(response => {
					if(response.status === OxiAppConstants.HttpStatus.OK){
						let normalizedJson = response.data._embedded.retailerDtoes.reduce((accumulator, currentObject) => {
							return(Object.assign(accumulator, {
								[currentObject.id]: {
									'id': currentObject.id, 
									'link': currentObject.link,
									'name': currentObject.name
								}
							}));
						},{});
						console.log('normalizedJson Retailer:  ', normalizedJson);
						dispatch(receiveEntities(entityType.toLowerCase(), null));
						dispatch(replaceRetailers(normalizedJson));
					}else{
						throw 'Unexpected response status received when fetching retailers:  ' + response.status;
					}
				})
				break;				
			case OxiAppConstants.EntityTypes.PROFILE:
				URI = linkURL ? '' : '/profile';
				return axios.get(`${linkURL || OxiAppConstants.serviceURL}${URI}${username}`)
				.then((response) => {
					if(response.status === OxiAppConstants.HttpStatus.OK){
						//The return entity is not nested so we do not need to make calls to normalizr before dropping into redux tree
						dispatch(receiveEntities(entityType.toLowerCase(), null));
						dispatch(replaceProfile({'owner' : response.data}));

					}
				});
				break;
			case OxiAppConstants.EntityTypes.OUTFIT:
				requestParams = 'filter=' + filter;
				URI = linkURL ? '' : '/outfits';
				username = linkURL ? '' : username;
				console.log(`requestParams = ${requestParams}, URI = ${URI}, username = ${username}, linkURL = ${linkURL}`)
				return axios.get(`${(linkURL || OxiAppConstants.serviceURL)}${URI}${username}?${requestParams}&page=${pageStart}&size=${pageSize}`)
				.then((response) => {
					if(response.status === OxiAppConstants.HttpStatus.OK){
						let json = response.data._embedded.outfitDtoes;//JSON.parse(response.data)._embedded.outfitDtoes;//response.json();
						console.log("json");
						console.log(json);
						dispatch(receiveEntities(entityType.toLowerCase(), null));
						//normalize received json payload
						let normalizedJson = normalize(json, outfitsSchema);						
						console.log('entitiesStateReducer', normalizedJson); 						
						//Manually build itemContents join table
						let itemContentJson = buildItemContentsObject(OxiAppConstants.JsonPropertyNames.OUTFIT, json);
						dispatch(createItemContent(itemContentJson));							

						mergeResponseEntities(dispatch, normalizedJson);
						let outfitKeys = Object.keys(normalizedJson.entities.outfits);
						//selectEntity(OxiAppConstants.EntityTypes.OUTFIT, (outfitKeys.length > 0 ? normalizedJson.entities.outfits[outfitKeys[0]].id : false));
					}else{
						//handleUnauthorizedRequest(response);
					}
				})
				.catch(error => {
					console.log(error);
					if (error.response) {
						// The request was made and the server responded with a status code
						// that falls out of the range of 2xx
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
						//Check if error is due to forbidden response staatus
						dispatch(handleUnauthorizedRequest(error.response));
					} else if (error.request) {
						// The request was made but no response was received
						// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
						// http.ClientRequest in node.js
						console.log(error.request);
					} else {
						// Something happened in setting up the request that triggered an Error
						console.log('Error', error.message);
					}
					console.log(error.config);
				});
				break;
			case OxiAppConstants.EntityTypes.CONTENT:
				requestParams = 'filter=' + filter;
				URI = linkURL ? '' : '/contents';

				return axios.get(`${linkURL || OxiAppConstants.serviceURL}${URI}?${requestParams}&page=${pageStart}&size=${pageSize}`)
				.then((response) => {
					if(response.status === OxiAppConstants.HttpStatus.OK){
						let json = response.data._embedded.outfitDtoes;//JSON.parse(response.data)._embedded.outfitDtoes;//response.json();
						console.log("json");
						console.log(json);
						dispatch(receiveEntities(entityType.toLowerCase(), null));
						//normalize received json payload
						let normalizedJson = normalize(json, outfitsSchema);
						
						console.log('entitiesStateReducer', normalizedJson); 
						
						//Manually build itemContents join table
						let itemContentJson = buildItemContentsObject(OxiAppConstants.JsonPropertyNames.OUTFIT, json);
						dispatch(createItemContent(itemContentJson));							

						mergeResponseEntities(dispatch, normalizedJson);
						let outfitKeys = Object.keys(normalizedJson.entities.outfits);
						//selectEntity(OxiAppConstants.EntityTypes.OUTFIT, (outfitKeys.length > 0 ? normalizedJson.entities.outfits[outfitKeys[0]].id : false));
					}else{
						//handleUnauthorizedRequest(response);
					}
				})
				.catch(error => {
					console.log(error);
					if (error.response) {
						// The request was made and the server responded with a status code
						// that falls out of the range of 2xx
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
						//Check if error is due to forbidden response staatus
						dispatch(handleUnauthorizedRequest(error.response));
					} else if (error.request) {
						// The request was made but no response was received
						// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
						// http.ClientRequest in node.js
						console.log(error.request);
					} else {
						// Something happened in setting up the request that triggered an Error
						console.log('Error', error.message);
					}
					console.log(error.config);
				});
				break;
			case OxiAppConstants.EntityTypes.ITEM:
				URI = linkURL ? '' : '/items';
				customReqParams = (URI === '') ? '' : `?filter=${filter}&page=${pageStart}&size=${pageSize}`;

				return axios.get(`${linkURL || OxiAppConstants.serviceURL}${URI}${customReqParams}`)
				.then((response) => {
					if(response.status === OxiAppConstants.HttpStatus.OK){
						let normalizedJson = response.data._embedded.itemDtoes.reduce((accumulator, currentObject) => {
							return(Object.assign(accumulator, {
								[currentObject.id]: {
									'id': currentObject.id, 
									'type': currentObject.type,
									'size': currentObject.size,
									'retailer': currentObject.retailer,
									'brand': currentObject.brand,
									'coverpicuri':currentObject.coverpicuri,
								}
							}));
						},{});
						console.log('normalizedJson Items:  ', normalizedJson);
						dispatch(receiveEntities(entityType.toLowerCase(), null));
						//dispatch(replaceItems(normalizedJson));
						if(response.data.page !== undefined){
							const {size, totalElements, totalPages, number} = response.data.page;
							console.log(`size = ${size}, totalElements = ${totalElements}, totalPages = ${totalPages}, number = ${number}`);

							dispatch(setEntityCurrentPage(OxiAppConstants.EntityTypes.ITEM, number));
							dispatch(setEntityLastPage(OxiAppConstants.EntityTypes.ITEM, totalPages - 1));
							dispatch(modifyPagedEntityIds(OxiAppConstants.EntityTypes.ITEM, number, Object.keys(normalizedJson)));
							//dispatch(setCurrentEntityPage(OxiAppConstants.EntityTypes.ITEM, number));
						}

						//TODO: this is makes unecessary calls to redux store.  setting page URL should be handled in the PageList component, but Im not sure how to extract 
						//		response data from the dispatch call in PageListContainer.  quick fix is to set the values here then reset them with the corred page number in
						//		PageList component :(
						if(linkURL === null){
							if(response.data._links !== undefined){
								response.data._links.next ? 
									dispatch(setNextPageURL(OxiAppConstants.EntityTypes.ITEM, response.data._links.next.href)) : 
									dispatch(setNextPageURL(OxiAppConstants.EntityTypes.ITEM, null));
								!response.data._links.prev ? 
									dispatch(setPrevPageURL(OxiAppConstants.EntityTypes.ITEM, null)) :
									dispatch(setPrevPageURL(OxiAppConstants.EntityTypes.ITEM, response.data._links.prev.href)) 
							}
						}
							
						//mergeResponseEntities(dispatch, {'entities': {'items': normalizedJson}}); //TODO clean this up.  Use schema
						dispatch(replaceItems(normalizedJson));
					}else{
						throw 'Unexpected response status received when fetching retailers:  ' + response.status;
					}
					return response;
				})
				.catch(error => {
					console.log(error);
					if (error.response) {
						// The request was made and the server responded with a status code
						// that falls out of the range of 2xx
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
						//Check if error is due to forbidden response staatus
						dispatch(handleUnauthorizedRequest(error.response));
					} else if (error.request) {
						// The request was made but no response was received
						// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
						// http.ClientRequest in node.js
						console.log(error.request);
					} else {
						// Something happened in setting up the request that triggered an Error
						console.log('Error', error.message);
					}
					console.log(error.config);
				});
				//console.log('response in thunk = ',getPromise);
				break;
			default:
				break;
		}
	}
}

export const fetchContentsByItemId = (itemId, linkURL=null, pageStart=0, pageSize=50) => {
	return function(dispatch){
		dispatch(requestEntities(OxiAppConstants.EntityTypes.CONTENT));
		let pageStart = 0;
		let pageSize = 9;
		let pageBufferSize = 2;
		let URI = linkURL ? '' : `/contents/items/${itemId}`;
		return axios.get(`${linkURL || OxiAppConstants.serviceURL}${URI}?page=${pageStart}&size=${pageSize}`)
		.then((response) => {
			if(response.status === OxiAppConstants.HttpStatus.OK){
				let json = response.data._embedded.contentDtoes;//JSON.parse(response.data)._embedded.outfitDtoes;//response.json();
				console.log("json");
				console.log(json);
				dispatch(receiveEntities(OxiAppConstants.EntityTypes.CONTENT.toLowerCase(), null));
				//normalize received json payload
				let normalizedJson = normalize(json, contents);

				console.log('entitiesStateReducer', normalizedJson); 
				
				//Manually build itemContents join table
				//let itemContentJson = buildItemContentsObject(OxiAppConstants.JsonPropertyNames.CONTENT, json);
				//dispatch(createItemContent(itemContentJson));							
	

				if(response.data.page !== undefined){
					const {size, totalElements, totalPages, number} = response.data.page;
					console.log(`size = ${size}, totalElements = ${totalElements}, totalPages = ${totalPages}, number = ${number}`);

					dispatch(setEntityCurrentPage(OxiAppConstants.EntityTypes.CONTENT, number));
					dispatch(setEntityLastPage(OxiAppConstants.EntityTypes.CONTENT, totalPages - 1));
					dispatch(modifyPagedEntityIds(OxiAppConstants.EntityTypes.CONTENT, number, Object.keys(normalizedJson.entities.contents)));
					//dispatch(setCurrentEntityPage(OxiAppConstants.EntityTypes.ITEM, number));
				}


				//mergeResponseEntities(dispatch, normalizedJson);
				//dispatch(replaceContents(normalizedJson.entities.contents));
				dispatch(createContent(normalizedJson.entities.contents));
				dispatch(createPictures(normalizedJson.entities.picture))
				/*let contentKeys = Object.keys(normalizedJson.entities.contents);
				contentKeys ? modifyPagedEntityIds(OxiAppConstants.EntityTypes.CONTENT, page, contentKeys) : null*/
				//selectEntity(OxiAppConstants.EntityTypes.OUTFIT, (outfitKeys.length > 0 ? normalizedJson.entities.outfits[outfitKeys[0]].id : false));
			}else{
				//handleUnauthorizedRequest(response);
			}
		})
		.catch(error => {
			console.log(error);
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
				//Check if error is due to forbidden response staatus
				dispatch(handleUnauthorizedRequest(error.response));
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}
			console.log(error.config);
		});
	}
}

export const patchEntity = (entityType, payload) => {
		return function(dispatch){
			dispatch(requestEntities(entityType));
			let URI = '';
			let requestParams = '';
			let customReqParams = '';
			let pageBufferSize = 2;
			let reqResponse = null;
	
			switch(entityType){
				case OxiAppConstants.EntityTypes.OUTFIT:
					URI = '/outfit' + `/${payload.id}`;
					return axios.patch(`${(OxiAppConstants.serviceURL)}${URI}`, payload)
					.then((response) => {
						if(response.status === OxiAppConstants.HttpStatus.OK){
							dispatch(receiveEntities(entityType.toLowerCase(), null));
						}else{
							//handleUnauthorizedRequest(response);
						}
					})
					.catch(error => {
						console.log(error);
						if (error.response) {
							// The request was made and the server responded with a status code
							// that falls out of the range of 2xx
							console.log(error.response.data);
							console.log(error.response.status);
							console.log(error.response.headers);
							//Check if error is due to forbidden response staatus
							dispatch(handleUnauthorizedRequest(error.response));
						} else if (error.request) {
							// The request was made but no response was received
							// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
							// http.ClientRequest in node.js
							console.log(error.request);
						} else {
							// Something happened in setting up the request that triggered an Error
							console.log('Error', error.message);
						}
						console.log(error.config);
					});
					break;				
				default:
					break;
		}
	}
}

export function mergeResponseEntities(dispatch, normalizedJson){
	let containsContents = false;
	let containsOutfits = false;
	let keys = Object.keys(normalizedJson.entities);
	//let containsItems = false;
	for(let entity of keys){
		switch(entity){
			case OxiAppConstants.JsonPropertyNames.OUTFIT:
	
				containsOutfits = true;
				dispatch(replaceOutfits(normalizedJson.entities[entity]));	
				break;
	
			case OxiAppConstants.JsonPropertyNames.CONTENT:
	
				containsContents = true;
				dispatch(replaceContents(normalizedJson.entities[entity]));	
				break;	
	
			case OxiAppConstants.JsonPropertyNames.ITEM:
	
				dispatch(replaceItems(normalizedJson.entities[entity]));
				break;
	
			case OxiAppConstants.JsonPropertyNames.PICTURE:
	
				dispatch(replacePictures(normalizedJson.entities[entity]));
				break;
	
			case OxiAppConstants.JsonPropertyNames.SIZE_CHART:
	
				dispatch(replaceSizeCharts(normalizedJson.entities[entity]));
				break;
	
			case OxiAppConstants.JsonPropertyNames.SIZE_GROUP:
	
				dispatch(replaceSizeGroups(normalizedJson.entities[entity]));
				break;
	
			default:
				break;
		}
	}
	//select the first outfit if it exists
	if(containsOutfits){
		let outfitKeys = Object.keys(normalizedJson.entities["outfits"]);		
		if (outfitKeys.length > 0) dispatch(selectEntity(OxiAppConstants.EntityTypes.OUTFIT, outfitKeys[0]));		
		//select the first content if it exist
		if(containsContents){
			let contentKeys = Object.keys(normalizedJson.entities["contents"]);
			if (contentKeys.length > 0) dispatch(selectEntity(OxiAppConstants.EntityTypes.CONTENT, contentKeys[0]));
		}
	}
}

export function verifyIntent(intentTo){
	return function(dispatch){
		switch(intentTo){
			case OxiAppConstants.Intent.DISCARD_EDITS:
				dispatch(setFormVisibility(OxiAppConstants.FormType.DISCARD_EDITS, null, null));
				break;
			default:
				break;
		}
	}
}

//use this action to batch select nested entities retreived from server
//@param {String} valid entityType from OxiAppConstants.EntityTypes to select
//@param {String} valid id of the entity selected
//@param {STring} valid id of the child entity to be selected next.
export function selectAndPropogate(entityType, entityId, targetChildId, entitiesStateReducer){
	return function(dispatch){
		console.log("selectAndPropogate entityType = ", entityType);
		switch(entityType){
			case OxiAppConstants.EntityTypes.OUTFIT:
				entitiesStateReducer ? 
					dispatch(updatePrevSelectedEntity(OxiAppConstants.EntityTypes.OUTFIT, entitiesStateReducer.outfits.selected)) : 
					dispatch(updatePrevSelectedEntity(OxiAppConstants.EntityTypes.OUTFIT, entityId));

				dispatch(selectEntity(OxiAppConstants.EntityTypes.OUTFIT, entityId));
				//dispatch(selectEntity(OxiAppConstants.EntityTypes.OUTFIT, (entityId || false)));
				console.log("targetChildId = ", targetChildId);
				dispatch(selectAndPropogate(OxiAppConstants.EntityTypes.CONTENT, targetChildId, null, entitiesStateReducer));
				break;
			case OxiAppConstants.EntityTypes.CONTENT:
				entitiesStateReducer ? 
					dispatch(updatePrevSelectedEntity(OxiAppConstants.EntityTypes.CONTENT, entitiesStateReducer.contents.selected)) :
					dispatch(updatePrevSelectedEntity(OxiAppConstants.EntityTypes.CONTENT, entityId));
				dispatch(selectEntity(OxiAppConstants.EntityTypes.CONTENT, entityId));
				break;
			default:
				break
		}
		return;
	}
}

//use this action to batch deselect selected nested entities
//@param {String} valid entityType from OxiAppConstants.EntityTypes to deselect
//@param {String} valid id of the entity deselected
export function deselectAndPropogate(entityType){
	return function(dispatch){
		console.log("selectAndPropogate entityType = ");
		console.log(entityType);
		switch(entityType){
			case OxiAppConstants.EntityTypes.OUTFIT:
				dispatch(selectEntity(OxiAppConstants.EntityTypes.OUTFIT, false));
				dispatch(deselectAndPropogate(OxiAppConstants.EntityTypes.CONTENT));
				break;
			case OxiAppConstants.EntityTypes.CONTENT:
				dispatch(selectEntity(OxiAppConstants.EntityTypes.CONTENT, false));
				dispatch(deselectAndPropogate(OxiAppConstants.EntityTypes.ITEM));
				break;
			case OxiAppConstants.EntityTypes.ITEM:
				dispatch(selectEntity(OxiAppConstants.EntityTypes.ITEM, false));
				break;
			default:
				console.log("no matching entity type");
				return null
		}
		return
	}	
}

//use this action to select entities as they are created on the client.
export function selectAddedEntity(entityType, entityId){
	return function(dispatch){
		console.log("selectAddedEntity");
		console.log(entityType);
		switch(entityType){
			case OxiAppConstants.EntityTypes.OUTFIT:
				dispatch(selectAddedOutfit(entityId));
				return;
			case OxiAppConstants.EntityTypes.CONTENT:
				dispatch(selectAddedContent(entityId));
				return;
			default:
				return
		}
	}
}

/*export function addEntityAndPropogate(entityType, entity){
	switch(entityType){
		case OxiAppConstants.EntityTypes.OUTFIT:
			for(let contentId of entity.contents){
				addEntityAndPropogate(OxiAppConstants.EntityTypes.CONTENT, )				
			}
		case OxiAppConstants.EntityTypes.CONTENT:
		case OxiAppConstants.EntityTypes.ITEM:
		default:
			break;
	}
	return;
}*/

export function clearAllAddedEntitiesState(addedEntities){
	return function(dispatch){
		switch(true){
			case addedEntities.outfits.allIds.length > 0:
				dispatch(removeAllAddedEntities(OxiAppConstants.EntityTypes.OUTFIT));
			case addedEntities.contents.allIds.length > 0:
				dispatch(removeAllAddedEntities(OxiAppConstants.EntityTypes.CONTENT));
			case addedEntities.items.allIds.length > 0:
				dispatch(removeAllAddedEntities(OxiAppConstants.EntityTypes.ITEM));
			case addedEntities.itemContent.allIds.length > 0:
				dispatch(removeAllAddedEntities(OxiAppConstants.EntityTypes.ITEM_CONTENT));
			default:
				return;	
		}
	}
}

export function removeAddedEntityAndPropogate(entityType, entity){
	return function(dispatch){
		//console.log("selectAndPropogate entityType = ", entityType);
		switch(entityType){
			case OxiAppConstants.EntityTypes.OUTFIT:
				//Remove any child entities
				dispatch(selectEntity(entityType, false));
				if(entity.contents){
					for(let content of entity.contents){
						//console.log('removeAddedEntityAndPropogate(): content = ', content)
						if(entity.contents.length > 0) dispatch(removeAddedEntityAndPropogate(OxiAppConstants.EntityTypes.CONTENT, content));
					}
				}
				//console.log('removeAddedEntityAndPropogate():  Removing Outfit with id ', entity.id)
				dispatch(removeAddedOutfit(entity.id));
				break;
			case OxiAppConstants.EntityTypes.CONTENT:
				//Remove any child entities
				dispatch(selectEntity(entityType, false))
				if(entity.items){
					for(let item of entity.items){
						//console.log('removeAddedEntityAndPropogate(): item = ', item)
						if(entity.items.length > 0) dispatch(removeAddedEntityAndPropogate(OxiAppConstants.EntityTypes.ITEM, item));
					}
				}
				//console.log('removeAddedEntityAndPropogate():  Removing Content with id ', entity.id)
				//Remove content
				dispatch(removeAddedContent(entity.id));
				break;
			case OxiAppConstants.EntityTypes.ITEM:
				//console.log('removeAddedEntityAndPropogate():  Removing Item with id ', entity.id)
				//Remove item
				dispatch(removeAddedItem(entity.id));
			default:
				break
		}
		return;
	}
}

//Function called after fetching outfits.
//Selects the first outfit entity and first Content child entity of the returned json after normalization
//entityArray:  	array of entities from which to select the 0th element
//entitytype:  		The type of enity.  Legal types are defined in OxiAppConstants.EntityTypes
/*function selectFirstEntity(entityArray, entityType, dispatch){
	switch(entityType){
		case OxiAppConstants.EntityTypes.OUTFIT:
			dispatch(selectEntity(OxiAppConstants.EntityTypes.OUTFIT, entityArray[0]));
		case OxiAppConstants.EntityTypes.CONTENT:
			dispatch(selectEntity(OxiAppConstants.EntityTypes.CONTENT, entityArray[0]));
	}
	if (entityArray.length > 0){
		dispatch(selectEntity(OxiAppConstants.EntityTypes.CONTENT, entityArray[0]));
	}	
}*/

export function fetchImage(filename, callback, picture){
	return function(dispatch){
		console.log('getting image, filename = ', filename);
		let request = axios.create({
			responseType: 'arraybuffer',
			'Content-Type': 'text/html; charset=utf-8',
			headers:{				
				//'X-Requested-With': 'XMLHttpRequest',
				Accept: 'image/*, application/json',
				//contentType: 'text/html; charset=utf-8'
				mediaType: 'jpeg, json'
			}
		})

		request.get(OxiAppConstants.serviceURL + '/image/' + filename + '?mediaType=jpeg&mediaType=json')
		//Server returns data enclosed in quatations.  Quotations are striped from the ByteArray here and converted utf8 charset.
		.then(response => Buffer.from(response.data, 1, response.data.byteLength-2).toString('utf8'))
		.then(response => callback(null, response, picture));
	}
}

//POST image data to server
export function postImage(imageFile, onSuccess){
	let imageFormData = new FormData();
	imageFormData.append('imageFile', imageFile);
	console.log("in postImage action");
	//TODO:  Check if file name and image aspect ratio is valid
	//return function(dispatch){
		//dispatch(postEntities(json));
		axios.post(
			OxiAppConstants.serviceURL + '/uploadPhoto', 
			imageFormData,
			{
				headers:{
					'Content-Disposition': 'form-data; name=\"imageFile\"',
					'Content-Transfer-Encoding': 'base64',
				}
			}
		)
		.then(response => {
			if(response.status === OxiAppConstants.HttpStatus.CREATED){
				onSuccess()(response.data);
				//postEntities(json, response.data, enityType, onSuccess);
			}else{
				return response.status;
			}
		});
	//}
}

export function putImage(imageFile, contentId, onSuccess){
	let imageFormData = new FormData();
	imageFormData.append('imageFile', imageFile);
	//Currently server does not handle Multipart PUT requests
	axios.post(
		OxiAppConstants.serviceURL + '/updatePhoto/' + contentId, 
		imageFormData,
		{
			headers:{
				'Content-Disposition': 'form-data; name=\"imageFile\"',
				'Content-Transfer-Encoding': 'base64',
			}
		}
	)
	.then(response => {
		if(response.status === OxiAppConstants.HttpStatus.OK){
			onSuccess()(response.data[0]);
			//putEntities(json, response.data, entityType, onSuccess);
		}else{
			return response.status;
		}
	});
}

export function postOutfit(outfitJson, onSuccess){
	return (pictureJson) => {
		//TODO:  this will need to handle multiple content entites for multi-file upload
		axios.post(
			OxiAppConstants.serviceURL + '/outfit',
			Object.assign( {}, outfitJson,  {coverpicuri: pictureJson.smalluri, contents: Object.values( Object.assign( {}, graftPictureJson(outfitJson.contents, [pictureJson] ) ) ) } ),
			{})
		.then(response => {
			if(response.status === OxiAppConstants.HttpStatus.CREATED){
				onSuccess(response, pictureJson);
			}
			return response.status;
		})
	}
}

export function postContent(contentJson, outfitId, onSuccess){
	return (pictureJson) => {
		let pathVariable = outfitId !== '' ? ('/' + outfitId) : '';
		axios.post(
			OxiAppConstants.serviceURL + '/contents' + pathVariable, 
			[ Object.assign({}, graftPictureJson([contentJson], [pictureJson])[0]) ], 
			{})
		.then(response => {
			if(response.status === OxiAppConstants.HttpStatus.CREATED){
				onSuccess(response, pictureJson);
			}
			return response.status;		
		});		
	}
}

export function putContent(contentJson, outfitId, onSuccess){
	return (pictureJson) => {
		let pathVariable = outfitId !== '' ? ('/' + outfitId) : '';
		if(pictureJson !== null){
			console.log('picturejson != null');
			console.log('contentJson = ', contentJson);
			axios.put(
				OxiAppConstants.serviceURL + '/content' + pathVariable, 
				Object.assign({}, graftPictureJson([contentJson], [pictureJson])[0]), 
				{})
			.then(response => {
				if(response.status === OxiAppConstants.HttpStatus.OK){
					onSuccess(response);
				}
				return response.status;		
			});	
		}else{
			console.log('picturejson == null');
			console.log('contentJson = ', contentJson);
			axios.put(
				OxiAppConstants.serviceURL + '/content' + pathVariable, 
				contentJson, 
				{})
			.then(response => {
				if(response.status === OxiAppConstants.HttpStatus.OK){
					onSuccess(response);
				}
				return response.status;		
			});	
		}
	};
}

export function putRemoveItems(payloadJson, outfitId, onSuccess){
	return () => {
		let pathVariable = outfitId !== '' ? ('/' + outfitId) : '';
		console.log('putRemoveItems:  payloadJson = ', payloadJson);
		axios.put(
			OxiAppConstants.serviceURL + '/removeItems' + pathVariable,
			payloadJson,
			{})
		.then(response => {
			if(response.status === OxiAppConstants.HttpStatus.OK){
				onSuccess(response);
			}
			return response.status;
		});
	}
}

export function postItems(payloadJson, outfitId, onSuccess){
	return () => {
		let pathVariable = outfitId !== '' ? ('/' + outfitId) : '';
		return axios.post(
			OxiAppConstants.serviceURL + '/items' + pathVariable,
			payloadJson,
			{})
		.then(response => {
			if(response.status === OxiAppConstants.HttpStatus.CREATED){
				onSuccess(response);
			}
			return response.status;
		});
	}
}

export function putItems(payloadJson, outfitId, onSuccess){
	return () => {
		let pathVariable = outfitId !== '' ? ('/' + outfitId) : '';
		return axios.put(
			OxiAppConstants.serviceURL + '/items' + pathVariable,
			payloadJson,
			{})
		.then(response => {
			console.log('putItems:  response = ', response)
			if(response.status === OxiAppConstants.HttpStatus.OK){
				onSuccess(response);
			}
			return response.status;
		})
	}
}
//TODO:  implemented for redux-promise-middleware... get working
export const batchRequestEntities = (entityType, promise) => {
	return function(dispatch){
		dispatch(makePromiseActionCreator(`POST_${entityType.toUpperCase()}`, entityType.toUpperCase(), promise))();
	}
}

//Sends POST request with added entities
/*export function postEntities(json, picturesJson, enityType, onSuccess){
	//return function(dispatch){
		//denormalize outfits from addedEntitiesReducer
		//send result as json in request payload
		let requestTarget = '';
		let entities = {};
		//json data represents outfit
		switch(enityType){
			case OxiAppConstants.EntityTypes.OUTFIT:
				requestTarget = '/outfit';
				//store assign outfit.coverpicuri to imageFileName. 
				//TODO:  this needs to be reimplemented eventially using Picture resource entities
				json.coverpicuri = picturesJson.smalluri;
				//id and content properties are sent from the server as null.
				//Set these to undefined so their values can be auto generated.
				picturesJson.id = undefined;
				picturesJson.contentId = undefined;
				json.contents[0].picture = picturesJson;
				json.contents[0].coverpicuri = picturesJson.thumbnailuri;
				break;
			case OxiAppConstants.EntityTypes.CONTENT:
				requestTarget = '/content/' + json.id;
				json.picture = picturesJson;
				json.coverpicuri = picturesJson.thumbnailuri;
				break;
			case OxiAppConstants.EntityTypes.ITEM:
				break;
			case OxiAppConstants.EntityTypes.PICTURE:
				break;
			default:
				break;
		}
		//denormalize json
		if(requestTarget !== ''){
			console.log("denormalized json data = ", json);
			axios.post(
				OxiAppConstants.serviceURL + requestTarget,
				json,
				{}
			)
			.then(response => {
				if(response.status === OxiAppConstants.HttpStatus.CREATED){
					onSuccess(response);
				}
				return response.status;
			});			
		}else{
			console.log('requestTarget empty');
		}
	//}
}*/

//TODO:  Impliment
//Sends PUT request with added entities
export function putEntities(outfitJson, picturesJson, enityType, onSuccess){
	//return function(dispatch){
	//denormalize outfits from addedEntitiesReducer
	//send result as outfitJson in request payload
	let requestTarget = '';
	let entities = {};
	let finalJson = Object.assign({}, outfitJson);
	switch(enityType){
		case OxiAppConstants.EntityTypes.OUTFIT:
			requestTarget = '/outfit';
			//store assign outfit.coverpicuri to imageFileName. 
			//TODO:  this needs to be reimplemented eventially using Picture resource entities
			if(picturesJson !== undefined && picturesJson !== null && Object.keys(picturesJson).length > 0){
				finalJson.coverpicuri = picturesJson[0].smalluri;
			}
			//add the picture outfitJson object returned from the server
			finalJson = Object.assign({}, finalJson, {contents: graftPictureJson(finalJson.contents, picturesJson)});
			break;
		case OxiAppConstants.EntityTypes.CONTENT:
			if(outfitJson.contents.length > 1){
				requestTarget = '/contents/' + outfitJson.id;
				//add the picture outfitJson object returned from the server
				finalJson = Object.assign({}, graftPictureJson(outfitJson[contents], picturesJson));
			}else{
				requestTarget = '/content/' + outfitJson.id;
				//add the picture outfitJson object returned from the server
				//finalJson = Object.assign({}, graftPictureJson(outfitJson['contents'][0], picturesJson));
			}
			break;
		case OxiAppConstants.EntityTypes.ITEM:
			if(outfitJson.contents.length > 1){
				requestTarget = '/contents/' + outfitJson.id;
				finalJson = Object.assign({}, outfitJson.contents);
			}else{
				requestTarget = '/item';
				//finalJson = Object.assign({}, outfitJson.contents);
			}
			break;
		/*case OxiAppConstants.EntityTypes.PICTURE:
			if(outfitJson.contents.length > 1) requestTarget = '/pictures/' + outfitJson.contents.id;
			else requestTarget = '/picture';
			finalJson = Object.assign({}, outfitJson.contents);
			break;*/
		default:
			break;
	}
	//denormalize outfitJson
	if(requestTarget !== ''){
		console.log("finalJson data = ", finalJson);
		axios.post(
			OxiAppConstants.serviceURL + requestTarget,
			finalJson,
			{}
		)
		.then(response => {
			if(response.status === OxiAppConstants.HttpStatus.CREATED){
				onSuccess(response);
			}
			return response.status;
		});			
	}else{
		console.log('requestTarget empty');
	}
}

//Modifies content.picture json with the json data returned from Posting image data to server
//Also updates each content's coverpicuri if picture object has been updated.
//@param {Object} contentJson:  the [contents] json body to be modified
//@param {Object} picturesJson:  The [picture] object return by the server.  This objet should contain the id and parent id 
function graftPictureJson(contentsJson, picturesJson){
	if(picturesJson !== undefined && picturesJson !== null && Object.keys(picturesJson).length > 0){
		//Case when a single new content is posted.  the returned picture json object has id and contentId properties = null.
		if(picturesJson[0].contentId === null){
			picturesJson[0].contentId = undefined;
			//set picture and coverpicuri properties
			contentsJson[0] = Object.assign({}, contentsJson[0], {
				coverpicuri: picturesJson[0].thumbnailuri,
				picture: picturesJson[0]
			});
		}else{
			for(let pkey of Object.keys(picturesJson)){
				for(let ckey of Object.keys(contentsJson)){
					if(contentsJson[ckey].id === picturesJson[pkey].contentId){
						//set id property of picture json to undefined if server returns as null (new Picture entity)
						//if(picturesJson[pkey].id === null) picturesJson[pkey].id = undefined;
						//remove content property from the picture json object returned by the server
						picturesJson[pkey].contentId = undefined;
						//set picture and coverpicuri properties
						contentsJson[ckey] = Object.assign({}, contentsJson[ckey], {
							coverpicuri: picturesJson[pkey].thumbnailuri,
							picture: picturesJson[pkey]
						});
					}
				}
			}			
		}
	}
	return contentsJson;
}

function buildJsonFromEntities(id, entity ){

}

/*export function putEntities(id, entityType){
	switch(entityType){
		case OxiAppConstants.EntityTypes.OUTFIT:

		case OxiAppConstants.EntityTypes.CONTENT:
		default:
			break
	}
}*/

function shouldFetchEntites(state, entityType){
	const entitiesStateReducer = state.entitiesState[entityType];
	if(!entitiesStateReducer){
		return true;
	}else if(entitiesStateReducer.isFetching){
		return false;
	}else{
		return entitiesStateReducer.didInvalidate;
	}
}

export function fetchEntitiesIfNeeded(entityType){
	return (dispatch, getState) => {
		if (shouldFetchEntites(getState(), entityType)){
			//Dispatch a thunk from thunk!!!
			return dispatch(fetchEntities(entityType));
		}else{
			//Let the calling code know there's nothing to wait for
			return Promise.resolve();
		}
	}
}

//function that manufactures action creators for making modifications to entites
//entityTarget:  	parameter that tells reducer logic on which store slice to operate.  
//					This is needed so that common reducer logic can be reused across entity related actions 
function makeActionCreator(type, entityTarget, ...dataKeys){
	return function(...dataValues){
		const action = {type: type, typeSpecifier: entityTarget, payload : {}};
		dataKeys.forEach((dataKey, index) => {
			action.payload[dataKey] = dataValues[index] 
		}) 
      	return action;
    };
}

function makePromiseActionCreator(type, entityTarget, promise, ...dataKeys){
	return function(...dataValues){
		const action = {type: type, meta:{typeSpecifier: entityTarget}, payload: promise};
		dataKeys.forEach((dataKey, index) => {
			action.meta[dataKey] = dataValues[index] 
		}) 
      	return action;
	}
}



