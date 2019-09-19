import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import {normalize, denormalize} from 'normalizr';
import {outfitsSchema, profileSchema, contents, items, likeCountSchema, contentWithOutfitSchema, contentWithOutfits} from '../../Util/Schema.js';
import {buildItemContentsObject} from '../../Util/Schema.js'
import Cookies from 'universal-cookie';
import qs from 'qs';
import axios from 'axios';
//import {...} from './EntityActions/AppActions.js';
//import {...} from './EntityActions/ApparelTypeActions.js';
//import {...} from './EntityActions/BrandActions.js';
//import {...} from './EntityActions/ContentActions.js';
//import {...} from './EntityActions/ItemActions.js';
//import {...} from './EntityActions/ItemContentActions.js';
//import {...} from './EntityActions/LikeCountActions.js';
//import {...} from './EntityActions/OutfitActions.js';
//import {...} from './EntityActions/PictureActions.js';
//import {...} from './EntityActions/ProfileActions.js';
//import {...} from './EntityActions/RetailerActions.js';
//import {...} from './EntityActions/SizeChartActions.js';
import * as entityActions from './EntityActions/Index.js';
import * as types from './Types.js';
import * as genericActions from './GenericActions.js';
import * as scaffolding from './Scaffolding.js';
import {setFormVisibility} from './indexActions.js'



//Sets the navigation location in application state.  This is refered back to in the event of a dipatched confirmation or login modal during site navigation
export const requestNavigation = scaffolding.makeActionCreator(types.REQUEST_NAVIGATION, null, 'location');
export const cookies = new Cookies();

const postConfig = (url, data, params, headers) => {
	//let authScheme = cookies.get('auth_scheme') !== null ? cookies.get('auth_scheme') : '';
	//let authToken = '';// cookies.get('auth_token') !== null ? cookies.get('auth_token') : '';
	return {
		method: 'POST',
		//headers: {'content-type': 'application/x-www-form-urlencoded'},
		//data: qs.stringify(data),
		headers:{
			//'content-type': 'application/x-www-form-urlencoded',
			'content-type': 'application/json;charset=UTF-8',
			...headers
			//'Authorization':(authScheme + authToken)
		},
		data: data,
		params: params,
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
		},
		{
		},
		{
			'content-type':'application/x-www-form-urlencoded'
		}
	);
}

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


export const receivedSearchExistingItem = scaffolding.makeActionCreator(types.RECEIVED_EXISTING_ITEMS_SEARCH, null, 'retailerItemResults');
export const receivedSearchRetailers = scaffolding.makeActionCreator(types.RECEIVED_RETAILER_NAMES_SEARCH, null, 'retailerNameResults');
export const receivedSearchUserDefinedRetailers = scaffolding.makeActionCreator(types.RECEIVED_UDR_NAMES_SEARCH, null, 'udrNameResults');
export const receivedSearchUserDefinedSizes = scaffolding.makeActionCreator(types.RECEIVED_UDS_LABELS_SEARCH, null, 'udsLabelResults');
export const receivedAllApparelTypes = scaffolding.makeActionCreator(types.RECEIVED_ALL_APPAREL_TYPES, null, 'allApparelTypes');
export const receivedSizeGroupsByItemId = scaffolding.makeActionCreator(types.RECEIVED_SIZE_GROUPS_BY_ITEM_ID, null, 'sizeResults');


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
				dispatch(entityActions.replaceProfile({'owner': response.data}));
				//populate the profile view with usr content
				///dispatch(fetchEntities('outfit', response.data.id));
				//remove the sent profile from local addedEntitesReducer store
				dispatch(entityActions.removeProfile(id));
			}
		})
	}
}

