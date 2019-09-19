
//Do this in every file where you use `fetch`
import fetch from 'cross-fetch'
import axios from 'axios';
import Cookies from 'universal-cookie';
import qs from 'qs';

import {normalize, denormalize} from 'normalizr';
import {outfitsSchema, profileSchema, contents, items, likeCountSchema, contentWithOutfitSchema, contentWithOutfits} from '../../Util/Schema.js';
import {buildItemContentsObject} from '../../Util/Schema.js'

import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import * as scaffolding from './Scaffolding.js';
import * as genericActions from './GenericActions.js';
import * as types from './Types.js';
import * as networkActions from './NetworkActions.js';

export * from './Scaffolding.js';
export * from './GenericActions.js';
export * from './Types.js';
export * from './NetworkActions.js';
export * from './EntityActions/Index.js';
//export * from './AppActions.js';
//const FormData = require('form-data');

//import {FormData} from 'form-data';




//global variables
let nextItemId = 0;
let nextOutfitId = 0;
let nextContentId = 0;



export const setBrowserSelection= scaffolding.makeActionCreator(types.SET_BROWSER_SELECTION, null, 'browseSelection');

export const setFormVisibility	= scaffolding.makeActionCreator(types.SET_VISIBLE_FORM, null, 'modal', 'prevRequestUrl', 'prevRequestType', 'otherData');
export const editContentView 	= scaffolding.makeActionCreator(types.EDIT_CONTENT_VIEW, null, 'viewState');
export const previewContent		= scaffolding.makeActionCreator(types.PREVIEW_CONTENT, null, 'shownContentId')
export const showContentView 	= scaffolding.makeActionCreator(types.SHOW_CONTENT_VIEW, null, 'isContentViewVisible');
export const showModal 			= scaffolding.makeActionCreator(types.SHOW_MODAL, null, 'isModalVisible');
export const setXcsrfToken 		= scaffolding.makeActionCreator(types.SET_XCSRF_TOKEN, null, 'xCsrfToken');

export const selectPage 		= scaffolding.makeActionCreator(types.SELECT_PAGE, null, 'page');
export const setWebAppView		= scaffolding.makeActionCreator(types.SELECT_WEB_APP_VIEW, null, 'webAppView');

export const disableAddOutfit 	= scaffolding.makeActionCreator(types.DISABLE_BUTTON, null, 'disabled');
export const disableAddContentButton = scaffolding.makeActionCreator(types.DISABLE_CONTENT_BUTTON, null, 'disabled');


export const setPreviewFocus = scaffolding.makeActionCreator(types.SET_PREVIEW_FOCUS, null, 'isFocusedPreview');
export const unsetPreviewFocus = scaffolding.makeActionCreator(types.UNSET_PREVIEW_FOCUS, null, 'isFocusedPreview');





//---------------------------------------------------------------------------------------------------------------------------------------
//ASYNCHRONOUS Actions
//export const requestLogin = scaffolding.makeActionCreator(types.REQUEST_LOGIN, "", 'usersname', 'password');
//export const requestEntities = scaffolding.makeActionCreator(types.REQUEST_ENTITIES, "", '');

/*export const receiveProfile = scaffolding.makeActionCreator(types.RECEIVED_PROFILE, OxiAppConstants.EntityTypes.PROFILE, '' );
export const receiveOutfit = scaffolding.makeActionCreator(types.RECEIVED_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, '' );
export const receiveContent = scaffolding.makeActionCreator(types.RECEIVED_CONTENT, OxiAppConstants.EntityTypes.CONTENT, '' );
export const receiveItem = scaffolding.makeActionCreator(types.RECEIVED_ITEM, OxiAppConstants.EntityTypes.ITEM, '' );
export const receivePicture = scaffolding.makeActionCreator(types.RECEIVED_PICTURE, OxiAppConstants.EntityTypes.PICTURE, '' );
export const receiveRetailer = scaffolding.makeActionCreator(types.RECEIVED_RETAILER, OxiAppConstants.EntityTypes.RETAILER, '' );
export const receiveBrand = scaffolding.makeActionCreator(types.RECEIVED_BRAND, OxiAppConstants.EntityTypes.BRAND, '' );*/





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
			
			isOwnerProfileEntityPresent ? null : dispatch(networkActions.fetchEntities(OxiAppConstants.EntityTypes.PROFILE, '', ''));
			dispatch(networkActions.fetchEntities(OxiAppConstants.EntityTypes.OUTFIT, '', 'all'));
			dispatch(unsetPreviewFocus());
			break;

		case OxiAppConstants.navRequestMap.b.toLowerCase():
			console.log('about to dispatch fetchItemMenus()')
			//Get the Brand and Retailer Lists
			dispatch(networkActions.fetchItemMenus()).then((response) => {
				//dispatch(deselectAndPropogate(OxiAppConstants.EntityTypes.OUTFIT));
				dispatch(networkActions.fetchEntities(OxiAppConstants.EntityTypes.OUTFIT, '', ''));
				dispatch(networkActions.fetchEntities(OxiAppConstants.EntityTypes.PROFILE, '', ''));			
			}).then(response => {
				dispatch(setWebAppView(location));	
			}).catch((error) => {
				console.log('exception occured within dispatch to fetchItemMenus.  Reason is: ', error);
				dispatch(networkActions.handleUnauthorizedRequest(error.response));
			})

			dispatch(unsetPreviewFocus());
			break;

		case OxiAppConstants.navRequestMap.c.toLowerCase():
			if(isOwnerProfileEntityPresent){
				dispatch(showProfileMenu(true));
			}else{
				dispatch(networkActions.fetchEntities(OxiAppConstants.EntityTypes.PROFILE, '', '')).then(response => {
					dispatch(showProfileMenu(true));
				}).catch(reason => {
					console.log(reason)
				});
			}
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
		dispatch(networkActions.requestNavigation(location))
		//Check if user is in EditView mode and, if so, validate nav action
		//TDOO:  below seems hacky sacky...	
		if(getState().appView.webAppView === OxiAppConstants.navRequestMap.b.toLowerCase() && getState().contentViewState.viewState !== OxiAppConstants.viewState.PREVIEW){
			dispatch(networkActions.verifyIntent(OxiAppConstants.Intent.DISCARD_EDITS))
		}else{
			dispatch(genericActions.selectEntity(OxiAppConstants.EntityTypes.ITEM, false));
			dispatch(genericActions.selectEntity(OxiAppConstants.EntityTypes.CONTENT, false));
			dispatch(genericActions.selectEntity(OxiAppConstants.EntityTypes.OUTFIT, false));

			dispatch(genericActions.removeAllEntities(OxiAppConstants.EntityTypes.ITEM_CONTENT));
			dispatch(genericActions.removeAllEntities(OxiAppConstants.EntityTypes.CONTENT));
			dispatch(genericActions.removeAllEntities(OxiAppConstants.EntityTypes.ITEM));
			dispatch(genericActions.removeAllEntities(OxiAppConstants.EntityTypes.OUTFIT));

			selectDestination(location, dispatch, isOwnerProfileEntityPresent);
			dispatch(networkActions.requestNavigation(null));
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
			return dispatch(networkActions.fetchEntities(entityType));
		}else{
			//Let the calling code know there's nothing to wait for
			return Promise.resolve();
		}
	}
}
