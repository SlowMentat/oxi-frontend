
//Action Types
export const SET_VISIBLE_FORM = 'SET_VISIBLE_FORM';
export const SHOW_MODAL = 'SHOW_MODAL';
export const SET_XCSRF_TOKEN = 'SET_XCSRF_TOKEN';
export const SET_REQUEST_BODY = 'SET_REQUEST_BODY';
export const CREATE_ITEM = 'CREATE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const CREATE_CONTENT ='CREATE_CONTENT';
export const UPDATE_CONTENT = 'UPDATE_CONTENT';
export const EDIT_CONTENT_VIEW = "EDIT_CONTENT_VIEW";
export const SHOW_CONTENT_VIEW = "SHOW_CONTENT_VIEW";
export const SELECT_OUTFTI = "SELECT_OUTFIT";
export const CREATE_OUTFIT = "CREATE_OUTFIT";
export const UPDATE_OUTFIT = "UPDATE_OUTFIT";
export const DELETE_OUTFIT = "DELETE_OUTFIT";

//global variables
let nextItemId = 0;
let nextOutfitId = 0;
let nextContentId = 0;


export const setFormVisibility = makeActionCreator(SET_VISIBLE_FORM, null, 'modal');
export const editContentView = makeActionCreator(EDIT_CONTENT_VIEW, null, 'isEditingContent');
export const showContentView = makeActionCreator(SHOW_CONTENT_VIEW, null, 'isContentViewVisible');
export const showModal = makeActionCreator(SHOW_MODAL, null, 'isModalVisible');
export const setXcsrfToken = makeActionCreator(SET_XCSRF_TOKEN, null, 'xCsrfToken');

//OUTFIT Actions
export const createOutfit = makeActionCreator(CREATE_OUTFIT, 'OUTFIT');
export const updateOutfit = makeActionCreator(UPDATE_OUTFIT, 'OUTFIT', 'id', 'comment', 'contentIds');
export const deleteOutfit = makeActionCreator(DELETE_OUTFIT, 'OUTFIT', 'id');

//ITEM Actions
export const createItem = makeActionCreator(CREATE_ITEM, "ITEM", 'link', 'size', 'type');
export const updateItem = makeActionCreator(UPDATE_ITEM, "ITEM", 'id', 'link', 'size', 'type');

//CONTENT Actions
export const createContent = makeActionCreator(CREATE_CONTENT, "CONTENT", 'outfitId');
export const updateContent = makeActionCreator(UPDATE_CONTENT, "CONTENT", 'id', 'coverpicuri', 'items');



//function that manufactures action creators
//entityTarget:  	parameter that tells reducer logic on which store slice to operate.  
//					This is needed so that common reducer logic can be shared between specific reducers 
function makeActionCreator(type, entityTarget, ...dataKeys){
	return function(...dataValues){
		const action = {type: type, typeSpecifier: entityTarget, payload : {}};
		dataKeys.forEach((dataKey, index) => {
			action.payload[dataKey] = dataValues[index] 
		}) 
      	return action;
    };
}

