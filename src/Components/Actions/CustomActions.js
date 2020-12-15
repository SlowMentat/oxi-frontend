
//Do this in every file where you use `fetch`
import fetch from 'cross-fetch'
import axios from 'axios';
import Cookies from 'universal-cookie';
import qs from 'qs';

import {normalize, denormalize} from 'normalizr';
import { outfitsSchema, profileSchema, contents, items, likeCountSchema, contentWithOutfitSchema, contentWithOutfits, outfit } from '../../Util/Schema.js';
import {buildItemContentsObject} from '../../Util/Schema.js'

import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import * as scaffolding from './Scaffolding.js';
import * as genericActions from './GenericActions.js';
import * as types from './Types.js';
import * as networkActions from './NetworkActions.js';
import * as entityActions from './EntityActions/Index.js';
import { defaultCookieOptions } from './NetworkActions.js';
//export * from './AppActions.js';
//const FormData = require('form-data');

//import {FormData} from 'form-data';




//global variables
let nextItemId = 0;
let nextOutfitId = 0;
let nextContentId = 0;



export const setBrowserSelection= scaffolding.makeActionCreator(types.SET_BROWSER_SELECTION, null, 'browseSelection');

export const setFormVisibility	= scaffolding.makeActionCreator(types.SET_VISIBLE_FORM, null, 'modal', 'prevRequestUrl', 'prevRequestType', 'otherData');
export const setFormOverlayVisibility = scaffolding.makeActionCreator(types.SET_VISIBLE_FORM_OVERLAY, null, 'overlayModal');
export const editContentView 	= scaffolding.makeActionCreator(types.EDIT_CONTENT_VIEW, null, 'viewState');
export const previewContent		= scaffolding.makeActionCreator(types.PREVIEW_CONTENT, null, 'shownContentId')
export const showContentView 	= scaffolding.makeActionCreator(types.SHOW_CONTENT_VIEW, null, 'isContentViewVisible');
export const showModal 			= scaffolding.makeActionCreator(types.SHOW_MODAL, null, 'isModalVisible');
export const setXcsrfToken 		= scaffolding.makeActionCreator(types.SET_XCSRF_TOKEN, null, 'xCsrfToken');

export const selectPage 		= scaffolding.makeActionCreator(types.SELECT_PAGE, null, 'page');
export const setWebAppView		= scaffolding.makeActionCreator(types.SELECT_WEB_APP_VIEW, null, 'webAppView');
export const setWebAppViewContext = scaffolding.makeActionCreator(types.SELECT_WEB_APP_VIEW_CONTEXT, null, 'webAppViewContext');

export const disableAddOutfit 	= scaffolding.makeActionCreator(types.DISABLE_BUTTON, null, 'disabled');
export const disableAddContentButton = scaffolding.makeActionCreator(types.DISABLE_CONTENT_BUTTON, null, 'disabled');


export const setPreviewFocus = scaffolding.makeActionCreator(types.SET_PREVIEW_FOCUS, null, 'isFocusedPreview');
export const unsetPreviewFocus = scaffolding.makeActionCreator(types.UNSET_PREVIEW_FOCUS, null, 'isFocusedPreview');


export const showProfileMenu = (shown) => {
	return({
		type: types.SET_LP_PROFILE_MENU,
		payload:{
			'profileMenu':shown
		}
	})
}

export const setCreateAccountView = (accountType) => {
	return({
		type: types.SET_LP_CREATE_ACCOUNT_VIEW,
		payload: {
			'createAccountView': accountType
		}
	});
}

