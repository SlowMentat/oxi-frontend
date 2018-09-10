
//Do this in every file where you use `fetch`
import fetch from 'cross-fetch'
import axios from 'axios';

//import sendAsyncRequest from '../../Util/AsyncRequest.js';
import {sendAsyncRequest} from '../../App.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import {normalize, denormalize} from 'normalizr';
import {outfitsSchema, profileSchema, contents, items} from '../../Util/Schema.js'
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
export const UPDATE_OUTFIT 			= "UPDATE_" 	+ OxiAppConstants.EntityTypes.OUTFIT;
export const REPLACE_OUTFIT 		= "REPLACE_" 	+ OxiAppConstants.EntityTypes.OUTFIT;
export const DELETE_OUTFIT			= "DELETE_" 	+ OxiAppConstants.EntityTypes.OUTFIT;
export const SELECT_PAGE 			= "SELECT_PAGE";

//Action on for entities added to client
export const ADD_ITEM				= 'ADD_'				+ OxiAppConstants.EntityTypes.ITEM;
export const MODIFYITEM				= 'MODIFY_'				+ OxiAppConstants.EntityTypes.ITEM;
export const REMOVE_ITEM			= 'REMOVE_'				+ OxiAppConstants.EntityTypes.ITEM;
export const SELECT_NEW_ITEM		= 'SELECT_NEW_'			+ OxiAppConstants.EntityTypes.ITEM;
export const ADD_ITEMCONTENT		= 'ADD_'				+ OxiAppConstants.EntityTypes.ITEM_CONTENT;
export const REMOVE_ITEMCONTENT		= 'REMOVE_'				+ OxiAppConstants.EntityTypes.ITEM_CONTENT;
export const ADD_CONTENT			= 'ADD_'				+ OxiAppConstants.EntityTypes.CONTENT;
export const MODIFY_CONTENT			= 'MODIFY_'				+ OxiAppConstants.EntityTypes.CONTENT;
export const REMOVE_CONTENT			= 'REMOVE_'				+ OxiAppConstants.EntityTypes.CONTENT;
export const SELECT_ADDED_CONTENT	= 'SELECT_ADDED_'		+ OxiAppConstants.EntityTypes.CONTENT;
export const ADD_OUTFIT				= 'ADD_'				+ OxiAppConstants.EntityTypes.OUTFIT;
export const MODIFYOUTFIT			= 'MODIFY_'				+ OxiAppConstants.EntityTypes.OUTFIT;
export const REMOVE_OUTFIT			= 'REMOVE_'				+ OxiAppConstants.EntityTypes.OUTFIT;
export const SELECT_ADDED_OUTFIT	= 'SELECT_ADDED_'		+ OxiAppConstants.EntityTypes.OUTFIT;
export const ADD_PROFILE			= 'ADD_'				+ OxiAppConstants.EntityTypes.PROFILE;
export const MODIFY_PROFILE			= 'MODIFY_'				+ OxiAppConstants.EntityTypes.PROFILE;
export const REMOVE_PROFILE			= 'REMOVE_'				+ OxiAppConstants.EntityTypes.PROFILE;
export const SELECT_NEW_PROFILE		= 'SELECT_NEW_'			+ OxiAppConstants.EntityTypes.PROFILE;
export const CREATE_PROFILE			= 'CREATE_PROFILE'		+ OxiAppConstants.EntityTypes.PROFILE;

//Async action types
export const REQUEST_LOGIN 			= "REQUEST_LOGIN";
export const REQUEST_ENTITIES 		= "REQUEST_ENTITIES";
export const RECEIVE_ENTITIES 		= "RECEIVE_ENTITIES";
export const INVALIDATE_ENTITIES 	= "INVALIDATE_ENTITIES";
//Fetch HTTP request actions
export const FETCH_ENTITIES_REQUEST = "FETCH_ENTITIES_REQUEST";//type of action informing reducers request began
export const FETCH_ENTITIES_FAILURE = "FETCH_ENTITIES_FAILURE";//type of action infiorming reducers the request failed
export const FETCH_ENTITIES_SUCCESS = "FETCH_ENTITIES_SUCCESS";//type of action infiorming reducers the request finished successfully

