
//Do this in every file where you use `fetch`
import fetch from 'cross-fetch'
//import sendAsyncRequest from '../../Util/AsyncRequest.js';
import {sendAsyncRequest, OxiAppConstants} from '../../App.js';
import {normalize} from 'normalizr';
import axios from 'axios';
import {outfitsSchema} from '../../Util/Schema.js'
//Action Types
export const SET_VISIBLE_FORM = 'SET_VISIBLE_FORM';
export const SHOW_MODAL = 'SHOW_MODAL';
export const SET_XCSRF_TOKEN = 'SET_XCSRF_TOKEN';
export const SET_REQUEST_BODY = 'SET_REQUEST_BODY';
export const CREATE_ITEM = 'CREATE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const REPLACE_ITEM = 'REPLACE_ITEM';
export const CREATE_CONTENT ='CREATE_CONTENT';
export const UPDATE_CONTENT = 'UPDATE_CONTENT';
export const REPLACE_CONTENT = 'REPLACE_CONTENT';
export const EDIT_CONTENT_VIEW = "EDIT_CONTENT_VIEW";
export const SHOW_CONTENT_VIEW = "SHOW_CONTENT_VIEW";
export const SELECT_OUTFTI = "SELECT_OUTFIT";
export const CREATE_OUTFIT = "CREATE_OUTFIT";
export const CREATE_ITEMCONTENT = "CREATE_ITEMCONTENT";
export const UPDATE_OUTFIT = "UPDATE_OUTFIT";
export const REPLACE_OUTFIT = "REPLACE_OUTFIT";
export const DELETE_OUTFIT = "DELETE_OUTFIT";
export const SELECT_PAGE = "SELECT_PAGE";

//Async action types
export const REQUEST_LOGIN 			= "REQUEST_LOGIN";
export const REQUEST_ENTITIES 		= "REQUEST_ENTITIES";
export const RECEIVE_ENTITIES 		= "RECEIVE_ENTITIES";
export const INVALIDATE_ENTITIES 	= "INVALIDATE_ENTITIES";
//Fetch HTTP request actions
export const FETCH_ENTITIES_REQUEST = "FETCH_ENTITIES_REQUEST";//type of action informing reducers request began
export const FETCH_ENTITIES_FAILURE = "FETCH_ENTITIES_FAILURE";//type of action infiorming reducers the request failed
export const FETCH_ENTITIES_SUCCESS = "FETCH_ENTITIES_SUCCESS";//type of action infiorming reducers the request finished successfully

export const FETCH_AUTH_REQUEST = "FETCH_AUTH_REQUEST";
export const FETCH_AUTH_FAILURE = "FETCH_AUTH_FAILURE";
export const FETCH_AUTH_SUCCUSS = "FETCH_AUTH_SUCCUSS";

export const SELECT_CONTENT = "SELECT_CONTENT";


//global variables
let nextItemId = 0;
let nextOutfitId = 0;
let nextContentId = 0;


export const setFormVisibility = makeActionCreator(SET_VISIBLE_FORM, null, 'modal');
export const editContentView = makeActionCreator(EDIT_CONTENT_VIEW, null, 'isEditingContent');
export const showContentView = makeActionCreator(SHOW_CONTENT_VIEW, null, 'isContentViewVisible');
export const showModal = makeActionCreator(SHOW_MODAL, null, 'isModalVisible');
export const setXcsrfToken = makeActionCreator(SET_XCSRF_TOKEN, null, 'xCsrfToken');

export const selectPage = makeActionCreator(SELECT_PAGE, null, 'page');
export const selectContent = makeActionCreator(SELECT_CONTENT, 'CONTENT', 'id')

//OUTFIT Actions
export const createOutfit = makeActionCreator(CREATE_OUTFIT, 'OUTFIT', 'id', 'likes', 'comments', 'coverpicUri', 'contents', 'profile');
export const updateOutfit = makeActionCreator(UPDATE_OUTFIT, 'OUTFIT', 'id', 'likes', 'comments', 'coverpicUri', 'contents', 'profile');
export const replaceOutfits = makeActionCreator(REPLACE_OUTFIT, 'OUTFIT', 'entities');
export const deleteOutfit = makeActionCreator(DELETE_OUTFIT, 'OUTFIT', 'id', 'likes', 'comments', 'coverpicUri', 'contents', 'profile');

//ITEM Actions
export const createItem = makeActionCreator(CREATE_ITEM, "ITEM", 'link', 'size', 'type');
export const updateItem = makeActionCreator(UPDATE_ITEM, "ITEM", 'id', 'link', 'size', 'type');
export const replaceItems = makeActionCreator(REPLACE_ITEM, "ITEM", 'entities');

//ITEMCONTENT Actions
export const createItemContent = makeActionCreator(CREATE_ITEMCONTENT, 'ITEMCONTENT', 'itemId', 'contentId');

//CONTENT Actions
export const createContent = makeActionCreator(CREATE_CONTENT, "CONTENT", 'outfitId');
export const updateContent = makeActionCreator(UPDATE_CONTENT, "CONTENT", 'id', 'coverpicuri', 'items');
export const replaceContents = makeActionCreator(REPLACE_CONTENT, 'CONTENT', 'entities');

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
		typ: INVALIDATE_ENTITIES,
		payload:{
			entityType: entityType
		}
	});
};

export function fetchEntities(entityType, profileId){
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
		sendAsyncRequest(
					{},
					null,
					'GET',
					OxiAppConstants.apiBaseUrl + '/consumer/outfits/' + profileId,
					null)
		.then((response) => {
			if(true/*response.ok*/){
				return JSON.parse(response)._embedded.outfitDtoes;//response.json();
			}else{
				throw new Error("Network response not ok");
			}
		}, error => console.log('Error calling response.json()', error))
		.then(json => {
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
							if(item != null && item != undefined) dispatch(createItemContent(item.id, content.id));
						}
					}
				}
			}
			let containsContents = false;
			for(let entity of keys){
				//console.log("iteration")
				//console.log(entity);
				if(entity === 'outfits'){
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
			//select the first content if exist
			if(containsContents){
				let contentKeys = Object.keys(normalizedJson.entities["contents"]);
				if (contentKeys.length > 0){

					dispatch(selectContent(contentKeys[0]));
				}
			}
		});
	}
}

export function fetchImage(filename, callback){
	return function(dispatch){
		return axios.get(OxiAppConstants.apiBaseUrl + '/image/' + filename, {
			responseType: 'arraybuffer',
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'conentType': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		})
		.then(response => new Buffer(response.data, 'binary').toString('base64'))
		.then(response => callback(event, response));
		/*sendAsyncRequest(
					{},
					null,
					'GET',
					'http://72.14.177.220/gs-convert-jar-to-war-0.1.0/image/' + filename,
					null)
		.then(response => {
			//console.log(response);
			callback(event, response);
		});*/
	}
}

export function postImage(imageFile){
	let imageFormData = new FormData();
	imageFormData.append('imageFile', imageFile);
	console.log("in postImage action");
	return function(dispatch){
		return axios.post(OxiAppConstants.apiBaseUrl + '/uploadPhoto/', imageFormData, {
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'conentType': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		});
	}
}

function shouldFetchEntites(state, entityType){
	const entityState = state.entitiesStateByType[entityType];
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