export function postSaveItem(itemId, onSuccess){
	let itemID = itemId.toUpperCase();
	return function(dispatch){
		return axios.post(`${OxiAppConstants.serviceURL}/bookmark/${itemId}`, {}).then(response => {
			if(response.status == OxiAppConstants.HttpStatus.CREATED){
				dispatch(genericActions.addToMap(OxiAppConstants.MapTypes.a, itemID, response.data));
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
				dispatch(genericActions.removeFromMap(OxiAppConstants.MapTypes.a, itemID));
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
				dispatch(genericActions.replaceMap(OxiAppConstants.MapTypes.a, response.data));
			}else{
				console.log("request failed");
			}
		})
	}
}

export function postLike(outfitId, outfit){
	return function(dispatch){
		return axios.post(`${OxiAppConstants.serviceURL}/like/${outfitId}`).then(response => {
			if(response.status === OxiAppConstants.HttpStatus.CREATED){

				dispatch(entityActions.replaceLikeCount({[response.data.id]: response.data}));
				dispatch(entityActions.toggleOutfitIsLiked(outfitId));
			}else{
				console.log("request failed");
			}
		});
	}	
}

export function postUnlike(outfitId, username){
	return function(dispatch){
		return axios.post(`${OxiAppConstants.serviceURL}/unlike/${outfitId}`).then(response => {
			if(response.status === OxiAppConstants.HttpStatus.CREATED){

				dispatch(entityActions.replaceLikeCount({[response.data.id]: response.data}));
				dispatch(entityActions.toggleOutfitIsLiked(outfitId));
			}else{
				console.log("request failed");
			}
		});
	}
}

export function fetchMetrics(outfitId){
	return function(dispatch){
		dispatch(genericActions.requestEntities(OxiAppConstants.EntityTypes.PROFILE));
		//Check outfit Id is valid
		return axios.get(OxiAppConstants.serviceURL + '/profile?filter=' + outfitId)
		.then((response) => {
			if(response.status === OxiAppConstants.HttpStatus.OK){
				//The return entity is not nested so we do not need to make calls to normalizr before dropping into redux tree
				dispatch(genericActions.receiveEntities(OxiAppConstants.EntityTypes.PROFILE.toLowerCase(), null));
				dispatch(entityActions.replaceProfile({'host' : response.data}));

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

export function fetchEntities(entityType, username, filter, linkURL=null, pageStart=0, pageSize=10, config={}){
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
						//The return entity is not nested so we do not need to make calls to normalizr before dropping into redux tree
						dispatch(genericActions.receiveEntities(entityType.toLowerCase(), null));
						dispatch(entityActions.replaceProfile({'owner' : response.data}));

					}else{
						throw 'Unexpected response status received when fetching retailers:  ' + response.status;
					}
				});
				break;
			case OxiAppConstants.EntityTypes.OUTFIT:
				requestParams = 'filter=' + filter;
				URI = linkURL ? '' : '/outfits';
				username = linkURL ? '' : username;
				console.log(`requestParams = ${requestParams}, URI = ${URI}, username = ${username}, linkURL = ${linkURL}`)
				return axios.get(`${(linkURL || OxiAppConstants.serviceURL)}${URI}${username}?${requestParams}&page=${pageStart}&size=${pageSize}`, config)
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
						let likeCount = normalizedJson.entities[OxiAppConstants.JsonPropertyNames.LIKE_COUNT]
						
						dispatch(entityActions.createItemContent(itemContentJson));	
						dispatch(entityActions.createLikeCount(likeCount));

						mergeResponseEntities(dispatch, normalizedJson);
						let outfitKeys = Object.keys(normalizedJson.entities.outfits);
						//genericActions.selectEntity(OxiAppConstants.EntityTypes.OUTFIT, (outfitKeys.length > 0 ? normalizedJson.entities.outfits[outfitKeys[0]].id : false));
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
									'product':currentObject.product,
									'coverpicuri':currentObject.coverpicuri,
									'outfitId':currentObject.outfitId,
								}
							}));
						},{});
						console.log('normalizedJson Items:  ', normalizedJson);
						dispatch(genericActions.receiveEntities(entityType.toLowerCase(), null));
						//dispatch(entityActions.replaceItems(normalizedJson));
						if(response.data.page !== undefined){
							const {size, totalElements, totalPages, number} = response.data.page;
							console.log(`size = ${size}, totalElements = ${totalElements}, totalPages = ${totalPages}, number = ${number}`);

							dispatch(genericActions.setEntityCurrentPage(OxiAppConstants.EntityTypes.ITEM, number));
							dispatch(genericActions.setEntityLastPage(OxiAppConstants.EntityTypes.ITEM, totalPages - 1));
							dispatch(genericActions.modifyPagedEntityIds(OxiAppConstants.EntityTypes.ITEM, number, Object.keys(normalizedJson)));
							//dispatch(setCurrentEntityPage(OxiAppConstants.EntityTypes.ITEM, number));
						}

						//TODO: this is makes unecessary calls to redux store.  setting page URL should be handled in the PageList component, but Im not sure how to extract 
						//		response data from the dispatch call in PageListContainer.  quick fix is to set the values here then reset them with the corred page number in
						//		PageList component :(
						if(linkURL === null){
							if(response.data._links !== undefined){
								response.data._links.next ? 
									dispatch(genericActions.setNextPageURL(OxiAppConstants.EntityTypes.ITEM, response.data._links.next.href)) : 
									dispatch(genericActions.setNextPageURL(OxiAppConstants.EntityTypes.ITEM, null));
								!response.data._links.prev ? 
									dispatch(genericActions.setPrevPageURL(OxiAppConstants.EntityTypes.ITEM, null)) :
									dispatch(genericActions.setPrevPageURL(OxiAppConstants.EntityTypes.ITEM, response.data._links.prev.href)) 
							}
						}
							
						//mergeResponseEntities(dispatch, {'entities': {'items': normalizedJson}}); //TODO clean this up.  Use schema
						dispatch(entityActions.replaceItems(normalizedJson));
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

