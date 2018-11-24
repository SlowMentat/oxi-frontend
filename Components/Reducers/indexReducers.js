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
			DISABLE_CONTENT_BUTTON,
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
			UPDATE_CONTENT
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
	clientInvalidated : false,
	serverInvalidated : false,
	lastUpdated:0,
	entites:[]
}

const iniButtonState = {
	addOutfit: {
		disabled : false
	},
	addContent: {
		disabled :  false
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
			return Object.assign({}, state, {[action.payload.entity.id]: action.payload.entity});

		//action typed performed on "entitiesReducer"
		/*case `UPDATE_${action.typeSpecifier}`:
			return state;//Object.assign({}, state, {[action.payload.id] : action.payload});*/
		//action type performed on "addedEntitiesReducer"
		case `MODIFY_${action.typeSpecifier}`:
			return Object.assign({}, state, {[action.payload.entity.id] : Object.assign({}, state[action.payload.entity.id], action.payload.entity)});//(for profile entity) have to include entity key to payload because passing the entity oobject to the action parameter instead of the object fields as individual parameters

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
			let filteredIds = Object.keys(action.payload.entities).filter(entitiesId => {
				for(let id of state){
					//filter out entity Ids that already exist in allIdsRef
					if(id === entitiesId) return false;
				}
				return true;
			});
			//batch comment//console.log('allIds: filteredIds = ', filteredIds);
			return [...state, ...filteredIds];
		//action type performed on "addedEntitiesReducer"
		case `ADD_${action.typeSpecifier}`:
			return [...state, action.payload.entity.id];
			//return [...state, state.reduce((maxId, itemId) => Math.max(maxId, itemId), 0) + 1];

		//action typed performed on "entitiesReducer"
		case `DELETE_${action.typeSpecifier}`:
			return state.splice(action.ids);

		//action typed performed on "entitiesReducer"
		/*case `UPDATE_${action.typeSpecifier}`:
			return Object.keys(action.payload);*/
		//action type performed on "addedEntitiesReducer"
		case `MODIFY_${action.typeSpecifier}`:
			return [...state];
		//action typed performed on "entitiesReducer"
		case `REPLACE_${action.typeSpecifier}`:
			let replacementIds = Object.keys(action.payload.entities);
			let ind = 0;
			for(let id of replacementIds){
				if(state.includes(id)){
					replacementIds.splice(ind, 1);
				}
				ind++;
			}
			return [...state, ...replacementIds];

		case `REMOVE_ADDED_${action.typeSpecifier}`:
			return [];
		default:
			return state;
	}
}

