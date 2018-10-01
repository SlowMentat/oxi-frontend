import {combineReducers} from 'redux'
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import {
			ADD_PROFILE,
			ADD_OUTFIT,	
			ADD_CONTENT,
			ADD_ITEM,
			ADD_ITEMCONTENT,
			CREATE_ITEM,
			CREATE_ITEMCONTENT,
			CREATE_CONTENT,
			CREATE_OUTFIT,
			DISABLE_BUTTON,
			EDIT_CONTENT_VIEW,
			INVALIDATE_ENTITIES,
			MODIFYITEM,
			MODIFYCONTENT,
			MODIFYOUTFIT,
			MODIFYPROFILE,
			MODIFY_ITEM,
			MODIFY_CONTENT,
			MODIFY_OUTFIT,
			MODIFY_PROFILE,
			PREVIEW_CONTENT,
			REQUEST_ENTITIES, 	
			RECEIVE_ENTITIES,
			REMOVE_ADDED_CONTENT,
			REMOVE_ADDED_ITEM,
			REMOVE_ADDED_OUTFIT,
			REMOVE_PROFILE,
			REMOVE_OUTFIT,
			REMOVE_CONTENT,
			REMOVE_ITEM,
			REMOVE_ITEMCONTENT,
			REPLACE_RETAILER,
			REPLACE_BRAND,
			REQUEST_NAVIGATION,
			SELECT_CONTENT,
			SELECT_WEB_APP_VIEW,
			SELECT_PAGE,
			SELECT_OUTFIT,
			SELECT_ITEM,
			SELECT_NEW_PROFILE,
			SELECT_ADDED_OUTFIT,
			SELECT_ADDED_CONTENT,
			SELECT_NEW_ITEM,
			SET_LP_PROFILE_MENU,	
			SET_VISIBLE_FORM, 	
			SET_XCSRF_TOKEN,
			SHOW_MODAL, 
			SHOW_CONTENT_VIEW,	
			UPDATE_ITEM,
			UPDATE_CONTENT,
		} from '../../Components/Actions/indexActions.js'

//import all reducers here

const iniState = {
	'modal':'HIDDEN',
	'isModalVisible':true,
	'prevRequestUrl':null,
	'prevRequestType':null,
	'otherData':{}
}

const iniTokenState = {
	'sessionId':null,
	'xCsrfToken':null
}

//enter user request api here
const iniContentData = {
	'likes':0,
	'comments':'',
	'coverpicuri':'',
	'items':[],
}

const iniItems = {
	'positionx':0,
	'positiony':0,
	'size':'',
	'type':'',
	'link':''
}

const iniEntitiesState = {
	isFetching: false, 
	didInvalidate : false,
	lastUpdated:0,
	entites:[]
}

const iniButtonState = {
	addOutfit: {
		disabled : false
	}
}

const toggleModal = (state = iniState, action) => {
	switch(action.type){
		case SET_VISIBLE_FORM:
			action.payload.otherData === undefined ? action.payload.otherData = state.otherData : null
			return Object.assign({}, state, action.payload);
		case SHOW_MODAL:
			return Object.assign({}, state, action.payload);
		default:
			return state;
	}
}

const saveToken = (state = iniTokenState, action) => {
	switch(action.type){
		case SET_XCSRF_TOKEN:
			return Object.assign({}, state, action.payload);
		default:
			return state;
	}
}

/*const pageView = (state = {page: home}, action) => {
	switch(action.type){
		case SELECT_PAGE:
			return Object.assign({}, state, action.payload);
		default:
			return state;
	}
}*/

const appView = (state = {"webAppView": "landing"}, action) => {
	switch(action.type){
		case SELECT_WEB_APP_VIEW:
			return Object.assign({}, state, action.payload);
		default:
			return state;
	}
}

const requestedNavigation = (state= {'location':null}, action) => {
	switch(action.type){
		case REQUEST_NAVIGATION:
			return Object.assign({}, state, action.payload);
		default:
			return state;
	}
}

const landingPage = (state = {'profileMenu': false}, action) => {
	switch(action.type){
		case SET_LP_PROFILE_MENU:
			return Object.assign({}, state, action.payload);
		default:
			return state;
	}
}

