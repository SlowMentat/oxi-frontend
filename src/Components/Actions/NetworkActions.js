import { OxiAppConstants } from '../../Util/OxiAppConstants.js';
import { normalize, denormalize } from 'normalizr';
import { outfitsSchema, profileSchema, contents, items, likeCountSchema, contentWithOutfitSchema, contentWithOutfits } from '../../Util/Schema.js';
import { buildItemContentsObject } from '../../Util/Schema.js'
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
import { setFormVisibility , navigateTo} from './indexActions.js';
import { RequestFailedException } from '../../Util/CustomExceptions.js';
import { isDataUrl } from '../../Util/Misc.js';


//Sets the navigation location in application state.  This is refered back to in the event of a dipatched confirmation or login modal during site navigation
export const requestingNavigation = scaffolding.makeActionCreator(types.REQUEST_NAVIGATION, null, 'location');
export const cookies = new Cookies();
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.defaults.headers.common['authorization'] = cookies.get('authorization'); 

//axios.defaults.headers.common['authorization'] = cookies.get('authorization'); 
export const defaultCookieOptions = {
	secure: true,
	//httpOnly: true,
	path:'/shop',
	maxAge: 86400, // 24hrs
};

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

export const loginConfig = (payload, serviceURL/*username, password*/) => {
	return postConfig(
		serviceURL + '/login',
		{
			//'X-CSRF-TOKEN' : cookies.get('csrf_token'),
			//'username' : username,
			//'password' : password
			...payload,
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

			cookies.set('csrf_token', response.headers['x-csrf-token'], defaultCookieOptions);
			cookies.set('authorization', response.headers['www-authenticate'] + ' ', defaultCookieOptions);
			axios.defaults.headers.common['authorization'] = cookies.get('authorization'); 

			dispatch(setFormVisibility("Login", response.request.responseURL, response.config.method));
			return response;
		}
		
		return response;
	}	
};

export function logout(){
	//clear authorization token
	cookies.remove('authorization', defaultCookieOptions);
	cookies.remove('csrf_token', defaultCookieOptions);
	axios.defaults.headers.common['authorization'] = null
}

//Thunks dispatched by anonymous callback functions passed to Axios response interceptor
export const insertCsrfToken = (config) => {
	/*console.log("Adding to request headers the csrf_token stored in cookies");
	console.log(cookies.get('csrf_token'));
	if(cookies.get('csrf_token') !== null){
		console.log("csrf_token in cookies is not null");
		config['X-CSRF-TOKEN'] = cookies.get('csrf_token')		
	}*/
	return config;
};


export const receivedSearchExistingItem = scaffolding.makeActionCreator(types.RECEIVED_EXISTING_ITEMS_SEARCH, null, 'retailerItemResults');
export const receivedSearchRetailers = scaffolding.makeActionCreator(types.RECEIVED_RETAILER_NAMES_SEARCH, null, 'retailerNameResults');
export const receivedSearchUserDefinedRetailers = scaffolding.makeActionCreator(types.RECEIVED_UDR_NAMES_SEARCH, null, 'udrNameResults');
export const receivedSearchUserDefinedSizes = scaffolding.makeActionCreator(types.RECEIVED_UDS_LABELS_SEARCH, null, 'udsLabelResults');
export const receivedAllApparelTypes = scaffolding.makeActionCreator(types.RECEIVED_ALL_APPAREL_TYPES, null, 'allApparelTypes');
export const receivedSizeGroupsByItemId = scaffolding.makeActionCreator(types.RECEIVED_SIZE_GROUPS_BY_ITEM_ID, null, 'sizeResults');

