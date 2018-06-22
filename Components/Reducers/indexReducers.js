import {combineReducers} from 'redux'
import {SET_VISIBLE_FORM, 
			SHOW_MODAL, 
			SET_XCSRF_TOKEN,
			CREATE_ITEM,
			UPDATE_ITEM,
			CREATE_CONTENT,
			UPDATE_CONTENT,
			EDIT_CONTENT_VIEW,
			SHOW_CONTENT_VIEW
		} from '../../Components/Actions/indexActions.js'

//import all reducers here

const iniState = {
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

const toggleModal = (state = iniState, action) => {
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
		case `DELETE_CONTENT_${action.typeSpecifier}`:
			return state.splice(action.ids)
		default:
			return state;
	}
}

const entities = (state = {byIds : {}, allIds : []}, action) => {
	let resultString = `CREATE_${action.typeSpecifier}`;
	console.log(resultString);
	switch(action.type){
		case `CREATE_${action.typeSpecifier}`:
			//Create new entity id 
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

function shownContentView(state = {'shownContentView' : true}, action){
	switch(action.type){
		case SHOW_CONTENT_VIEW:
			return Object.assign({}, state, action.payload);
		default:
			return state;
	}
}

function editableContentView(state = {'isEditingContent' : false}, action){
	switch(action.type){
		case EDIT_CONTENT_VIEW:
			return Object.assign({}, state, action.payload);
		default:
			return state;
	}
}

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
	entitiesReducer,
	shownContentView,
	editableContentView
})

export default _OxiApp