export const FETCH_AUTH_REQUEST 	= "FETCH_AUTH_REQUEST";
export const FETCH_AUTH_FAILURE 	= "FETCH_AUTH_FAILURE";
export const FETCH_AUTH_SUCCUSS 	= "FETCH_AUTH_SUCCUSS";
export const SELECT_WEB_APP_VIEW	= "SELECT_WEB_APP_VIEW";

export const SELECT_CONTENT 		= "SELECT_" 	+ OxiAppConstants.EntityTypes.CONTENT;
export const SELECT_ITEM 			= "SELECT_"		+ OxiAppConstants.EntityTypes.ITEM;
export const DISABLE_BUTTON			= "DISABLE_BUTTON";

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
	'hips':'',
	'sleeve':'',
	'frontLength':'',
	'backLength':'',
	'pantOutseam':'',
	'pantInseam':'',
	'thigh':'',
	'calf':''	
};


export const setFormVisibility	= makeActionCreator(SET_VISIBLE_FORM, null, 'modal');
export const editContentView 	= makeActionCreator(EDIT_CONTENT_VIEW, null, 'isEditingContent');
export const previewContent		= makeActionCreator(PREVIEW_CONTENT, null, 'shownContentId')
export const showContentView 	= makeActionCreator(SHOW_CONTENT_VIEW, null, 'isContentViewVisible');
export const showModal 			= makeActionCreator(SHOW_MODAL, null, 'isModalVisible');
export const setXcsrfToken 		= makeActionCreator(SET_XCSRF_TOKEN, null, 'xCsrfToken');

export const selectPage 		= makeActionCreator(SELECT_PAGE, null, 'page');
export const setWebAppView		= makeActionCreator(SELECT_WEB_APP_VIEW, null, 'webAppView');

export const selectItem 		= makeActionCreator(SELECT_ITEM, OxiAppConstants.EntityTypes.ITEM, 'id');
export const selectContent 		= makeActionCreator(SELECT_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'id');
export const selectOutfit 		= makeActionCreator(SELECT_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'id');

export const createProfile 		= makeActionCreator(CREATE_PROFILE, OxiAppConstants.EntityTypes.PROFILE, 'entity')

//OUTFIT Actions
export const createOutfit 		= makeActionCreator(CREATE_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'id', 'likes', 'comments', 'coverpicUri', 'contents', 'profile');
export const updateOutfit 		= makeActionCreator(UPDATE_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'id', 'likes', 'comments', 'coverpicUri', 'contents', 'profile');
export const replaceOutfits 	= makeActionCreator(REPLACE_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'entities');
export const deleteOutfit 		= makeActionCreator(DELETE_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'id', 'likes', 'comments', 'coverpicUri', 'contents', 'profile');
export const addOutfit 			= makeActionCreator(ADD_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'id', 'likes', 'comments', 'coverpicUri', 'contents', 'profile');
//ITEM Actions
export const createItem 		= makeActionCreator(CREATE_ITEM, OxiAppConstants.EntityTypes.ITEM, 'link', 'size', 'type');
export const updateItem 		= makeActionCreator(UPDATE_ITEM, OxiAppConstants.EntityTypes.ITEM, 'id', 'link', 'size', 'type');
export const replaceItems 		= makeActionCreator(REPLACE_ITEM, OxiAppConstants.EntityTypes.ITEM, 'entities');
export const addItem 			= makeActionCreator(ADD_ITEM, OxiAppConstants.EntityTypes.ITEM, 'link', 'size', 'type');

//ITEMCONTENT Actions
export const createItemContent 	= makeActionCreator(CREATE_ITEMCONTENT, OxiAppConstants.EntityTypes.ITEM_CONTENT,'id', 'itemId', 'contentId');
export const addItemContent 	= makeActionCreator(ADD_ITEMCONTENT, OxiAppConstants.EntityTypes.ITEM_CONTENT, 'itemId', 'contentId');
//CONTENT Actions
export const createContent 		= makeActionCreator(CREATE_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'outfitId');
export const updateContent 		= makeActionCreator(UPDATE_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'id', 'coverpicuri', 'items');
export const replaceContents 	= makeActionCreator(REPLACE_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'entities');

export const addContent 		= makeActionCreator(ADD_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'outfitId', 'items');
export const modifyContent 		= makeActionCreator(MODIFY_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'entity')

