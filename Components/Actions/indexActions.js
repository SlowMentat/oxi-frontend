
//Action Types
export const SET_VISIBLE_FORM = 'SET_VISIBLE_FORM';
export const SHOW_MODAL = 'SHOW_MODAL';
export const SET_XCSRF_TOKEN = 'SET_XCSRF_TOKEN';
export const SET_REQUEST_BODY = 'SET_REQUEST_BODY';
export const CREATE_ITEM = 'CREATE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const CREATE_CONTENT ='CREATE_CONTENT';
export const UPDATE_CONTENT = 'UPDATE_CONTENT';


//global variables
let nextItemId = 0;
let nextOutfitId = 0;
let nextContentId = 0;


export const setFormVisibility = form => {
	return {
		type: SET_VISIBLE_FORM,
		payload: {
			'modal':form,
		}
	}
}

export const showModal = visible => {
	return {
		type: SHOW_MODAL,
		payload: {
			'isModalVisible':visible
		}
	}
}

export const setXcsrfToken = token => {
	return {
		type: SET_XCSRF_TOKEN,
		payload: {
			'xCsrfToken': token
		}
	}
}

//ITEM Actions
export const createItem = (link, size, type) => {
	return {
		type: CREATE_ITEM,
		payload: {
			id: nextItemId++, 
			link, 
			size, 
			type
		},
		typeSpecifier: "ITEM"
	}
}

export const updateItem = (id, link, size, type) => {
	return {
		type: UPDATE_ITEM,
		payload: { 
			id, 
			link, 
			size, 
			type 
		},
		typeSpecifier: "ITEM"
	}
}

//CONTENT Actions
export const createContent = (coverpicuri, items = []) => {
	return {
		type: CREATE_CONTENT,
		payload: { 
			id: nextContentId++,
			coverpicuri, 
			items 
		}
	}
}

export const updateContent = (id, coverpicuri, items = []) => {
	return {
		type: UPDATE_CONTENT,
		payload: { 
			id, 
			coverpicuri, 
			items 
		}
	}
}

