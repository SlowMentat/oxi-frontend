import {combineReducers} from 'redux'
import {SET_VISIBLE_FORM, SHOW_MODAL, SET_XCSRF_TOKEN} from '../../Components/Actions/indexActions.js'
//import all reducers here

const iniModalState = {
	'modal':'HIDDEN',
	'isModalVisible':true
}

const iniTokenState = {
	'sessionId':null,
	'xCsrfToken':null
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

const _OxiApp = combineReducers({
	//add reducers for combining here
	toggleModal,
	saveToken
})

export default _OxiApp