/*
*  Modifies content.picture json with the json data returned from Posting image data to server, and updates each content's coverPictureId if picture object has been updated.
*  
*  @param {Object} contentJson:  the [contents] json body to be modified
*  @param {Object} picturesJson:  The [picture] object return by the server.  This objet should contain the id and parent id 
*/
function mergePictureJson(contentsJson, picturesJson){

	if(picturesJson !== undefined && picturesJson !== null && Object.keys(picturesJson).length > 0){

		//Case when a single new content is posted.  the returned picture json object has id and contentId properties = null.
		if(picturesJson[0].contentId === null){
			picturesJson[0].contentId = undefined;

			//set picture and coverPictureId properties
			contentsJson[0] = {
				...contentsJson[0],
				coverPictureId: picturesJson[0].id,
				picture: picturesJson[0],
			};
		}

		else{

			for(let pkey of Object.keys(picturesJson)){

				for(let ckey of Object.keys(contentsJson)){

					if(contentsJson[ckey].id === picturesJson[pkey].contentId){
						//remove content property from the picture json object returned by the server
						picturesJson[pkey].contentId = undefined;
						//set picture and coverPictureId properties
						contentsJson[ckey] = {
							...contentsJson[ckey],
							coverPictureId: picturesJson[pkey].id,
							picture: picturesJson[pkey]
						};
					}
				}
			}			
		}
	}

	return contentsJson;
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
export function postProfile(profile, destination=OxiAppConstants.navRequestMap.b.toLowerCase()){
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

				//dispatch(navigateTo(OxiAppConstants.navRequestMap.b.toLowerCase()));

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

const handleReqError = (thrown) => {
	if(axios.isCancel(thrown)){
		console.log('Request canceled', thrown.message);
	}

	else{
		//handle error
	}
}

export function fetchImage(filename, callback, picture, cancel=()=>{} ){
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
			},
			cancelToken: new CancelToken(function executor(c){
				// An executor function receives a cancel function as a parameter
				cancel = c;
			}),
		})

		if(filename.split(':', 2)[0].toLowerCase() === 'blob'){
			request.get(filename)
			.then(response => callback(null, response, picture))
			.catch(handleReqError);

		}else{
			return request.get(OxiAppConstants.serviceURL + '/image/' + filename + '?mediaType=jpeg&mediaType=json')
			//Server returns data enclosed in quatations.  Quotations are striped from the ByteArray here and converted utf8 charset.
			.then(response => Buffer.from(response.data, 1, response.data.byteLength-2).toString('utf8'))
			.then(response => callback(null, response, picture))
			.catch(handleReqError);
		}
	}
}

//POST image data to server
/* 
*  Creates post single multiple images to server.
*  @param 	{Array} 		imageFile					Base64 encoded image data.
*  @param 	{function}		generateOnSuccessHandler	callback invoked when promise resolved.  The result will be passed to this function
*  @param 	{string}		filename 					filename associated with imageFile data.
*  @param 	{boolean}		isProfile					boolean indicating if image is profile pic.
*  @param 	{string}		crop 						crop data associated with file
*
*  @returns {object}		Promise resolving to an object where key is the filename and value is the response body (key:{string}, value:{object})		
*/
/*export async function postImage(imageFile, generateOnSuccessHandler, filename, isProfile=false, crop){
	let imageFormData = new FormData();
	imageFormData.append('imageFile', imageFile);
	console.log("in postImage action");

	return axios.post(
		OxiAppConstants.serviceURL + (isProfile ? '/updateProfilePhoto' : '/uploadPhoto'), 
		imageFormData,
		//{
		//	headers:{
		//		'Content-Disposition': 'form-data; name=\"imageFile\"',
		//		'Content-Transfer-Encoding': 'base64',
		//	}
		//}
	)
	.then(response => {

		if(response.status === OxiAppConstants.HttpStatus.CREATED){
			generateOnSuccessHandler && generateOnSuccessHandler()(response.data);
			return {[filename]: response.data};
		}

		else{
			throw response.status;
		}
	})
	.catch(msg => console.error(msg));
}*/

export async function putCrop(imageFiles, contentId, crop, oglFilename, type=''){
	//const oglFilename = imageFiles[contentId] ? imageFiles[contentId].fileData.match(/\/(ogl[a-zA-Z0-9]+).[a-z]+$/)[1] : filename;
	return axios.put(
		OxiAppConstants.serviceURL + `/crop?type=${type}`,
		{
			crop,
			originaluri: oglFilename,
			contentId,
		},
		{}
	).then(response => {
		if(response.status === OxiAppConstants.HttpStatus.OK){
			var result = contentId ? {[contentId]: response.data} : response.data;
			return result;
		}
		else{
			throw response.status;
		}

	}).catch(err => console.error(err));
}

export async function postImage(imageFile, generateOnSuccessHandler, filename, isProfile=false, crop){
	let imageFormData = new FormData(); 
	imageFormData.append('imageFile', imageFile);
	imageFormData.append('crop', crop);
	console.log("in postImage action");

	return axios.post(
		OxiAppConstants.serviceURL + (isProfile ? '/updateProfilePhoto' : '/uploadPhoto'), 
		imageFormData,
		{
			//headers: {
			//	...imageFormData.getHeaders(),
			//}
			headers:{
				'Content-Disposition': 'form-data; name=\"imageFile\"',
				'Content-Transfer-Encoding': 'base64',
			}
		}
	)
	.then(response => {
		if(response.status === OxiAppConstants.HttpStatus.CREATED){
			generateOnSuccessHandler && generateOnSuccessHandler()(response.data);
			return {[filename]: response.data};
		}
		else{
			throw response.status;
		}
	})
	.catch(msg => console.error(msg));
}