function outfit(state={}, action){
	switch(action){
		case CREATE_OUTFIT:
			return Object.assign({}, state, );
		default:
			return state;
	}
}
function byId(state = {}, action){
	switch(action.type){
		//action typed performed on "entitiesReducer"
		case `CREATE_${action.typeSpecifier}`:
			//return Object.assign({}, state, {[action.payload.id] : action.payload});
			return Object.assign({}, state, action.payload.entities);
		//action type performed on "addedEntitiesReducer"
		case `ADD_${action.typeSpecifier}`:
			return Object.assign({}, state, {[action.payload.id] : action.payload});

		//action typed performed on "entitiesReducer"
		case `UPDATE_${action.typeSpecifier}`:
			return Object.assign({}, state, {[action.payload.id] : action.payload});
		//action type performed on "addedEntitiesReducer"
		case `MODIFY_${action.typeSpecifier}`:
			return Object.assign({}, state, {[action.payload.entity.id] : action.payload.entity});//(for profile entity) have to include entity key to payload because passing the entity oobject to the action parameter instead of the object fields as individual parameters

		//action typed performed on "entitiesReducer"
		case `REPLACE_${action.typeSpecifier}`:
			return Object.assign({}, state, action.payload.entities);

		case `REMOVE_ADDED_${action.typeSpecifier}`:
			return Object.assign({}, state, {})
		default:
			return state;
	}
}

function allIds(state = [], action){
	switch(action.type){
		//action typed performed on "entitiesReducer"
		case `CREATE_${action.typeSpecifier}`:
			//return [...state, state.reduce((maxId, itemId) => Math.max(maxId, itemId), 0) + 1];
			return [...state, Object.keys(action.payload.entities)];
		//action type performed on "addedEntitiesReducer"
		case `ADD_${action.typeSpecifier}`:
			return [...state, state.reduce((maxId, itemId) => Math.max(maxId, itemId), 0) + 1];

		//action typed performed on "entitiesReducer"
		case `DELETE_${action.typeSpecifier}`:
			return state.splice(action.ids);

		//action typed performed on "entitiesReducer"
		case `UPDATE_${action.typeSpecifier}`:
			return Object.keys(action.payload);
		//action type performed on "addedEntitiesReducer"
		case `MODIFY_${action.typeSpecifier}`:
			return [...state];

		//action typed performed on "entitiesReducer"
		case `REPLACE_${action.typeSpecifier}`://Replace value of allIds key with keys of action.payload
			return Object.keys(action.payload.entities);

		case `REMOVE_ADDED_${action.typeSpecifier}`:
			return [];
		default:
			return state;
	}
}

const entities = maxCount => (state = {selected: false, controlDisabled : false, count : 0, byIds : {}, allIds : []}, action) => {
	let byIdsRef = {};
	let allIdsRef = [];
	//Check if excedes max number of entities.  If so trim data to maxCount.
	if(state.allIds.length > maxCount){
		//console.log("greater than max allowed entities")
		//console.log(state.allIds);
		allIdsRef =  state.allIds.slice(0,maxCount);
		let keys = Object.keys(state.byIds).slice(0, maxCount)
		for(var i = 0, len = keys.length; i < len; i++){
  			byIdsRef[`${keys[i]}`] = state.byIds[`${keys[i]}`];
		}
	}else{
		//console.log("less than max allowed entities");
		////console.log(state.allIds);
		byIdsRef = state.byIds;
		allIdsRef = state.allIds;
	}
	//Handle action
	switch(action.type){
		case `CREATE_${action.typeSpecifier}`:
			let nextCount = state.count + 1;
			//console.log('maxCount' + maxCount);
			//console.log('nextCount' + nextCount);
			if(nextCount > maxCount){
				return state;
			}else{
				let scrubbedAction = {};
				//Insert a new entity id into action payload if none exists
				if(!action.payload.id){
					scrubbedAction = Object.assign({}, action, {
						payload : Object.assign({}, action.payload, {id : allIdsRef.reduce((maxId, currentId) => Math.max(maxId, currentId), 0) + 1})
					});
				}else{
					scrubbedAction = Object.assign({}, action);
				}
				return Object.assign({}, state, {
					byIds : byId(byIdsRef, scrubbedAction),
					allIds : allIds(allIdsRef, scrubbedAction),
					count : nextCount,
					'controlDisabled' : true
				});
			}
		case `UPDATE_${action.typeSpecifier}`: //fix this
			return Object.assign({}, state, {byIds : byId(byIdsRef, action), allIds : allIds(allIdsRef, action), /*count :  state.count++*/});
		case `REPLACE_${action.typeSpecifier}`:
			return Object.assign({}, state, {byIds : byId(byIdsRef, action), allIds : allIds(allIdsRef, action)})
		case `SELECT_${action.typeSpecifier}`:
			return Object.assign({}, state, {"selected": action.payload.id});
		default:
			//console.log("no matching case in entities()")
			return state;
	}
}