function selectDestination(location, dispatch, isOwnerProfileEntityPresent, hostUsername = '', owner){
	console.log('destination = ', location);

	switch(location){
		case OxiAppConstants.navRequestMap.a.toLowerCase():

			dispatch(setWebAppView(location));
			//Fetch all entities.  
			//TODO:  filtered fetch via queary parameters
			
			isOwnerProfileEntityPresent ? null : dispatch(fetchEntities(OxiAppConstants.EntityTypes.PROFILE, '', ''));
			
			new Promise((resolve, reject) => {
				resolve(dispatch(fetchEntities(OxiAppConstants.EntityTypes.OUTFIT, '', 'all')))
			})
			.then(({normalizedJson, response}) => {
				dispatch(genericActions.setNextPageURL(OxiAppConstants.EntityTypes.OUTFIT, response.data._links.after.href));
			});

			dispatch(fetchItemMenus());
			dispatch(unsetPreviewFocus());
			break;

		case OxiAppConstants.navRequestMap.b.toLowerCase():
			console.log('about to dispatch fetchItemMenus()')
			//Get the Brand and Retailer Lists
			dispatch(fetchItemMenus())
			.then((response) => {
				//dispatch(deselectAndPropogate(OxiAppConstants.EntityTypes.OUTFIT));
				dispatch(fetchEntities(OxiAppConstants.EntityTypes.OUTFIT, `/${hostUsername}`, ''));
				dispatch(fetchEntities(
					OxiAppConstants.EntityTypes.PROFILE, 
					`/${hostUsername}`, 
					'',
					undefined,
					undefined,
					undefined,
					undefined,
					owner
				));

			})
			.then((response) => {
				dispatch(setWebAppView(location));	
				dispatch(genericActions.setNextPageURL(OxiAppConstants.EntityTypes.OUTFIT, response.data._links.after.href));
			})
			.catch((error) => {
				console.error('exception occured within dispatch to fetchItemMenus.  Reason is: ', error);
				dispatch(networkActions.handleUnauthorizedRequest(error.response));
			})

			dispatch(unsetPreviewFocus());
			break;

		case OxiAppConstants.navRequestMap.c.toLowerCase():

			if(isOwnerProfileEntityPresent){
				dispatch(showProfileMenu(true));
			}
			else{
				dispatch(fetchEntities(OxiAppConstants.EntityTypes.PROFILE, '', ''))
				.then(response => {
					dispatch(showProfileMenu(true));
				})
				.catch(error => {
					console.log(error);
					dispatch(networkActions.handleUnauthorizedRequest(error.response));
				});
			}

			dispatch(setWebAppView(location));
			dispatch(unsetPreviewFocus());
			break;

		default:
			break;
	}
}

export function navigateTo(location, isOwnerProfileEntityPresent, hostUsername, owner={}){
	return function(dispatch, getState){
		console.log('in navigateTo()')
		dispatch(networkActions.requestingNavigation(location))
		//Check if user is in EditView mode and, if so, validate nav action
		//TDOO:  below seems hacky sacky...	
		if(
			getState().appView.webAppView === OxiAppConstants.navRequestMap.b.toLowerCase() && 
			getState().contentViewState.viewState !== OxiAppConstants.viewState.PREVIEW
		){
			dispatch(verifyIntent(OxiAppConstants.Intent.DISCARD_EDITS))
		}
		else{
			dispatch(genericActions.selectEntity(OxiAppConstants.EntityTypes.ITEM, false));
			dispatch(genericActions.selectEntity(OxiAppConstants.EntityTypes.CONTENT, false));
			dispatch(genericActions.selectEntity(OxiAppConstants.EntityTypes.OUTFIT, false));

			dispatch(genericActions.removeAllEntities(OxiAppConstants.EntityTypes.ITEM_CONTENT));
			dispatch(genericActions.removeAllEntities(OxiAppConstants.EntityTypes.CONTENT));
			dispatch(genericActions.removeAllEntities(OxiAppConstants.EntityTypes.ITEM));
			dispatch(genericActions.removeAllEntities(OxiAppConstants.EntityTypes.OUTFIT));

			selectDestination(location, dispatch, isOwnerProfileEntityPresent, hostUsername, owner);
			dispatch(networkActions.requestingNavigation(null));
		}
	}
}