export function putImage(imageFile, contentId, onSuccess, fileId, crop){
	let imageFormData = new FormData();
	imageFormData.append('imageFile', imageFile);
	console.log("#putImage:  contentId = ", contentId, ", fileId = ", fileId);

	return axios.post(
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
		}
		else{
			return response.status;
		}
	});
}

/** 
*  Asynchronously posts or puts one or more images to server.
*  @param {Object} [imageFiles={}] - Object property keys representing filename and corresponding values representing image data.
*  @callback {generateOnSuccessHandler} generateOnSuccessHandler - callback invoked when promise resolved.  The result will be passed to this function*
*  @param [{Object}]	crops 	each imageFiles' crop data.  crops must be in the same order as imageFiles.
*/
export async function uploadImages(imageFiles={}, generateOnSuccessHandler, crops){
	var pictures = {};
	
	try{
		var batchRequest = [];
		var ind = 0;

		for(var contentId of Object.keys(imageFiles)){
			let crop = JSON.stringify(crops[ind]);
			ind++;

			let {
				contentId,
				fileData,	// fileData can either be base64 data url string, or a resource url
			} = imageFiles[contentId];

			// New image has been added
			//if(isDataUrl(imageFiles[filename].fileData)){
			if(!!fileData.match(/^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i)){
				batchRequest = [...batchRequest, postImage(fileData, null, contentId, false, crop )];
			}
			// Crop of exisitng image has changed. 
			else{
				let filename = imageFiles[contentId].fileData.match(/\/(ogl[a-zA-Z0-9]+).[a-z]+$/)[1];
				batchRequest = [...batchRequest, putCrop(imageFiles, contentId, crop, filename)];
			}

			//batchRequest = [
			//	...batchRequest, 
			//	(typeof filename === 'number' ? 
			//		postImage(fileData, null, filename, false, crop ) : 
			//		putImage(fileData, filename, null, filename, crop )),
			//];
		}

		await Promise.all(batchRequest)
		.then(results => {
			// results is of the form [{ [picture name]: {} }]
			console.log("#uploadImages:  pictures = ", results);
			
			var picturesByContentId = results.reduce((accum, result, ind) => {
				const contentId = Object.keys(result)[0];

				var scrubbedResult = {
					...result,
					[contentId]:{
						...result[contentId],
						crop: JSON.stringify(crops[ind]),
					}
				}

				return ({
					...accum,
					...scrubbedResult,
					//...(result.id ? ({[result.id]: result}) : {}),
				})
			}, pictures);

			generateOnSuccessHandler()(picturesByContentId);
		});	
	}
	catch(e){
		console.error(e);
		throw e;
	}
}


export function postOutfit(outfitJson, onSuccess){
	return (picturesByContentId) => {
		const {
			id,
			mediumuri,
		} = picturesByContentId[Object.keys(picturesByContentId)[0]];

		axios.post(
			OxiAppConstants.serviceURL + '/outfit',
			{
				...outfitJson, 
				coverPictureId: id,
				// Coverpicuri needs to be set because outfit entities retreived from the browse tab will not have their content porperity (and consequently its picture property) set.
				// Its more efficient to explicitly set coverpicuri in this case rather than making additional requests for picture to determin the cover picture filename.
				coverpicuri: mediumuri,		 
				contents: outfitJson.contents.map(content => {
					let picture = picturesByContentId[content.id];

					return {
						...content,
						id: null,
						picture: {
							...picture, 
							contentId: undefined,
						},
						//coverPictureId: picture.id,
					};
				}),
			},
			{}
		)
		.then(response => {
			if(response.status === OxiAppConstants.HttpStatus.CREATED){
				// Construct picture entities keyed by their ids
				var picturesById = Object.values(picturesByContentId).reduce((accum, picture) => ({...accum, [picture.id]:picture}), {});
				onSuccess([response], picturesById);
			}
			return response.status;
		})
	}
}

export function deleteOutfits(outfitIds, onSuccess){
	return () => {
		axios.delete(
			OxiAppConstants.serviceURL + '/outfits',
			{
				data:{
					outfitIds,
				}
			}
		)
		.then(response => {
			if(response.status === OxiAppConstants.HttpStatus.OK){
				onSuccess();
			}
			return response.status;			
		})
	}
}