export const selectAddedOutfit 	= makeActionCreator(SELECT_ADDED_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'id');
export const selectAddedContent = makeActionCreator(SELECT_ADDED_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'id');

export const disableAddOutfit 	= makeActionCreator(DISABLE_BUTTON, null, 'disabled');


//PROFILE Actions
export const addProfile = (profileData) => {
	let completeData = Object.assign({}, defaultProfileData, profileData)
	return({
		type: ADD_PROFILE,
		typeSpecifier: OxiAppConstants.EntityTypes.PROFILE,
		payload: completeData

	});
};

//removes all profile entities from addedEntitiesReducer
export const removeProfile = makeActionCreator(REMOVE_PROFILE, OxiAppConstants.EntityTypes.PROFILE, "id");
export const modifyProfile = makeActionCreator(MODIFY_PROFILE, OxiAppConstants.EntityTypes.PROFILE, "entity");

export const cookies = new Cookies();
export const requestInterceptor = (config) => {
	console.log("Adding to request headers the csrf_token stored in cookies");
	console.log(cookies.get('csrf_token'));
	if(cookies.get('csrf_token') !== null){
		console.log("csrf_token in cookies is not null");
		config['X-CSRF-TOKEN'] = cookies.get('csrf_token')		
	}
	return config;
};

const postConfig = (url, data) => {
	return {
		method: 'POST',
		headers: {'content-type': 'application/x-www-form-urlencoded'},
		data: qs.stringify(data),
		url
	};
}
export const loginConfig = (username, password) => {
	return postConfig(
		OxiAppConstants.apiBaseUrl + '/login',
		{
			'X-CSRF-TOKEN' : cookies.get('csrf_token'),
			'username' : username,
			'password' : password
		}
	);
}

//set axios defult headers
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

//Set interceptor for responses with unauthorized status.
//This will save the provided csrf token dispatch the login Form for authentication.
/*axios.interceptors.response.use(handleUnauthorizedRequest*//*, error => {
	handleUnauthorizedRequest(response);
	return Promise.reject(error);
}*///);

//include the csrf_token from cookies in the X-CSRF-TOJEN header for each request.
axios.interceptors.request.use(requestInterceptor,  error => {
	//return Promise.reject(error);
});

export const handleUnauthorizedRequest = (dispatch, response) => {
	console.log("hello");
	if(response.status === OxiAppConstants.HttpStatus.UNAUTHORIZED){
		console.log('Setting new csrf token');
		console.log(response.headers['x-csrf-token']);
		cookies.set('csrf_token', response.headers['x-csrf-token']);
		dispatch(setFormVisibility("Login"));
		return response;
	}
};
//---------------------------------------------------------------------------------------------------------------------------------------
//ASYNCHRONOUS Actions
//export const requestLogin = makeActionCreator(REQUEST_LOGIN, "", 'usersname', 'password');
//export const requestEntities = makeActionCreator(REQUEST_ENTITIES, "", '');

export const receiveEntities = (entityType, json) => {
	return({
		type: RECEIVE_ENTITIES,
		payload:{
			entityType: entityType,
			entities: json.entities,
			receivedAt: Date.now()
		}

	});
};

export const requestEntities = (entityType) => {
	return({
		type: REQUEST_ENTITIES,
		payload:{
			entityType: entityType
		} 
	});
};

export const invalidateEntities = (entityType) => {
	return({
		type: INVALIDATE_ENTITIES,
		payload:{
			entityType: entityType
		}
	});
};

export const showProfileMenu = (shown) => {
	return({
		type: SET_LP_PROFILE_MENU,
		payload:{
			'profileMenu':shown
		}
	})
}

export function createUser(email, password, username){
	return function(dispatch){
		return axios.post(OxiAppConstants.serviceUrl + '/createUser', {			
			'email': email,
			'password': password,
			'username': username			
		})
		.then(response => {
			if(response.status == 409){
				//dispatch 409 handler
			}else if(response.status == 200){
				//save _csrf token in cookies
				console.log('response headers: ');
				console.log(response);
				cookies.set('csrf_token', response.headers['x-csrf-token']);
				dispatch(addProfile({'username':response.data}));
				dispatch(showProfileMenu(true));
			}
		})
		//.then(response => callback(event, response));		
	}
}