//Create User account, then logs the user in with created user account credentials.
//TODO:  this should be replaced with an email verification login on initial account creation.
export function createUser(formData /*email, password, username*/){
	return function(dispatch){

		const {
			email,
			username,
			password,
		} = formData;

		return axios.post(
			OxiAppConstants.apiBaseURL + '/account/user/register', 
			{			
				'email': email,
				'password': password,
				'username': username			
			},
			//{
			//	headers:{
			//		'content-type':'application/x-www-form-urlencoded'
			//	}
			//}
			//{
			//	headers:{
			//		'www-authenticate':'Bearer',
			//	}
			//}
		)
		.then(response => {
			if(response.status === OxiAppConstants.HttpStatus.CONFLICT){
				//dispatch 409 handler
			}else if(response.status === OxiAppConstants.HttpStatus.OK || response.status === OxiAppConstants.HttpStatus.CREATED){
				//save _csrf token in cookies
				console.log('response headers: ');
				console.log(response);
				cookies.set('csrf_token', response.headers['x-csrf-token'], defaultCookieOptions);
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

function getLinks(dispatch, links, entityType){
	if(links !== undefined){
		links.after ? 
			dispatch(genericActions.setNextPageURL(entityType, links.after.href)) : 
			dispatch(genericActions.setNextPageURL(entityType, null));
		!links.prev ? 
			dispatch(genericActions.setPrevPageURL(entityType, null)) :
			dispatch(genericActions.setPrevPageURL(entityType, links.prev.href)) 
	}
}

export function fetchEntities(entityType, username, filter, linkURL=null, pageStart=0, pageSize=10, config={}, owner){
	return function(dispatch){
		dispatch(genericActions.requestEntities(entityType));
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
						dispatch(genericActions.receiveEntities(entityType.toLowerCase(), null));
						dispatch(entityActions.replaceApparelTypes(normalizedJson));
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
						dispatch(genericActions.receiveEntities(entityType.toLowerCase(), null));
						dispatch(entityActions.replaceBrands(normalizedJson));
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
						dispatch(genericActions.receiveEntities(entityType.toLowerCase(), null));
						dispatch(entityActions.replaceRetailers(normalizedJson));
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
						let profileData = {};

						//The return entity is not nested so we do not need to make calls to normalizr before dropping into redux tree
						dispatch(genericActions.receiveEntities(entityType.toLowerCase(), null));
						
						//check if owner exists and if returned data is owner.username						
						if(owner && Object.keys(owner).length !== 0){
							if(owner.username === response.data.username){
								profileData = {'owner': response.data};
							}
							else{
								profileData = {owner: owner, host: response.data};
							}
						}else{
							profileData = {'owner': response.data};							
						}

						dispatch(entityActions.replaceProfile( profileData ));

					}else{
						throw 'Unexpected response status received when fetching profile:  ' + response.status;
					}

				});
				break;

			case OxiAppConstants.EntityTypes.OUTFIT:
				requestParams = 'filter=' + filter;
				URI = linkURL ? '' : '/outfits';
				username = linkURL ? '' : username;
				console.log(`requestParams = ${requestParams}, URI = ${URI}, username = ${username}, linkURL = ${linkURL}`)
				
				//return axios.get(`${(linkURL || OxiAppConstants.serviceURL)}${URI}${username}?${requestParams}&page=${pageStart}&size=${pageSize}`, config)
				
				customReqParams = (URI === '') ? '' : `?filter=${filter}&firstResult=${0}&maxResults=${10}&date=${new Date(Date.now()).toISOString()}&direction=${0}`; 

				return axios.get(encodeURI(`${linkURL || OxiAppConstants.serviceURL}${URI}${username}${customReqParams}`))
				.then((response) => {
					dispatch(genericActions.receiveEntities(entityType, null));
					let normalizedJson = null;

					if(response.status === OxiAppConstants.HttpStatus.OK){
						// Determine json body extraction method by check if response is a paged resource.
						let json = response.data._embedded ? response.data._embedded.outfitDtoes : response.data;						
						let itemContentJson = null;
						let likeCount =null;

						console.log("json");
						console.log(json);

						dispatch(genericActions.receiveEntities(entityType.toLowerCase(), null));
						getLinks(dispatch, response.data._links, OxiAppConstants.EntityTypes.OUTFIT);

						//Manually build itemContents join table
						itemContentJson = buildItemContentsObject(OxiAppConstants.JsonPropertyNames.OUTFIT, json);

						// Test if response is from an call to /outfit or /outfits endpoints.  json variable will be an object in the former and an array in the latter.
						if(Array.isArray(json)){	
							//normalize received json payload
							normalizedJson = normalize(json, outfitsSchema);
							likeCount = normalizedJson.entities[OxiAppConstants.JsonPropertyNames.LIKE_COUNT];

							dispatch(entityActions.createLikeCount(likeCount));
						}
						else{
							//normalize received json payload
							normalizedJson = normalize(json, outfit);
							likeCount = normalizedJson.entities[OxiAppConstants.JsonPropertyNames.LIKE_COUNT];
						}

						dispatch(entityActions.createItemContent(itemContentJson));	
						mergeResponseEntities(dispatch, normalizedJson);
						let outfitKeys = Object.keys(normalizedJson.entities.outfits);
						//genericActions.selectEntity(OxiAppConstants.EntityTypes.OUTFIT, (outfitKeys.length > 0 ? normalizedJson.entities.outfits[outfitKeys[0]].id : false));
						
					}else{
						//handleUnauthorizedRequest(response);
					}
					var result = {normalizedJson, response};
					return result;
				})
				.catch(error => {
					dispatch(genericActions.receiveEntities(entityType, error));
					console.log(error);

					if (error.response) {
						// The request was made and the server responded with a status code
						// that falls out of the range of 2xx
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
						//Check if error is due to forbidden response staatus
						dispatch(networkActions.handleUnauthorizedRequest(error.response));
					} 
					else if (error.request) {
						// The request was made but no response was received
						// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
						// http.ClientRequest in node.js
						console.log(error.request);
					} 
					else {
						// Something happened in setting up the request that triggered an Error
						console.log('Error', error.message);
					}

					console.log(error.config);
					throw(error);
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
						dispatch(genericActions.receiveEntities(entityType.toLowerCase(), null));
						//normalize received json payload
						let normalizedJson = normalize(json, outfitsSchema);
						
						console.log('entitiesStateReducer', normalizedJson); 
						
						//Manually build itemContents join table
						let itemContentJson = buildItemContentsObject(OxiAppConstants.JsonPropertyNames.OUTFIT, json);
						dispatch(entityActions.createItemContent(itemContentJson));							

						mergeResponseEntities(dispatch, normalizedJson);
						let outfitKeys = Object.keys(normalizedJson.entities.outfits);
						return response;
						//genericActions.selectEntity(OxiAppConstants.EntityTypes.OUTFIT, (outfitKeys.length > 0 ? normalizedJson.entities.outfits[outfitKeys[0]].id : false));
					}else{
						throw 'Unexpected response status received when fetching contents:  ' + response.status;
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
						dispatch(networkActions.handleUnauthorizedRequest(error.response));
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
				//customReqParams = (URI === '') ? '' : `?filter=${filter}&page=${pageStart}&size=${pageSize}`;
				customReqParams = (URI === '') ? '' : `?filter=${filter}&firstResult=${0}&maxResults=${10}&date=${new Date(Date.now()).toISOString()}&direction=${0}`; 

				return axios.get(encodeURI(`${linkURL || OxiAppConstants.serviceURL}${URI}${customReqParams}`))
				.then((response) => {
					if(response.status === OxiAppConstants.HttpStatus.OK){
						let normalizedJson = response.data./*_embedded.items.*/_embedded.items.reduce((accum, currentObject) => {
							return(Object.assign(accum, {
								[currentObject.id]: {
									'id': currentObject.id, 
									'type': currentObject.type,
									'size': currentObject.size,
									'retailer': currentObject.retailer,
									'brand': currentObject.brand,
									'product':currentObject.product,
									'coverpicuri':currentObject.coverpicuri,
									'outfitId':currentObject.outfitId,
								}
							}));
						},{});
						console.log('normalizedJson Items:  ', normalizedJson);
						dispatch(genericActions.receiveEntities(entityType.toLowerCase(), null));

						if(true/*linkURL === null*/){
							getLinks(dispatch, response.data._links, OxiAppConstants.EntityTypes.ITEM);
						}
							
						//mergeResponseEntities(dispatch, {'entities': {'items': normalizedJson}}); //TODO clean this up.  Use schema
						dispatch(entityActions.replaceItems(normalizedJson));
					}else{
						throw 'Unexpected response status received when fetching retailers:  ' + response.status;
					}
					return response;
				})
				.catch(error => {
					dispatch(genericActions.receiveEntities(entityType, error));					
					console.log(error);

					if (error.response) {
						// The request was made and the server responded with a status code
						// that falls out of the range of 2xx
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
						//Check if error is due to forbidden response staatus
						dispatch(networkActions.handleUnauthorizedRequest(error.response));
					} 
					else if (error.request) {
						// The request was made but no response was received
						// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
						// http.ClientRequest in node.js
						console.log(error.request);
					} 
					else {
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

export const fetchContentsWithOutfitByItemId = (itemId, linkURL=null, pageStart=0, pageSize=50) => {
	return function(dispatch){
		dispatch(genericActions.requestEntities(OxiAppConstants.EntityTypes.AUX_CONTENT));
		let pageStart = 0;
		let pageSize = 9;
		let pageBufferSize = 2;
		let URI = linkURL ? '' : `/contents/items/${itemId}`;


		const customReqParams = (URI === '') ? '' : `?firstResult=${0}&maxResults=${10}&date=${new Date(Date.now()).toISOString()}&direction=${0}`; 

		return axios.get(encodeURI(`${linkURL || OxiAppConstants.serviceURL}${URI}${customReqParams}`))
		//return axios.get(`${linkURL || OxiAppConstants.serviceURL}${URI}?page=${pageStart}&size=${pageSize}`)
		.then((response) => {

			dispatch(genericActions.receiveEntities(OxiAppConstants.EntityTypes.AUX_CONTENT.toLowerCase(), null));

			if(response.status === OxiAppConstants.HttpStatus.OK){
				let json = response.data._embedded[OxiAppConstants.EmbeddedEntityPropertyNames.CONTENT_WITH_OUTFIT];//JSON.parse(response.data)._embedded.outfitDtoes;//response.json();
				console.log("json");
				console.log(json);
				dispatch(genericActions.receiveEntities(OxiAppConstants.EntityTypes.AUX_CONTENT.toLowerCase(), null));
				//normalize received json payload
				let normalizedJson = normalize(json, contentWithOutfitSchema);
				console.log('entitiesStateReducer', normalizedJson); 
				dispatch(entityActions.createAuxContent(normalizedJson.entities[OxiAppConstants.JsonPropertyNames.CONTENT_WITH_OUTFIT]));
				getLinks(dispatch, response.data._links, OxiAppConstants.EntityTypes.AUX_CONTENT);
				return response;
			}else{
				//handleUnauthorizedRequest(response);
			}
		})
		.catch(error => {
			dispatch(genericActions.receiveEntities(OxiAppConstants.EntityTypes.AUX_CONTENT.toLowerCase(), null));
			console.log(error);
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
				//Check if error is due to forbidden response staatus
				dispatch(networkActions.handleUnauthorizedRequest(error.response));
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
		dispatch(genericActions.requestEntities(entityType));
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
						dispatch(genericActions.receiveEntities(entityType.toLowerCase(), null));
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
						dispatch(networkActions.handleUnauthorizedRequest(error.response));
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
				dispatch(entityActions.replaceOutfits(normalizedJson.entities[entity]));	
				break;

			case OxiAppConstants.JsonPropertyNames.LIKE_COUNT:

				dispatch(entityActions.replaceLikeCount(normalizedJson.entities[entity]));
				break;
	
			case OxiAppConstants.JsonPropertyNames.CONTENT:
	
				containsContents = true;
				dispatch(entityActions.replaceContents(normalizedJson.entities[entity]));	
				break;	
	
			case OxiAppConstants.JsonPropertyNames.ITEM:
	
				dispatch(entityActions.replaceItems(normalizedJson.entities[entity]));
				break;
	
			case OxiAppConstants.JsonPropertyNames.PICTURE:
	
				dispatch(entityActions.replacePictures(normalizedJson.entities[entity]));
				break;
	
			case OxiAppConstants.JsonPropertyNames.SIZE_CHART:
	
				dispatch(entityActions.replaceSizeCharts(normalizedJson.entities[entity]));
				break;
	
			case OxiAppConstants.JsonPropertyNames.SIZE_GROUP:
	
				dispatch(entityActions.replaceSizeGroups(normalizedJson.entities[entity]));
				break;
	
			default:
				break;
		}
	}
	//select the first outfit if it exists
	if(containsOutfits){
		let outfitKeys = Object.keys(normalizedJson.entities["outfits"]);		
		if (outfitKeys.length > 0) dispatch(genericActions.selectEntity(OxiAppConstants.EntityTypes.OUTFIT, outfitKeys[0]));		
		//select the first content if it exist
		if(containsContents){
			let contentKeys = Object.keys(normalizedJson.entities["contents"]);
			if (contentKeys.length > 0) dispatch(genericActions.selectEntity(OxiAppConstants.EntityTypes.CONTENT, contentKeys[0]));
		}
	}
}

export function verifyIntent(formType){
	return function(dispatch, getState){
		dispatch(entityActions.createModal({
			id: formType,
		}));
		//switch(intentTo){
		//	case OxiAppConstants.Intent.DISCARD_EDITS:
		//					
		//		if(getState().toggleModal.isModalVisible){
		//			// Modal is currrently open so just overlay over existing modal
		//			dispatch(setFormOverlayVisibility(OxiAppConstants.FormType.DISCARD_EDITS))
		//		}
		//		else{
		//			dispatch(setFormVisibility(OxiAppConstants.FormType.DISCARD_EDITS, null, null));
		//		}

		//		break;

		//	case OxiAppConstants.Intent.DELETE_OUTFITS:
		//		// Not expecting to require overlayed modal during outfit delete confirmation
		//		dispatch(setFormVisibility(OxiAppConstants.FormType.DELETE_OUTFITS, null, null));
		//		break;

		//	default:
		//		break;
		//}
	}
}

/*
* Use this action to batch select nested entities retreived from server.
*
* @param    {String}    valid entityType from OxiAppConstants.EntityTypes to select.
* @param    {String}    valid id of the entity selected.
* @param    {STring}    valid id of the child entity to be selected next.
*/
export function selectAndPropagate(entityType, entityId, targetChildId, entitiesStateReducer){
	return function(dispatch){
		console.log("selectAndPropagate entityType = ", entityType);
		switch(entityType){
			case OxiAppConstants.EntityTypes.OUTFIT:
				entitiesStateReducer ? 
					dispatch(genericActions.updatePrevSelectedEntity(OxiAppConstants.EntityTypes.OUTFIT, entitiesStateReducer.outfits.selected)) : 
					dispatch(genericActions.updatePrevSelectedEntity(OxiAppConstants.EntityTypes.OUTFIT, entityId));

				dispatch(genericActions.selectEntity(OxiAppConstants.EntityTypes.OUTFIT, entityId));
				//dispatch(genericActions.selectEntity(OxiAppConstants.EntityTypes.OUTFIT, (entityId || false)));
				console.log("targetChildId = ", targetChildId);
				dispatch(selectAndPropagate(OxiAppConstants.EntityTypes.CONTENT, targetChildId, null, entitiesStateReducer));
				break;
			case OxiAppConstants.EntityTypes.CONTENT:
				entitiesStateReducer ? 
					dispatch(genericActions.updatePrevSelectedEntity(OxiAppConstants.EntityTypes.CONTENT, entitiesStateReducer.contents.selected)) :
					dispatch(genericActions.updatePrevSelectedEntity(OxiAppConstants.EntityTypes.CONTENT, entityId));
				dispatch(genericActions.selectEntity(OxiAppConstants.EntityTypes.CONTENT, entityId));
				break;
			default:
				break
		}
		return;
	}
}

//use this action to batch deselect selected nested entities
//@param {String} valid entityType from OxiAppConstants.EntityTypes to deselect
export function deselectAndPropogate(entityType){
	return function(dispatch){
		console.log("selectAndPropagate entityType = ");
		console.log(entityType);
		switch(entityType){
			case OxiAppConstants.EntityTypes.OUTFIT:
				dispatch(genericActions.selectEntity(OxiAppConstants.EntityTypes.OUTFIT, false));
				dispatch(deselectAndPropogate(OxiAppConstants.EntityTypes.CONTENT));
				break;
			case OxiAppConstants.EntityTypes.CONTENT:
				dispatch(genericActions.selectEntity(OxiAppConstants.EntityTypes.CONTENT, false));
				dispatch(deselectAndPropogate(OxiAppConstants.EntityTypes.ITEM));
				break;
			case OxiAppConstants.EntityTypes.ITEM:
				dispatch(genericActions.selectEntity(OxiAppConstants.EntityTypes.ITEM, false));
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
				dispatch(entityActions.selectAddedOutfit(entityId));
				return;
			case OxiAppConstants.EntityTypes.CONTENT:
				dispatch(entityActions.selectAddedContent(entityId));
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
				dispatch(genericActions.removeAllAddedEntities(OxiAppConstants.EntityTypes.OUTFIT));
			case addedEntities.contents.allIds.length > 0:
				dispatch(genericActions.removeAllAddedEntities(OxiAppConstants.EntityTypes.CONTENT));
			case addedEntities.items.allIds.length > 0:
				dispatch(genericActions.removeAllAddedEntities(OxiAppConstants.EntityTypes.ITEM));
			case addedEntities.itemContent.allIds.length > 0:
				dispatch(genericActions.removeAllAddedEntities(OxiAppConstants.EntityTypes.ITEM_CONTENT));
			default:
				return;	
		}
	}
}

function removeAndPropagate(entityType, entity, removalFunctions){
	switch(entityType){
		case OxiAppConstants.EntityTypes.OUTFIT:
			//Remove any child entities
			dispatch(genericActions.selectEntity(entityType, false));

			if(entity.contents){
				for(let content of entity.contents){
					//console.log('removeAddedEntityAndPropogate(): content = ', content)
					if(entity.contents.length > 0) dispatch(removeAndPropagate(OxiAppConstants.EntityTypes.CONTENT, content, removalFunctions));
				}
			}

			dispatch(removalFunctions[OxiAppConstants.EntityTypes.OUTFIT](entity.id));
			break;

		case OxiAppConstants.EntityTypes.CONTENT:
			//Remove any child entities
			dispatch(genericActions.selectEntity(entityType, false));

			if(entity.items){
				for(let item of entity.items){
					//console.log('removeAddedEntityAndPropogate(): item = ', item)
					if(entity.items.length > 0) dispatch(removeAndPropagate(OxiAppConstants.EntityTypes.ITEM, item, removalFunctions));
				}
			}

			dispatch(removalFunctions[OxiAppConstants.EntityTypes.CONTENT](entity.id));
			break;

		case OxiAppConstants.EntityTypes.ITEM:
			dispatch(removalFunctions[OxiAppConstants.EntityTypes.ITEM](entity.id));
			break;

		default:
			break;
	}

	return;
}

export function removeAddedEntityAndPropogate(entityType, entity){
	return function(dispatch){
		removeAndPropagate(entityType, entity, {
			[OxiAppConstants.EntityTypes.OUTFIT]: (entityId) => dispatch(enityActions.removeAddedOutfit(entityId)),
			[OxiAppConstants.EntityTypes.CONTENT]: (entityId) => dispatch(enityActions.removeAddedContent(entityId)),
			[OxiAppConstants.EntityTypes.ITEM]: (entityId) => dispatch(enityActions.removeAddedItem(entityId)),

		});
//
		//console.log("selectAndPropagate entityType = ", entityType);
		//switch(entityType){
		//	case OxiAppConstants.EntityTypes.OUTFIT:
		//		//Remove any child entities
		//		dispatch(genericActions.selectEntity(entityType, false));
		//		if(entity.contents){
		//			for(let content of entity.contents){
		//				//console.log('removeAddedEntityAndPropogate(): content = ', content)
		//				if(entity.contents.length > 0) dispatch(removeAddedEntityAndPropogate(OxiAppConstants.EntityTypes.CONTENT, content));
		//			}
		//		}
		//		//console.log('removeAddedEntityAndPropogate():  Removing Outfit with id ', entity.id)
		//		dispatch(enityActions.removeAddedOutfit(entity.id));
		//		break;
		//	case OxiAppConstants.EntityTypes.CONTENT:
		//		//Remove any child entities
		//		dispatch(genericActions.selectEntity(entityType, false))
		//		if(entity.items){
		//			for(let item of entity.items){
		//				//console.log('removeAddedEntityAndPropogate(): item = ', item)
		//				if(entity.items.length > 0) dispatch(removeAddedEntityAndPropogate(OxiAppConstants.EntityTypes.ITEM, item));
		//			}
		//		}
		//		//console.log('removeAddedEntityAndPropogate():  Removing Content with id ', entity.id)
		//		//Remove content
		//		dispatch(entityActions.removeAddedContent(entity.id));
		//		break;
		//	case OxiAppConstants.EntityTypes.ITEM:
		//		//console.log('removeAddedEntityAndPropogate():  Removing Item with id ', entity.id)
		//		//Remove item
		//		dispatch(entityActions.removeAddedItem(entity.id));
		//	default:
		//		break
		//}
//
		return;
	}
}

//export function removeEntityAndPropagate(entityType, entity){
//	return function(dispatch){
//		removeAndPropagate(entityType, entity, {
//			[OxiAppConstants.EntityTypes.OUTFIT]: (entityId) => dispatch(enityActions.replaceOutfit(entityId)),
//			[OxiAppConstants.EntityTypes.CONTENT]: (entityId) => dispatch(enityActions.replaceContent(entityId)),
//			[OxiAppConstants.EntityTypes.ITEM]: (entityId) => dispatch(enityActions.replaceItem(entityId)),
//
//		});
//	}
//}