/**Post or Put content debending on the typeof id in contentJson
*
*/
export function uploadContents(contents, outfitId, onSuccess){
	return async (/*picturesByFilename*/picturesByContentId) => {
		
		try{
			var pathVariable = outfitId !== '' ? ('/' + outfitId) : '';
			var requestBatch = [];
	
			// Build list of added contents.
			var addedContents = contents.reduce((accum, content) => ([
				...accum,
				...(typeof content.id == 'number' ? [content] : [])
			]), []);
	
			// Build list of modified contents.
			var modifiedContents = contents.reduce((accum, content) => ([
				...accum,
				...(typeof content.id != 'number' ? [content] : [])
			]), []);
	
			// Helper function for grafting picture json to parent content.
			const mergePictureJson = (contents) => contents.map(content => { 
				// Note: If uploadContents is being called from updateCrop, then the coverpicuri used here as key will be the old coverpicuri (before crop was updated)
				//let picture = picturesByFilename[content.coverpicuri];
				let picture = picturesByContentId[content.id];
				
				return {
					...content,
					picture,
					// nullify id's belonging to newly created contents.  
					...(typeof content.id === 'number' ? {id: null} : null),
					// An updated picture entity is persisted during updateCrop. If that's the case, only update content coverpicuri.
					//...(picture.thumbnailuri === content.coverpicuri ? 
					//	{
					//		picture: {
					//			...picture, 
					//			contentId: undefined 
					//		}
					//	} : 
					//	{
					//		picture: null
					//	}
					//),
					//coverpicuri: picture.id,
				};
			});
	
			// Add promise for posting added contents.
			if(addedContents.length > 0){
				requestBatch = [
					...requestBatch,
					axios.post(
						OxiAppConstants.serviceURL + '/contents' + pathVariable, 
						mergePictureJson(addedContents), 
						{}
					)
				]
			}
	
			// Add promise for putting modified contents.
			if(modifiedContents.length > 0){
				requestBatch = [
					...requestBatch,
					axios.put(
						OxiAppConstants.serviceURL + '/contents' + pathVariable, 
						mergePictureJson(modifiedContents), 
						{}
					),
				]
			}
	
			await Promise.all(requestBatch).then(responses => {
				var failedRequests = [];
	
				//let responses = responses.reduce((accum, response) => {
				for(var response of responses){	
					if(response.status >= 400){
	
					//	return [
					//		...accum, 
					//		response,
					//	];
					//}	
					//else{
						failedRequests = [...failedRequests, {status: response.status, request: response.request}];
					}				
				}
		
				if(failedRequests.length === 0){
					onSuccess(responses, picturesByContentId);			
				}
				else{
					throw new RequestFailedException(failedRequests);
				}
			});
		}
		catch(e){
			console.error(e);
			throw e;
		}
	}
}

export function postContent(contentJson, outfitId, onSuccess){
	return (pictureJson) => {
		let pathVariable = outfitId !== '' ? ('/' + outfitId) : '';
		axios.post(
			OxiAppConstants.serviceURL + '/contents' + pathVariable, 
			[ 
				{
					...((mergePictureJson([contentJson], [pictureJson]))[0])
				}
			], 
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

			axios.put(
				OxiAppConstants.serviceURL + '/content' + pathVariable, 
				Object.assign({}, mergePictureJson([contentJson], [pictureJson])[0]), 
				{})
			.then(response => {
				if(response.status === OxiAppConstants.HttpStatus.OK){
					onSuccess(response);
				}
				return response.status;		
			});	
		}

		else{

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


/*export function postContent(contentJson, outfitId, onSuccess){
	return (pictureJson) => {
		let pathVariable = outfitId !== '' ? ('/' + outfitId) : '';
		axios.post(
			OxiAppConstants.serviceURL + '/contents' + pathVariable, 
			[ Object.assign({}, mergePictureJson([contentJson], [pictureJson])[0]) ], 
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

			axios.put(
				OxiAppConstants.serviceURL + '/content' + pathVariable, 
				Object.assign({}, mergePictureJson([contentJson], [pictureJson])[0]), 
				{})
			.then(response => {
				if(response.status === OxiAppConstants.HttpStatus.OK){
					onSuccess(response);
				}
				return response.status;		
			});	
		}

		else{

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
}*/

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
				finalJson.coverPictureId = picturesJson[0].id;
			}
			//add the picture outfitJson object returned from the server
			finalJson = Object.assign({}, finalJson, {contents: mergePictureJson(finalJson.contents, picturesJson)});
			break;
		case OxiAppConstants.EntityTypes.CONTENT:
			if(outfitJson.contents.length > 1){
				requestTarget = '/contents/' + outfitJson.id;
				//add the picture outfitJson object returned from the server
				finalJson = Object.assign({}, mergePictureJson(outfitJson[contents], picturesJson));
			}else{
				requestTarget = '/content/' + outfitJson.id;
				//add the picture outfitJson object returned from the server
				//finalJson = Object.assign({}, mergePictureJson(outfitJson['contents'][0], picturesJson));
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