const entities = maxCount => (state = {selected: false, controlDisabled : false, count : 0, byIds : {}, allIds : [], allEditingIds: []}, action) => {
	let byIdsRef = {};
	let allIdsRef = [];
	//Check if excedes max number of entities.  If so trim data to maxCount.
	if(state.allIds.length > maxCount){
		////batch comment//console.log("greater than max allowed entities")
		////batch comment//console.log(state.allIds);
		allIdsRef =  state.allIds.slice(0,maxCount);
		let keys = Object.keys(state.byIds).slice(0, maxCount)
		for(var i = 0, len = keys.length; i < len; i++){
  			byIdsRef[`${keys[i]}`] = state.byIds[`${keys[i]}`];
		}
	}else{
		////batch comment//console.log("less than max allowed entities");
		//////batch comment//console.log(state.allIds);
		byIdsRef = state.byIds;
		allIdsRef = state.allIds;
	}
	//Handle action
	switch(action.type){
		case `CREATE_${action.typeSpecifier}`:
			let nextCount = state.count + 1;
			////batch comment//console.log('maxCount' + maxCount);
			////batch comment//console.log('nextCount' + nextCount);
			if(nextCount > maxCount){
				return state;
			}else{
				let scrubbedAction = {};
				//Insert a new entity id into action payload if none exists
				////batch comment//console.log('action.payload = ', action.payload);
				if(false/*action.payload.entities.id === null || action.payload.entities.id === undefined || action.payload.entities.id === ''*/){//Note:  ... === undefined screws things up since action.payload = {[id] : {id:...}}, but this isn't needed anyway beacuse all client side created entities will be stored int he addedEntitiesReduceer.
					let incrementedId = allIdsRef.reduce((maxId, currentId) => Math.max(maxId, currentId), 0) + 1;
					/*scrubbedAction = Object.assign({}, action, {
						payload : Object.assign({}, action.payload, {id : incrementedId})
					});*/					
					scrubbedAction = Object.assign({}, action, {
						payload : {
							...action.payload,
							entities: {
								id: incrementedId
							} 
						}
					});
				}else{
					scrubbedAction = Object.assign({}, action);
				}
				//batch comment//console.log('entities: scrubbedAction = ', scrubbedAction);
				return Object.assign({}, state, {
					byIds : byId(byIdsRef, scrubbedAction),
					allIds : allIds(allIdsRef, scrubbedAction),
					count : nextCount,
					'controlDisabled' : true,
					'allEditingIds':[]
				});
			}
		case `ADD_TO_${action.typeSpecifier}_EDITTING_IDS`:
			return Object.assign({}, state, {allEditingIds: [...state.allEditingIds, action.payload.id]});

		case `REPLACE_${action.typeSpecifier}_EDITTING_IDS`:
			return Object.assign({}, state, {allEditingIds: [...action.payload.ids]});

		case `CLEAR_${action.typeSpecifier}_EDITTING_IDS`:
			return Object.assign({}, state, {allEditingIds: []});

		case `REPLACE_${action.typeSpecifier}`:
			return Object.assign({}, state, {byIds : byId(byIdsRef, action), allIds : allIds(allIdsRef, action)})
		/*case `SELECT_${action.typeSpecifier}`:
			return Object.assign({}, state, {"selected": action.payload.id});*/
		default:
			////batch comment//console.log("no matching case in entities()")
			return state;
	}
}

function removeInvalidation(state, action){
	let clientInvData = state.clientInvalidated.filter(id => {
		for(let payloadId of action.payload.ids){
			if(id == payloadId) return true;
		}
		return false;
	});
	return Object.assign({}, state, {clientInvalidated: []});
}

//return ids that aren't already present in the invalidation state
function filterInvalidated(state=[], action){
	let duplicatesFiltered = [];
	if(action.payload.ids instanceof Array){
		for(let id of action.payload.ids){
			if(state.includes(id)){
				break;
			}
			duplicatesFiltered = [...duplicatesFiltered, id];
		}
	}
	//Handle the case where action.payload.ids is not an itereable
	else{
		if(!state.includes(action.payload.ids)) duplicatesFiltered = [...state, action.payload.ids];
	}

	return duplicatesFiltered;
}

const entitiesState = (state = {isFetching: false, serverInvalidated: [], clientInvalidated: [], receivedAt: null, selected: false}, action) => {
	switch(action.type){
		case `RECEIVE_${action.typeSpecifier}`:
			return Object.assign({}, state, {receivedAt: action.payload, isFetching: !state.isFetching, 'serverInvalidated': !state.serverInvalidated});
		case `REQUEST_${action.typeSpecifier}`:
			return Object.assign({}, state, action.payload);

		case `SERVER_INVALIDATE_${action.typeSpecifier}`:
			let serverInvData = filterInvalidated(state.serverInvalidated, action);
			return Object.assign({}, state, {serverInvalidated: [...state.serverInvalidated, ...serverInvData]});

		case `CLEAR_SERVER_INVALIDATION_${action.typeSpecifier}`:
			return Object.assign({}, state, {clientInvalidated: []});

		case `REMOVE_SERVER_INVALIDATION_${action.typeSpecifier}`:
			return removeInvalidation(state, action);

		case `CLIENT_INVALIDATE_${action.typeSpecifier}`:
			let clientInvData = filterInvalidated(state.clientInvalidated, action);
			return Object.assign({}, state, {clientInvalidated: [...state.clientInvalidated, ...clientInvData]});

		case `CLEAR_CLIENT_INVALIDATION_${action.typeSpecifier}`:
			return Object.assign({}, state, {clientInvalidated: []});

		case `REMOVE_CLIENT_INVALIDATION_${action.typeSpecifier}`:
			return removeInvalidation(state, action);

		case `SELECT_${action.typeSpecifier}`:
			//batch comment//console.log('entitiesState reducer: action = ', action)
			return Object.assign({}, state, action.payload);
		default:
			////batch comment//console.log("no matching case in entities()")
			return state;
	}
}