export const fetchContentsWithOutfitByItemId = (itemId, linkURL=null, pageStart=0, pageSize=50) => {
	return function(dispatch){
		dispatch(genericActions.requestEntities(OxiAppConstants.EntityTypes.CONTENT));
		let pageStart = 0;
		let pageSize = 9;
		let pageBufferSize = 2;
		let URI = linkURL ? '' : `/contents/items/${itemId}`;
		return axios.get(`${linkURL || OxiAppConstants.serviceURL}${URI}?page=${pageStart}&size=${pageSize}`)
		.then((response) => {
			if(response.status === OxiAppConstants.HttpStatus.OK){
				let json = response.data._embedded[OxiAppConstants.EmbeddedEntityPropertyNames.CONTENT_WITH_OUTFIT];//JSON.parse(response.data)._embedded.outfitDtoes;//response.json();
				console.log("json");
				console.log(json);
				dispatch(genericActions.receiveEntities(OxiAppConstants.EntityTypes.CONTENT.toLowerCase(), null));
				//normalize received json payload
				let normalizedJson = normalize(json, contentWithOutfitSchema);

				console.log('entitiesStateReducer', normalizedJson); 
				
				//Manually build itemContents join table
				//let itemContentJson = buildItemContentsObject(OxiAppConstants.JsonPropertyNames.CONTENT, json);
				//dispatch(createItemContent(itemContentJson));							
	

				if(response.data.page !== undefined){
					const {size, totalElements, totalPages, number} = response.data.page;
					console.log(`size = ${size}, totalElements = ${totalElements}, totalPages = ${totalPages}, number = ${number}`);

					dispatch(genericActions.setEntityCurrentPage(OxiAppConstants.EntityTypes.CONTENT, number));
					dispatch(genericActions.setEntityLastPage(OxiAppConstants.EntityTypes.CONTENT, totalPages - 1));
					dispatch(genericActions.modifyPagedEntityIds(OxiAppConstants.EntityTypes.CONTENT, number, Object.keys(normalizedJson.entities.contents)));
					//dispatch(setCurrentEntityPage(OxiAppConstants.EntityTypes.ITEM, number));
				}


				//mergeResponseEntities(dispatch, normalizedJson);
				//dispatch(entityActions.replaceContents(normalizedJson.entities.contents));
				//dispatch(createPictures(normalizedJson.entities.picture));
				dispatch(entityActions.createContent(normalizedJson.entities[OxiAppConstants.JsonPropertyNames.CONTENT_WITH_OUTFIT]));
				/*let contentKeys = Object.keys(normalizedJson.entities.contents);
				contentKeys ? modifyPagedEntityIds(OxiAppConstants.EntityTypes.CONTENT, page, contentKeys) : null*/
				//genericActions.selectEntity(OxiAppConstants.EntityTypes.OUTFIT, (outfitKeys.length > 0 ? normalizedJson.entities.outfits[outfitKeys[0]].id : false));
				return response;
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
					dispatch(genericActions.updatePrevSelectedEntity(OxiAppConstants.EntityTypes.OUTFIT, entitiesStateReducer.outfits.selected)) : 
					dispatch(genericActions.updatePrevSelectedEntity(OxiAppConstants.EntityTypes.OUTFIT, entityId));

				dispatch(genericActions.selectEntity(OxiAppConstants.EntityTypes.OUTFIT, entityId));
				//dispatch(genericActions.selectEntity(OxiAppConstants.EntityTypes.OUTFIT, (entityId || false)));
				console.log("targetChildId = ", targetChildId);
				dispatch(selectAndPropogate(OxiAppConstants.EntityTypes.CONTENT, targetChildId, null, entitiesStateReducer));
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
//@param {String} valid id of the entity deselected
export function deselectAndPropogate(entityType){
	return function(dispatch){
		console.log("selectAndPropogate entityType = ");
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

export function removeAddedEntityAndPropogate(entityType, entity){
	return function(dispatch){
		//console.log("selectAndPropogate entityType = ", entityType);
		switch(entityType){
			case OxiAppConstants.EntityTypes.OUTFIT:
				//Remove any child entities
				dispatch(genericActions.selectEntity(entityType, false));
				if(entity.contents){
					for(let content of entity.contents){
						//console.log('removeAddedEntityAndPropogate(): content = ', content)
						if(entity.contents.length > 0) dispatch(removeAddedEntityAndPropogate(OxiAppConstants.EntityTypes.CONTENT, content));
					}
				}
				//console.log('removeAddedEntityAndPropogate():  Removing Outfit with id ', entity.id)
				dispatch(enityActions.removeAddedOutfit(entity.id));
				break;
			case OxiAppConstants.EntityTypes.CONTENT:
				//Remove any child entities
				dispatch(genericActions.selectEntity(entityType, false))
				if(entity.items){
					for(let item of entity.items){
						//console.log('removeAddedEntityAndPropogate(): item = ', item)
						if(entity.items.length > 0) dispatch(removeAddedEntityAndPropogate(OxiAppConstants.EntityTypes.ITEM, item));
					}
				}
				//console.log('removeAddedEntityAndPropogate():  Removing Content with id ', entity.id)
				//Remove content
				dispatch(entityActions.removeAddedContent(entity.id));
				break;
			case OxiAppConstants.EntityTypes.ITEM:
				//console.log('removeAddedEntityAndPropogate():  Removing Item with id ', entity.id)
				//Remove item
				dispatch(entityActions.removeAddedItem(entity.id));
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
			dispatch(genericActions.selectEntity(OxiAppConstants.EntityTypes.OUTFIT, entityArray[0]));
		case OxiAppConstants.EntityTypes.CONTENT:
			dispatch(genericActions.selectEntity(OxiAppConstants.EntityTypes.CONTENT, entityArray[0]));
	}
	if (entityArray.length > 0){
		dispatch(genericActions.selectEntity(OxiAppConstants.EntityTypes.CONTENT, entityArray[0]));
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
		dispatch(scaffolding.makePromiseActionCreator(`POST_${entityType.toUpperCase()}`, entityType.toUpperCase(), promise))();
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