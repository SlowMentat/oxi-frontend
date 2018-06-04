import {combineReducers} from 'redux'
import {SET_VISIBLE_FORM, 
			SHOW_MODAL, 
			SET_XCSRF_TOKEN,
			CREATE_ITEM,
			UPDATE_ITEM,
			CREATE_CONTENT,
			UPDATE_CONTENT
		} from '../../Components/Actions/indexActions.js'

//import all reducers here

const iniModalState = {
	'modal':'HIDDEN',
	'isModalVisible':true
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

const toggleModal = (state = iniModalState, action) => {
	switch(action.type){
		case SET_VISIBLE_FORM:
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

/*const entities = (state = {byIds:{},allIds:[]}, action) => {
	switch(action.type){
		case CREATE_ITEM:
			return items(state, action);
		case UPDATE_ITEM:
			return;// {...state.items.byIds, {[action.payload.id]:action.payload}};
		case CREATE_CONTENT:
			return;
		case UPDATE_CONTENT:
			return;
		default:
			return state; 
	}
}*/

/*function itemsReducer(state = {byIds:{}, allIds:[]}, action){
	switch(action.type){
		case CREATE_ITEM:
			const incId = state.allIds.reduce((maxId, itemId) => Math.max(maxId, itemId), 0) + 1;
			const byIds = Object.assign({}, state.byIds, {[incId]: action.payload});
			return {
				byIds: byIds,
				allIds: [...state.allIds, incId]				
			};
		default:
			return state;
	}
}*/

function itemsById(state = {}, action){
	switch(action.type){
		case `CREATE_${action.typeSpecifier}`:
			return Object.assign({}, state, {[action.payload.id] : action.payload});
		case `UPDATE_${action.typeSpecifier}`:
			return Object.assign({}, state, {[action.payload.id] : action.payload});
		default:
			return state;
	}
}

function allItems(state = [], action){
	switch(action.type){
		case `CREATE_${action.typeSpecifier}`:
			return [...state, state.reduce((maxId, itemId) => Math.max(maxId, itemId), 0) + 1];
		default:
			return state;
	}
}

/*	switch(action.type){
		case SET_ITEMS:
			return Object.assign({}, state, action.payload);
		case SET_COMMENTS:
			return Object.assign({}, state, action.payload);
		case SET_COVERPICURI:
			return;
		default:
			return state;
	}
}

const item = (state = [], action) => {
	switch(action.type){
		case ADD_ITEM:
			return [...state, {size:action.size, type:action.type, link:action.link}];
		case REMOVE_ITEM:
			return [...state, {}];
		default:
			return state;
	}
}

const appEntities = (state = {}, action) => {
	switch (action.type){
		case CREATE_ITEM:
			return;
		case UPDATE_ITEM:
			return;
		case UPDATE_ITEM:
			return;
		default:
			return;
	}
}*/

const entities = (state = {byIds : {}, allIds : []}, action) => {
	let resultString = `CREATE_${action.typeSpecifier}`;
	console.log(resultString);
	switch(action.type){
		case `CREATE_${action.typeSpecifier}`:
			//Create new item id 
			const incId = state.allIds.reduce((maxId, currentId) => Math.max(maxId, currentId), 0) + 1;
			//insert new id into action payload
			let actionWithId = Object.assign({}, action, {payload : Object.assign({}, action.payload, {id : incId})})
			return {
				byIds : itemsById(state.byIds, actionWithId),
				allIds : allItems(state.allIds, actionWithId)
			};
		case `UPDATE_${action.typeSpecifier}`:
			return {
				byIds : itemsById(state.byIds, action),
				allIds : allItems(state.allIds, action)
			};
		default:
			console.log("no matching case in entities()")
			return state;
	}
}

//This reducer factory returns a wrapper function that invokes 'reducerFunction' 
//only when the value of the action object's "targetEntity' key equals "reducerName"
function entityReducerFactory(reducerFunction, reducerName){
	return (state = {byIds : {}, allIds : []}, action) => {
		const {typeSpecifier} =  action;
		const isInitializationCall = state === undefined;
		if(typeSpecifier !== reducerName && !isInitializationCall) return state;
		return reducerFunction(state, action);
	}
}

/*const itemsReducer = combineReducers({
	byId: itemsById,
	allIds: allItems
});*/

const entitiesReducer = combineReducers({
	profile : entityReducerFactory(entities, 'PROFILE'),
	items : entityReducerFactory(entities, 'ITEM'),//itemsReducer,
	contents : entityReducerFactory(entities, 'CONTENT'),
	itemContent : entityReducerFactory(entities, 'ITEM_CONTENT'),
	outfits : entityReducerFactory(entities, 'OUTFIT')
});

const _OxiApp = combineReducers({
	//add reducers for combining here
	toggleModal,
	saveToken,
	entitiesReducer
})

export default _OxiApp