const localEntities = maxCount => (state = {selected: false, count : 0, byIds : {}, allIds : []}, action) => {
	let byIdsRef = {};
	let allIdsRef = [];
	//Check if excedes max number of entities.  If so trim data to maxCount.
	if(state.allIds.length > maxCount){
		////batch comment//console.log("greater than max allowed entities")
		//////batch comment//console.log(state.allIds);
		allIdsRef =  state.allIds.slice(0,maxCount);
		let keys = Object.keys(state.byIds).slice(0, maxCount)
		for(var i = 0, len = keys.length; i < len; i++){
  			byIdsRef[`${keys[i]}`] = state.byIds[`${keys[i]}`];
		}
	}else{
		////batch comment//console.log("less than max allowed entities");
		//////batch comment//console.log(state.allIds);
		byIdsRef = state.byIds;
		allIdsRef = state.allIds;
	}
	//Handle action
	//batch comment//console.log('localEntities:  action = ', action);
	//batch comment//console.log('localEntities:  state = ', state);
	switch(action.type){
		case `ADD_${action.typeSpecifier}`:
			//batch comment//console.log('localEntities:  switch case ADD_');
			let nextCount = state.count + 1;
			////batch comment//console.log('maxCount' + maxCount);
			////batch comment//console.log('nextCount' + nextCount);
			if(nextCount > maxCount){
				return state;
			}else{
				let scrubbedAction = {};
				//Insert a new entity id into action payload if none exists
				if(action.payload.entity.id === null){
					scrubbedAction = Object.assign({}, action, {
						...action,
						payload : {
							entity: {
								...action.payload.entity,
								id : allIdsRef.reduce((maxId, currentId) => {
									if(typeof currentId === 'number'){
										return (Math.max(maxId, currentId));
									}
									return maxId;
								}, 0) + 1
							}
						}
					});
					//batch comment//console.log('scrubbedAction = ', scrubbedAction);
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
			//batch comment//console.log('localEntities:  switch case MODIFY_');
			return Object.assign({}, state, {
				byIds : byId(byIdsRef, action), 
				allIds : allIds(allIdsRef, action), 
				/*count :  state.count++*/
			});
		case `REMOVE_ADDED_${action.typeSpecifier}`:
			//batch comment//console.log('localEntities:  switch case REMOVE_');
			//decrement profile coutner
			return Object.assign({}, state, {
				byIds : byId(byIdsRef[action.id], action), 
				allIds : allIds(allIdsRef, action),
				count : (state.count - 1)
			});
		/*case `SELECT_ADDED_${action.typeSpecifier}`:
			return Object.assign({}, state, {"selected": action.payload.id});*/
		//TODO implement this... case `REMOVE_MULTIPLE_ADDED_${action.typeSpecifier}`:

		case `REMOVE_ALL_ADDED_${action.typeSpecifier}`:
			return Object.assign({}, state, {byIds:{}, allIds:[], count: 0});
		default:
			//batch comment//console.log('localEntities:  switch case default');
			//batch comment//console.log('localEntities: state = ', state);
			////batch comment//console.log("no matching case in localEntities()")
			return state;
	}
}

//This reducer factory returns a wrapper function that invokes 'reducerFunction' 
//only when the value of the action object's "targetEntity' key equals "reducerName"
function entityReducerFactory(reducerFunction, reducerName, defualtStoreState){
	return (state = defualtStoreState, action) => {
		const {typeSpecifier} =  action;
		const isInitializationCall = state === undefined;
		if(typeSpecifier !== reducerName && !isInitializationCall) return state;
		return reducerFunction(state, action);
	}
}

function contentViewState(state = {'shownContentId' : null, 'viewState' : OxiAppConstants.viewState.PREVIEW}, action){
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
function entitiesModified(state = {isFetching:false, serverInvalidated: false, clientInvalidated: false, entities:[]}, action){
	switch(action.type){
		case SERVER_INVALIDATE_ENTITIES:
			return Object.assign({}, state, {serverInvalidated: true});
		case CLIENT_INVALIDATE_ENTITIES:
			return Object.assign({}, state, {clientInvalidated: true});
		case REQUEST_ENTITIES:
			return Object.assign({}, state, {isFetching:true , serverInvalidated: false, clientInvalidated: false})
		case RECEIVE_ENTITIES:
			return Object.assign({}, state, {isFetching:false , serverInvalidated: false, clientInvalidated: false, lastUpdated: action.recivedAt})
		default:
			return state;
	}
}

/*function entitiesState(state = {}, action){
	switch(action.type){
		case INVALIDATE_ENTITIES:
		case RECEIVE_ENTITIES:
		case REQUEST_ENTITIES:
			return Object.assign({}, state, {[action.payload.entityType]: entitiesModified([action.payload], action)});
		default:
			return state;
	}
}*/

function buttonState(state = iniButtonState, action){
	switch(action.type){
		case DISABLE_BUTTON:
			return Object.assign({}, state, {'addOutfit': action.payload});
		case DISABLE_CONTENT_BUTTON:
			return Object.assign({}, state, {'addContent' : action.payload});
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
export const maxPictureCount = maxContentCount;
export const maxItemCount = maxItemViewCount * maxContentCount;
export const maxItemContentCount = maxContentCount * maxItemCount;

let defualtStoreState = {selected: false, controlDisabled :  false, count: 0, byIds : {}, allIds : [], allEditingIds: []};

const entitiesReducer = combineReducers({
	profile : entityReducerFactory(entities(maxProfileCount), OxiAppConstants.EntityTypes.PROFILE, defualtStoreState),
	items : entityReducerFactory(entities(maxItemCount), OxiAppConstants.EntityTypes.ITEM, defualtStoreState),//itemsReducer,
	contents : entityReducerFactory(entities(maxContentCount), OxiAppConstants.EntityTypes.CONTENT, defualtStoreState),
	pictures : entityReducerFactory(entities(maxPictureCount), OxiAppConstants.EntityTypes.PICTURE, defualtStoreState),
	itemContent : entityReducerFactory(entities(maxItemContentCount), OxiAppConstants.EntityTypes.ITEM_CONTENT, defualtStoreState),
	outfits : entityReducerFactory(entities(maxOutfitCount), OxiAppConstants.EntityTypes.OUTFIT, defualtStoreState),
	brands : entityReducerFactory(entities(1000), OxiAppConstants.EntityTypes.BRAND, defualtStoreState),
	retailers : entityReducerFactory(entities(1000), OxiAppConstants.EntityTypes.RETAILER, defualtStoreState)
});

const addedEntitiesReducer = combineReducers({
	profile : entityReducerFactory(localEntities(maxProfileCount), OxiAppConstants.EntityTypes.PROFILE, defualtStoreState),
	items : entityReducerFactory(localEntities(maxItemViewCount), OxiAppConstants.EntityTypes.ITEM, defualtStoreState),
	contents : entityReducerFactory(localEntities(maxContentViewCount), OxiAppConstants.EntityTypes.CONTENT, defualtStoreState),
	itemContent : entityReducerFactory(localEntities(maxItemContentCount), OxiAppConstants.EntityTypes.ITEM_CONTENT, defualtStoreState),
	outfits : entityReducerFactory(localEntities(maxOutfitCount), OxiAppConstants.EntityTypes.OUTFIT, defualtStoreState)
})

defualtStoreState = {isFetching:false, serverInvalidated: [], clientInvalidated: [], receivedAt: null, selected: false}

const entitiesStateReducer = combineReducers({
	profile : entityReducerFactory(entitiesState, OxiAppConstants.EntityTypes.PROFILE, defualtStoreState),
	items : entityReducerFactory(entitiesState, OxiAppConstants.EntityTypes.ITEM, defualtStoreState),
	pictures : entityReducerFactory(entitiesState, OxiAppConstants.EntityTypes.PICTURE, defualtStoreState),
	contents : entityReducerFactory(entitiesState, OxiAppConstants.EntityTypes.CONTENT, defualtStoreState),
	outfits : entityReducerFactory(entitiesState, OxiAppConstants.EntityTypes.OUTFIT, defualtStoreState)
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
	entitiesStateReducer,
	//entitiesState,
	addedEntitiesReducer,
	entitiesReducer
	//editableContentView
})

export default _OxiApp