const localEntities = maxCount => (state = {selected: false, count : 0, byIds : {}, allIds : []}, action) => {
	let byIdsRef = {};
	let allIdsRef = [];
	//Check if excedes max number of entities.  If so trim data to maxCount.
	if(state.allIds.length > maxCount){
		//console.log("greater than max allowed entities")
		////console.log(state.allIds);
		allIdsRef =  state.allIds.slice(0,maxCount);
		let keys = Object.keys(state.byIds).slice(0, maxCount)
		for(var i = 0, len = keys.length; i < len; i++){
  			byIdsRef[`${keys[i]}`] = state.byIds[`${keys[i]}`];
		}
	}else{
		//console.log("less than max allowed entities");
		////console.log(state.allIds);
		byIdsRef = state.byIds;
		allIdsRef = state.allIds;
	}
	//Handle action
	switch(action.type){
		case `ADD_${action.typeSpecifier}`:
			let nextCount = state.count + 1;
			//console.log('maxCount' + maxCount);
			//console.log('nextCount' + nextCount);
			if(nextCount > maxCount){
				return state;
			}else{
				let scrubbedAction = {};
				//Insert a new entity id into action payload if none exists
				if(!action.payload.id){
					scrubbedAction = Object.assign({}, action, {
						payload : Object.assign({}, action.payload, {id : allIdsRef.reduce((maxId, currentId) => Math.max(maxId, currentId), 0) + 1})
					});
				}else{
					scrubbedAction = Object.assign({}, action);
				}
				return Object.assign({}, state, {
					byIds : byId(byIdsRef, scrubbedAction),
					allIds : allIds(allIdsRef, scrubbedAction),
					count : nextCount
				});
			}
		case `MODIFY_${action.typeSpecifier}`: //fix this
			return Object.assign({}, state, {
				byIds : byId(byIdsRef, action), 
				allIds : allIds(allIdsRef, action), 
				/*count :  state.count++*/
			});
		case `REMOVE_ADDED_${action.typeSpecifier}`:
			//decrement profile coutner
			return Object.assign({}, state, {
				byIds : byId(byIdsRef[action.id], action), 
				allIds : allIds(allIdsRef, action),
				count : (state.count - 1)
			});
		case `SELECT_ADDED_${action.typeSpecifier}`:
			return Object.assign({}, state, {"selected": action.payload.id});
		default:
			//console.log("no matching case in localEntities()")
			return state;
	}
}

//This reducer factory returns a wrapper function that invokes 'reducerFunction' 
//only when the value of the action object's "targetEntity' key equals "reducerName"
function entityReducerFactory(reducerFunction, reducerName){
	return (state = {selected: false, controlDisabled :  false, count: 0, byIds : {}, allIds : []}, action) => {
		const {typeSpecifier} =  action;
		const isInitializationCall = state === undefined;
		if(typeSpecifier !== reducerName && !isInitializationCall) return state;
		return reducerFunction(state, action);
	}
}

function contentViewState(state = {'shownContentId' : null, 'isEditingContent' : false}, action){
	switch(action.type){
		case PREVIEW_CONTENT:
			return Object.assign({}, state, action.payload);
		case EDIT_CONTENT_VIEW:
			return Object.assign({}, state, action.payload);
		default:
			return state;
	}
}

