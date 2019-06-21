import {combineReducers} from 'redux'
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import {
			ADD_PROFILE,
			ADD_OUTFIT,	
			ADD_CONTENT,
			ADD_CONTENTS,
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
			UPDATE_CONTENT,
			SET_BROWSER_SELECTION,
			SET_POSITION_HELP,
			SET_POSITION_FILTER,
			SET_VISIBLE_HELP,
			SET_VISIBLE_FILTER,
			UPDATE_OUTFIT_COVERPICURI,
			SET_LP_CREATE_ACCOUNT_VIEW,
			RECEIVED_EXISTING_ITEMS_SEARCH,
			RECEIVED_RETAILER_NAMES_SEARCH,
			RECEIVED_UDR_NAMES_SEARCH,
			RECEIVED_UDS_LABELS_SEARCH,
			RECEIVED_ALL_APPAREL_TYPES,
			CREATE_APPAREL_TYPE,
			REPLACE_APPAREL_TYPE
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

const iniSearchState = {
	addItemContext: {
		retailerItemResults:[],
		retailerNameResults:[],
		sizeRsults:[],
		userDefinedRetailerResults:[],
		udrNameResults:[],
		udsLabelResults:[],
		sizeLabelResults:[],
		allApparelTypes:[]
	},
	browseOutfitsContext: {

	},
	borwseItemsContext:{

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


const browseState = (state = {'browseSelection' : 'outfits'}, action) => {
	switch(action.type){
		case SET_BROWSER_SELECTION:
			return Object.assign({}, state, action.payload);
		default:
			return state;
	}
}

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

const landingPage = (state = {'profileMenu': false, 'createAccountView': 'none'}, action) => {
	switch(action.type){
		case SET_LP_PROFILE_MENU:
			return Object.assign({}, state, action.payload);
		case SET_LP_CREATE_ACCOUNT_VIEW:
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

		case `ADD_${action.typeSpecifier}S`:
			console.log('byId: action = ', action)
			return Object.assign({}, state, action.payload.entities)

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

		case `REMOVE_MULTIPLE_ADDED_${action.typeSpecifier}`:
			let result = Object.assign({}, state);
			//build maskObject
			if(action.payload.ids.length > 0){
				for(let id of action.payload.ids){
					delete result[id];
				}
			}
			return result;

		case `MODIFY_${action.typeSpecifier}_PROPERITIES`:
			let modifiedObjects = {};
			for(let targetObjectId of Object.keys(action.payload.modifiedProperties)){
				modifiedObjects = Object.assign({}, state, {
					[targetObjectId]: {
						...state[targetObjectId],
						...action.payload.modifiedProperties[targetObjectId]
					}
				});
			}
			console.log(`MODIFY_${action.typeSpecifier}_PROPERITIES:  targetObjectId = `, modifiedObjects);
			return modifiedObjects;

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
			if (action.type === 'CREATE_ITEMCONTENT'){
				console.log('itemcontents state = ', state);
				console.log('itemcontents new state =', [...state, ...filteredIds]);
			}
			return [...state, ...filteredIds];
		//action type performed on "addedEntitiesReducer"
		case `ADD_${action.typeSpecifier}`:
			return [...state, action.payload.entity.id];
			//return [...state, state.reduce((maxId, itemId) => Math.max(maxId, itemId), 0) + 1];

		case `ADD_${action.typeSpecifier}S`:
			console.log('allId: action = ', action)
			let ids = [];
			for(let entity of Object.values(action.payload.entities)) {
				ids = [...ids, entity.id];
			}
			return [...state, ...ids] //since keys are 

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

		case `REMOVE_MULTIPLE_ADDED_${action.typeSpecifier}`:
			let idsToRemove = action.payload.ids;
			return state.filter(stateId => {
				for(let id of idsToRemove){
					if (stateId === id){
						return false;
					}
				}
				return true;
			});

		default:
			return state;
	}
}

const entities = (maxCount) => (state = {selected: false, controlDisabled : false, count : 0, byIds : {}, allIds : [], allEditingIds: []}, action) => {
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
	console.log('action.type = ', action.type);
	switch(action.type){
		case `CREATE_${action.typeSpecifier}`:
			let nextCount = action.typeSpecifier === 'ITEMCONTENT' ? state.count = Object.keys(action.payload.entities).length : state.count + 1;
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

		case `REMOVE_ALL_${action.typeSpecifier}`:
			return Object.assign({}, state, {byIds:{}, allIds:[], count: 0});
		/*case `SELECT_${action.typeSpecifier}`:
			return Object.assign({}, state, {"selected": action.payload.id});*/

		case `MODIFY_PAGED_${action.typeSpecifier}`:
			let pageNumbers = Object.keys(state.pages);
			let currentPage = parseInt(Object.keys(action.payload)[0], 10);
			let pageCount = parseInt(pageNumbers.length, 10);
			let headPageNumber = parseInt(pageNumbers[0], 10);
			let tailPageNumber = parseInt(pageNumbers[pageCount-1], 10);
			console.log('pageCount = ', pageCount);
			console.log('pageBufferSize = ', OxiAppConstants.scrollBufferSize);
			console.log('currentPage = ', currentPage);
			if(pageCount >= OxiAppConstants.scrollBufferSize){
				let subsetPages = {}
				let a
				let allIdsFiltered = [];
				console.log('headPageNumber = ', headPageNumber);
				console.log('tailPageNumber = ', tailPageNumber);
				console.log('typeof curentPage', (typeof currentPage));
				console.log('typeof tailPageNumber = ', (typeof tailPageNumber));
				console.log('currentPage == \'(tailPageNumber + 1)\' : ', (currentPage == `${(tailPageNumber + 1)}`))
				//let {[headPageNumber]:a, ...subsetPages}
				switch(true){
					//Paging up
					case (currentPage == (headPageNumber - 1)): 
					//use object deconstruction to remove deleted page from entitiesReducer.items store
						const {[`${tailPageNumber}`]:removedIds_A, ...subsetPagesA} = Object.assign({}, state.pages);
						console.log('removedIds_A = ', removedIds_A)
						allIdsFiltered = state.allIds.filter(id => !removedIds_A.includes(id));
						//To preserve previous order of objects in byIds, we need to preemptively set the keys of the expected json payload in the desired order here.
						let expectedEntities = action.payload[0].reduce((obj, key) => ({ ...obj, [key]: {} }), {});
						return Object.assign({}, state, {
							'byIds': {
								...expectedEntities, 
								...allIdsFiltered.reduce((obj, key) => ({ ...obj, [key]: state.byIds[key] }), {})
							},
							'allIds': allIdsFiltered,
							'pages': { 
								...action.payload, 
								...subsetPagesA
							} 
						} );	
					//Paging down
					case (currentPage == (tailPageNumber + 1) ):
						const {[`${headPageNumber}`]:removedIds_B, ...subsetPagesB} = Object.assign({}, state.pages);
						allIdsFiltered = state.allIds.filter(id => !removedIds_B.includes(id));
						return Object.assign({}, state, {
							'byIds': allIdsFiltered.reduce((obj, key) => ({ ...obj, [key]: state.byIds[key] }), {}),
							'allIds': allIdsFiltered,
							'pages': {
								...subsetPagesB,
								...action.payload
							} 
						} );

					default:
						// do nada
						console.log('doing nothing')
						return state
				}
			}else{
				console.log('mark')
				//In this case the buffer isn't full and the start of the buffer is at page 0.  So we can assume that this is a page-down action
				return Object.assign({}, state, {
					'pages': {
						...state.pages, 
						...action.payload
					}
				} );
			}

		case UPDATE_OUTFIT_COVERPICURI:
			console.log('shalom')
			return Object.assign({}, state, {
				'byIds':{
					...state.byIds,
					[action.payload.entity.id]: {
						...state.byIds[action.payload.entity.id],
						coverpicuri: action.payload.entity.coverpicuri
					}
				}
			});

		case `MODIFY_${action.typeSpecifier}_PROPERITIES`:
			/*let modifiedEntities = {};
			for(let modification of action.payload.modifiedProperties){
				if(state.byIds[modification.targetEntityId]){
					modifiedEntities[targetEntityId] = Object.assign({}, ...state.byIds[targetEntityId], ...action.payload.modifiedProperties);
				}
			}*/
			return Object.assign( {}, state, {byIds: byId(byIdsRef, action)} );

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

function removeDeletion(state, action){
	let clientDelData = state.clientDeleted.filter(id => {
		for(let payloadId of action.payload.ids){
			if(id === payloadId) return true;
		}
		return false;
	});
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

const entitiesState =  (state = {isFetching: false, serverInvalidated: [], clientInvalidated: [], receivedAt: null, selected: false, multipleSelected: []}, action) => {
	let pageNumbers = null;
	let length = null;

	switch(action.type){
		case `RECEIVE_${action.typeSpecifier}`:
			return Object.assign({}, state, {receivedAt: action.payload.receivedAt, isFetching: false, 'error': action.payload.error});

		case `REQUEST_${action.typeSpecifier}`:
			return Object.assign({}, state, {isFetching: true, 'error': false});

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

		case `CLEAR_CLIENT_INVALIDATE_${action.typeSpecifier}`:
			return Object.assign({}, state, {clientInvalidated: []});

		case `REMOVE_CLIENT_INVALIDATE_${action.typeSpecifier}`:
			return removeInvalidation(state, action);

		case `CLIENT_DELETE_${action.typeSpecifier}`:
			let clientDeletedData = filterInvalidated(state.clientDeleted, action);
			return Object.assign({}, state, {clientDeleted: [...state.clientDeleted, ...clientDeletedData]});

		case `CLEAR_CLIENT_DELETE_${action.typeSpecifier}`:
			return Object.assign({}, state, {clientDeleted: []});

		case `REMOVE_CLIENT_DELETE_${action.typeSpecifier}`:
			return removeDeletion(state, action);

		case `SELECT_${action.typeSpecifier}`:
			//batch comment//console.log('entitiesState reducer: action = ', action)
			return Object.assign({}, state, {...action.payload, multipleSelected: (action.payload.selected ? [action.payload.selected] : []) });

		case `SELECT_MUL_${action.typeSpecifier}`:
			return Object.assign({}, state, {
				multipleSelected: [...state.multipleSelected.filter(id => id !== action.payload.selected), action.payload.selected]
			});

		case `DESELECT_MUL_${action.typeSpecifier}`:
			return state.multipleSelected.length > 1 ? 
				Object.assign({}, state, {
					multipleSelected: state.multipleSelected.filter(id => id !== action.payload.selected)
				}) :
				Object.assign({}, state, {
					multipleSelected: state.multipleSelected.filter(id => id !== action.payload.selected),
					seleted: false
				});

		case `CLEAR_SELECT_MUL_${action.typeSpecifier}`:
			return Object.assign({}, state, {
				multipleSelected: []
			});

		case `SET_CURRENT_${action.typeSpecifier}_PAGE`:
			return Object.assign({}, state, action.payload);

		case `SET_LAST_PAGE_${action.typeSpecifier}`:
			return Object.assign({}, state, action.payload);

		case `SET_PAGE_BUFFER_SIZE_${action.typeSpecifier}`:
			return Object.assign({}, state, action.payload);

		case `SET_NEXT_${action.typeSpecifier}_PAGE_URL`:
			return Object.assign({}, state, action.payload);

		case `SET_PREV_${action.typeSpecifier}_PAGE_URL`:
			return Object.assign({}, state, action.payload);

		case `SET_${action.typeSpecifier}_SCROLL_PAGE_HEIGHT`:
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
	let nextCount = state.count + 1;
	switch(action.type){
		case `ADD_${action.typeSpecifier}`:
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
								//Increment the greatest id of all added entities by 1 and assign to this payload entity
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

		case `ADD_${action.typeSpecifier}S`:
			//let nextCount = state.count + 1;
			let currentCount = state.count;
			if(currentCount + 1 > maxCount){
				return state;
			}else{
				let scrubbedAction = {payload:{entities:{}}};
				let newEntityCount = 1;
				let addedEntityCount = Object.keys(action.payload.entities).length;
				let scrubbedActionEntityIds = [];
				//find the max id
				let originalMaxId = allIdsRef.reduce((maxId, currentId) => {
					if(typeof currentId === 'number'){
						return (Math.max(maxId, currentId));
					}
					return maxId;
				}, 0);
				console.log('max content count = ', maxCount);
				//perform scrubbing operations on all entities first
				for(let entity of action.payload.entities){
					currentCount = state.count + newEntityCount;
					if(state.count + newEntityCount <= maxCount){
						//if entity is new
						if(entity.id === null){
							let nextId = originalMaxId + newEntityCount;
							scrubbedAction = Object.assign({}, action, {
								...action,
								payload : {
									entities: {
										...scrubbedAction.payload.entities,
										//key is passed as null value, so access must be done using index
										[nextId] : Object.assign(entity, {id: nextId})//action.payload.entities[newEntityCount]
									}
								}
							});
							newEntityCount++;
							//batch comment//console.log('scrubbedAction = ', scrubbedAction);
						}else{
							//Note:  Ass
							throw error('Cannot batch add multiple persisted entities (indicated by having id property with UUID value) to the addedEntitiesReducer store.  Instead add each entity individual');
							//scrubbedAction = Object.assign({}, action, {
							//	...action,
							//	payload : {
							//		entities:{
							//			...scrubbedAction.payload.entities,
							//			[entity.id]: entity
							//		}
							//	}
							//});
						}
					}
				}
				return Object.assign({}, state, {
					byIds : byId(byIdsRef, scrubbedAction),
					allIds : allIds(allIdsRef, scrubbedAction),
					count : currentCount
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

		case `REMOVE_MULTIPLE_ADDED_${action.typeSpecifier}`:
			return Object.assign({}, state, {
				byIds: byId(byIdsRef, action),
				allIds: allIds(allIdsRef, action),
				count: (state.count - action.payload.ids.length)
			})

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

function searchState(state = iniSearchState, action){
	switch(action.type){
		case RECEIVED_EXISTING_ITEMS_SEARCH:
			return Object.assign({}, state, {'addItemContext': {
				...state.addItemContext,
				...action.payload
			}})
		case RECEIVED_RETAILER_NAMES_SEARCH:
			return Object.assign({}, state, {'addItemContext': {
				...state.addItemContext,
				...action.payload
			}})	
		case RECEIVED_UDR_NAMES_SEARCH:
			return Object.assign({}, state, {'addItemContext': {
				...state.addItemContext,
				...action.payload
			}})	
		case RECEIVED_UDS_LABELS_SEARCH:
			return Object.assign({}, state, {'addItemContext': {
				...state.addItemContext,
				...action.payload
			}})
		case RECEIVED_ALL_APPAREL_TYPES:
			return Object.assign({}, state, {'addItemContext': {
				...state.addItemContext,
				...action.payload
			}})		
		default:
			return state;
	}
}

const popupMenus = (state = {}, action) => {
	switch(action.type){
		case `SET_VISIBLE_${action.typeSpecifier}`:
			return Object.assign({}, state, {...action.payload});
		case `SET_POSITION_${action.typeSpecifier}`:
			return Object.assign({}, state, {...action.payload});
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

/*export const maxOutfitPageBufferSize = 2;
export const maxContentPageBufferSize = 2;
export const maxItemPageBufferSize = 2;
export const maxPicturePageBufferSize = 2;*/

let defualtEntitiesStore = {
	selected: false, 
	controlDisabled :  false, 
	count: 0, 
	byIds : {}, 
	allIds : [], 
	allEditingIds: [],
	pages: {},
};
let defualtMenuStoreState = {
	positionx: 0, 
	positiony: 0, 
	isVisible: false,
};
let defualtEntitiesState = {
	isFetching:false, 
	scrollPageHeight: 0,
	currentPage: 0,
	lastPage: 0,
	prevPageURL:null,
	nextPageURL:null,
	serverInvalidated: [], 
	clientInvalidated: [], 
	clientDeleted: [],
	receivedAt: null, 
	selected: false, 
	multipleSelected: []
};

const entitiesReducer = combineReducers({
	profile : entityReducerFactory(entities(maxProfileCount), OxiAppConstants.EntityTypes.PROFILE, defualtEntitiesStore),
	items : entityReducerFactory(entities(maxItemCount), OxiAppConstants.EntityTypes.ITEM, defualtEntitiesStore),//itemsReducer,
	contents : entityReducerFactory(entities(maxContentCount), OxiAppConstants.EntityTypes.CONTENT, defualtEntitiesStore),
	pictures : entityReducerFactory(entities(maxPictureCount), OxiAppConstants.EntityTypes.PICTURE, defualtEntitiesStore),
	itemContent : entityReducerFactory(entities(maxItemContentCount), OxiAppConstants.EntityTypes.ITEM_CONTENT, defualtEntitiesStore),
	outfits : entityReducerFactory(entities(maxOutfitCount), OxiAppConstants.EntityTypes.OUTFIT, defualtEntitiesStore),
	apparelTypes : entityReducerFactory(entities(1000), OxiAppConstants.EntityTypes.APPAREL_TYPE, defualtEntitiesStore),
	brands : entityReducerFactory(entities(1000), OxiAppConstants.EntityTypes.BRAND, defualtEntitiesStore),
	retailers : entityReducerFactory(entities(1000), OxiAppConstants.EntityTypes.RETAILER, defualtEntitiesStore)
});

const addedEntitiesReducer = combineReducers({
	profile : entityReducerFactory(localEntities(maxProfileCount), OxiAppConstants.EntityTypes.PROFILE, defualtEntitiesStore),
	items : entityReducerFactory(localEntities(maxItemViewCount), OxiAppConstants.EntityTypes.ITEM, defualtEntitiesStore),
	contents : entityReducerFactory(localEntities(maxContentViewCount), OxiAppConstants.EntityTypes.CONTENT, defualtEntitiesStore),
	itemContent : entityReducerFactory(localEntities(maxItemContentCount), OxiAppConstants.EntityTypes.ITEM_CONTENT, defualtEntitiesStore),
	outfits : entityReducerFactory(localEntities(maxOutfitCount), OxiAppConstants.EntityTypes.OUTFIT, defualtEntitiesStore)
})

const entitiesStateReducer = combineReducers({
	profile : entityReducerFactory(entitiesState, OxiAppConstants.EntityTypes.PROFILE, defualtEntitiesState),
	items : entityReducerFactory(entitiesState, OxiAppConstants.EntityTypes.ITEM, defualtEntitiesState),
	pictures : entityReducerFactory(entitiesState, OxiAppConstants.EntityTypes.PICTURE, defualtEntitiesState),
	contents : entityReducerFactory(entitiesState, OxiAppConstants.EntityTypes.CONTENT, defualtEntitiesState),
	outfits : entityReducerFactory(entitiesState, OxiAppConstants.EntityTypes.OUTFIT, defualtEntitiesState)
})

const popupMenusReducer = combineReducers({
	filter : entityReducerFactory(popupMenus, OxiAppConstants.MenuTypes.FILTER, defualtMenuStoreState),
	help: entityReducerFactory(popupMenus, OxiAppConstants.MenuTypes.HELP, defualtMenuStoreState),
})


const _OxiApp = combineReducers({
	//add reducers for combining here
	buttonState,
	browseState,
	searchState,
	appView,
	landingPage,
	popupMenusReducer,
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