//Post new profile entities to the server.  There should only ever be one profile entity,
//howevern support for multiple profile entities is implemented here
export function postProfile(profile){
	return function(dispatch){
		//keep loacal ids
		let id = profile.id;
		//strip local ids from all profile entities
		profile.id = '';
		return axios.post(OxiAppConstants.serviceUrl + '/profile/' + profile.username,
			//denormalize(profile, profileSchema, {});
			profile
		).then(response => {
			if(response.status == 200){
				console.log("dispatching removeProfile");
				//Change switch to profile view
				dispatch(setWebAppView('profile'));
				//Add new profile data returned in the response body to the redux tree
				dispatch(updateProfile(response.data));
				//populate the profile view with usr content
				///dispatch(fetchEntities('outfit', response.data.id));
				//remove the sent profile from local addedEntitesReducer store
				dispatch(removeProfile(id));
			}
		})
	}
}

export function fetchEntities(entityType, username){
	return function(dispatch){
		dispatch(requestEntities(entityType));
		/*return fetch('http://72.14.177.220/gs-convert-jar-to-war-0.1.0/consumer/${entityType}/${profileId}')
			.then(response => {
						if(response.ok){
							return response.json()
						}else if(response.status == OxiAppConstants.HttpStatus.UNAUTHORIZED){

						}
					}, error => console.log('Error calling response.json()', error))
			.then(json => dispatch(receiveEntities(json)));*/
		/*sendAsyncRequest(
					{},
					null,
					'GET',
					OxiAppConstants.serviceUrl + '/outfits/' + profileId,
					null)*/
		return axios.get(OxiAppConstants.serviceUrl + '/outfits/' + username + "?page=0&size=20")
		.then((response) => {
			if(response.status == 200){
				let json = response.data._embedded.outfitDtoes;//JSON.parse(response.data)._embedded.outfitDtoes;//response.json();
				console.log("json");
				console.log(json);
				dispatch(receiveEntities(entityType, json));
				//normalize received json payload
				let normalizedJson = normalize(json, outfitsSchema);
				let keys = Object.keys(normalizedJson.entities);
				console.log(normalizedJson);
				//Manually build itemContents join table
				for(let outfit of json){
					for(let content of outfit.contents){
						if(content != null && content != undefined){
							for (let item of content.items){
								if(item != null && item != undefined) dispatch(createItemContent(null, item.id, content.id));
							}
						}
					}
				}
				let containsContents = false;
				let containsOutfits = false;
				//let containsItems = false;
				for(let entity of keys){
					if(entity === 'outfits'){
						containsOutfits = true;
						dispatch(replaceOutfits(normalizedJson.entities[entity]));

					}else if(entity === 'contents'){
						containsContents = true;
						dispatch(replaceContents(normalizedJson.entities[entity]));

					}else if(entity === 'items'){
						dispatch(replaceItems(normalizedJson.entities[entity]));
					}else{
						return;
					}
				}
				//select the first outfit if it exists
				if(containsOutfits){
					let outfitKeys = Object.keys(normalizedJson.entities["outfits"]);		
					if (outfitKeys.length > 0) dispatch(selectOutfit(outfitKeys[0]));		
					//select the first content if it exist
					if(containsContents){
						let contentKeys = Object.keys(normalizedJson.entities["contents"]);
						if (contentKeys.length > 0) dispatch(selectContent(contentKeys[0]));
					}
				}
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
				handleUnauthorizedRequest(dispatch, error.response);
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
		})
		/*.then(json => {
		})*/;
	}
}

//use this action to batch select nested entities retreived from server
//@param {String} valid entityType from OxiAppConstants.EntityTypes to select
//@param {String} valid id of the entity selected
//@param {STring} valid id of the child entity to be selected next.
export function selectAndPropogate(entityType, entityId, targetChildId){
	return function(dispatch){
		console.log("selectAndPropogate entityType = ");
		console.log(entityType);
		switch(entityType){
			case OxiAppConstants.EntityTypes.OUTFIT:
				dispatch(selectOutfit(entityId))
				console.log("targetChildId = ");
				console.log(targetChildId)
				dispatch(selectAndPropogate(OxiAppConstants.EntityTypes.CONTENT, targetChildId, null));
				return;
			case OxiAppConstants.EntityTypes.CONTENT:
				dispatch(selectContent(entityId));
				return;
			default:
				return
		}
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
				dispatch(selectOutfit(false));
				dispatch(deselectAndPropogate(OxiAppConstants.EntityTypes.CONTENT));
				return;
			case OxiAppConstants.EntityTypes.CONTENT:
				dispatch(selectContent(false));
				dispatch(deselectAndPropogate(OxiAppConstants.EntityTypes.ITEM));
				return;
			case OxiAppConstants.EntityTypes.ITEM:
				dispatch(selectItem(false));
			default:
				console.log("no matching entity type");
				return null;
		}
	}	
}