/*function editableContentView(state = {'isEditingContent' : false}, action){
	switch(action.type){
		case EDIT_CONTENT_VIEW:
			return Object.assign({}, state, action.payload);
		default:
			return state;
	}
}*/

/*const contentViewState = (state = {isEditingContent: false, isContentViewVisible : true}, action) => {
	switch(action.type){
		case EDIT_CONTENT_VIEW:
			return Object.assign({}, state, action.payload)
		case SHOW_CONTENT_VIEW:
			return {isContentViewVisible : action.payload}
		default:
			return state;
	}
}*/

//maybe find better naming
function entitiesModified(state = {isFetching:false, didInvalidate:false, entities:[]}, action){
	switch(action.type){
		case INVALIDATE_ENTITIES:
			return Object.assign({}, state, {didInvalidate: true});
		case REQUEST_ENTITIES:
			return Object.assign({}, state, {isFetching:true ,didInvalidate: false})
		case RECEIVE_ENTITIES:
			return Object.assign({}, state, {isFetching:false ,didInvalidate: false, lastUpdated: action.recivedAt})
		default:
			return state;
	}
}

function entitiesState(state = {}, action){
	switch(action.type){
		case INVALIDATE_ENTITIES:
		case RECEIVE_ENTITIES:
		case REQUEST_ENTITIES:
			return Object.assign({}, state, {[action.payload.entityType]: entitiesModified([action.payload], action)});
		default:
			return state;
	}
}

function buttonState(state = iniButtonState, action){
	switch(action.type){
		case DISABLE_BUTTON:
			return Object.assign({}, state, {'addOutfit': action.payload});
		default:
			return state;
	}
}

export const maxOutfitViewCount = 8;
export const maxContentViewCount = 6;
export const maxItemViewCount = 9;
export const maxProfileCount = 1;
export const maxOutfitCount = maxOutfitViewCount * 3;
export const maxContentCount = maxContentViewCount * maxOutfitCount;
export const maxItemCount = maxItemViewCount * maxContentCount;
export const maxItemContentCount = maxContentCount * maxItemCount;

const entitiesReducer = combineReducers({
	profile : entityReducerFactory(entities(maxProfileCount), OxiAppConstants.EntityTypes.PROFILE),
	items : entityReducerFactory(entities(maxItemCount), OxiAppConstants.EntityTypes.ITEM),//itemsReducer,
	contents : entityReducerFactory(entities(maxContentCount), OxiAppConstants.EntityTypes.CONTENT),
	itemContent : entityReducerFactory(entities(maxItemContentCount), OxiAppConstants.EntityTypes.ITEM_CONTENT),
	outfits : entityReducerFactory(entities(maxOutfitCount), OxiAppConstants.EntityTypes.OUTFIT),
	brands : entityReducerFactory(entities(1000), OxiAppConstants.EntityTypes.BRAND),
	retailers : entityReducerFactory(entities(1000), OxiAppConstants.EntityTypes.RETAILER),
	entitiesState
});

const addedEntitiesReducer = combineReducers({
	profile : entityReducerFactory(localEntities(maxProfileCount), OxiAppConstants.EntityTypes.PROFILE),
	items : entityReducerFactory(localEntities(maxItemCount), OxiAppConstants.EntityTypes.ITEM),
	contents : entityReducerFactory(localEntities(maxContentCount), OxiAppConstants.EntityTypes.CONTENT),
	itemContent : entityReducerFactory(localEntities(maxItemContentCount), OxiAppConstants.EntityTypes.ITEM_CONTENT),
	outfits : entityReducerFactory(localEntities(maxOutfitCount), OxiAppConstants.EntityTypes.OUTFIT)
})


const _OxiApp = combineReducers({
	//add reducers for combining here
	buttonState,
	appView,
	landingPage,
	toggleModal,
	saveToken,
	contentViewState,
	requestedNavigation,
	entitiesReducer,
	addedEntitiesReducer
	//editableContentView
})

export default _OxiApp