//use this action to select entities as they are created on the client.
export function selectAddedEntity(entityType, entityId){
	return function(dispatch){
		console.log("selectAddedEnity");
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

//Function called after fetching outfits.
//Selects the first outfit entity and first Content child entity of the returned json after normalization
//entityArray:  	array of entities from which to select the 0th element
//entitytype:  		The type of enity.  Legal types are defined in OxiAppConstants.EntityTypes
/*function selectFirstEntity(entityArray, entityType, dispatch){
	switch(entityType){
		case OxiAppConstants.EntityTypes.OUTFIT:
			dispatch(selectOutfit(entityArray[0]));
		case OxiAppConstants.EntityTypes.CONTENT:
			dispatch(selectContent(entityArray[0]));
	}
	if (entityArray.length > 0){
		dispatch(selectContent(entityArray[0]));
	}	
}*/

export function fetchImage(filename, callback){
	return function(dispatch){
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
		request.get(OxiAppConstants.serviceUrl + '/image/' + filename + '?mediaType=jpeg&mediaType=json')
		//Server returns data enclosed in quatations.  Quotations are striped from the ByteArray here and converted utf8 charset.
		.then(response => Buffer.from(response.data, 1, response.data.byteLength-2).toString('utf8'))
		.then(response => callback(event, response));
	}
}

//POST image data to server
export function postImage(imageFile, json){
	let imageFormData = new FormData();
	imageFormData.append('imageFile', imageFile);
	console.log("in postImage action");
	//TODO:  Check if file name and image aspect ratio is valid
	//return function(dispatch){
		//dispatch(postEntities(json));
		axios.post(
			OxiAppConstants.serviceUrl + '/uploadPhoto', 
			imageFormData,
			{
				headers:{
					'Content-Disposition': 'form-data; name=\"imageFile\"',
					'Content-Transfer-Encoding': 'base64',
				}
			}
		)
		//sendAsyncRequest({}, imageFormData, 'POST', OxiAppConstants.serviceUrl + '/uploadPhoto', null)
		.then(response => {
			if(response.status === OxiAppConstants.HttpStatus.CREATED){
				postEntities(json, response.data);
			}else{
				return response.status;
			}
		});
	//}
}

//Sends POST request with added entities
export function postEntities(json, imageFileName){
	//return function(dispatch){
		//denormalize outfits from addedEntitiesReducer
		//send result as json in request payload
		let requestTarget = '';
		let entities = {};
		if(json.contents !== undefined){
			requestTarget = '/outfit';
			//store assign outfit.coverpicuri to imageFileName. 
			//TODO:  this needs to be reimplemented eventially using Picture resource entities
			json.coverpicuri = imageFileName;
			json.contents[0].coverpicuri = imageFileName;
		}else if(json.items !== undefined){
			requestTarget = '/contents';
			json.contents[0].coverpicuri = imageFileName;
		}
		//denormalize json
		if(requestTarget !== ''){
			console.log("denormalized json data:");
			console.log(json);
			axios.post(
				OxiAppConstants.serviceUrl + requestTarget,
				json,
				{}
			)
			.then(response => {
				return response.status;
			});			
		}else{
			console.log('requestTarget empty');
		}
	//}
}

function buildJsonFromEntities(id, entity ){

}

export function putEntities(id, entityType){
	switch(entityType){
		case OxiAppConstants.EntityTypes.OUTFIT:

		case OxiAppConstants.EntityTypes.CONTENT:
		default:
			break
	}
}

function shouldFetchEntites(state, entityType){
	const entityState = state.entitiesReducer.entitiesState[entityType];
	if(!entityState){
		return true;
	}else if(entityState.isFetching){
		return false;
	}else{
		return entityState.didInvalidate;
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

