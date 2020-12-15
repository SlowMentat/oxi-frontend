
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';


//Action Types
export const SET_VISIBLE_FORM 					= 'SET_VISIBLE_FORM';
export const SET_VISIBLE_FORM_OVERLAY 			= 'SET_VISIBLE_FORM_OVERLAY';
export const SHOW_MODAL 						= 'SHOW_MODAL';
export const SET_XCSRF_TOKEN 					= 'SET_XCSRF_TOKEN';
export const SET_REQUEST_BODY 					= 'SET_REQUEST_BODY';
export const SET_LP_PROFILE_MENU				= 'SET_LP_PROFILE_MENU';
export const SET_LP_CREATE_ACCOUNT_VIEW			= 'SET_LP_CREATE_ACCOUNT_VIEW';
export const CREATE_ITEM 						= 'CREATE_' 			+ OxiAppConstants.EntityTypes.ITEM;
export const UPDATE_ITEM 						= 'UPDATE_' 			+ OxiAppConstants.EntityTypes.ITEM;
export const REPLACE_ITEM 						= 'REPLACE_' 			+ OxiAppConstants.EntityTypes.ITEM;
export const CREATE_CONTENT 					= 'CREATE_' 			+ OxiAppConstants.EntityTypes.CONTENT;
export const UPDATE_CONTENT 					= 'UPDATE_' 			+ OxiAppConstants.EntityTypes.CONTENT;
export const REPLACE_CONTENT 					= 'REPLACE_' 			+ OxiAppConstants.EntityTypes.CONTENT;
export const CREATE_AUX_CONTENT 				= 'CREATE_' 			+ OxiAppConstants.EntityTypes.AUX_CONTENT;
export const UPDATE_AUX_CONTENT 				= 'UPDATE_' 			+ OxiAppConstants.EntityTypes.AUX_CONTENT;
export const REPLACE_AUX_CONTENT 				= 'REPLACE_' 			+ OxiAppConstants.EntityTypes.AUX_CONTENT;
export const EDIT_CONTENT_VIEW 					= "EDIT_CONTENT_VIEW";
export const PREVIEW_CONTENT					= "PREVIEW_CONTENT";
export const SHOW_CONTENT_VIEW 					= "SHOW_CONTENT_VIEW"; //TODO: replace this with PREVIEW_CONTENT const
export const SELECT_OUTFIT 						= "SELECT_" 			+ OxiAppConstants.EntityTypes.OUTFIT;
export const CREATE_OUTFIT 						= "CREATE_" 			+ OxiAppConstants.EntityTypes.OUTFIT;
export const CREATE_ITEMCONTENT 				= "CREATE_" 			+ OxiAppConstants.EntityTypes.ITEM_CONTENT;
export const UPDATE_ITEMCONTENT					= 'UPDATE_'				+ OxiAppConstants.EntityTypes.ITEM_CONTENT;
export const UPDATE_OUTFIT 						= "UPDATE_" 			+ OxiAppConstants.EntityTypes.OUTFIT;
export const REPLACE_OUTFIT 					= "REPLACE_" 			+ OxiAppConstants.EntityTypes.OUTFIT;
export const DELETE_OUTFIT						= "DELETE_" 			+ OxiAppConstants.EntityTypes.OUTFIT;
export const SELECT_PAGE 						= "SELECT_PAGE";
export const CREATE_PICTURE						= "CREATE_"				+ OxiAppConstants.EntityTypes.PICTURE;
export const CREATE_APPAREL_TYPE				= "CREATE_"				+ OxiAppConstants.EntityTypes.APPAREL_TYPE;
export const CREATE_LIKE_COUNT					= 'CREATE_'				+ OxiAppConstants.EntityTypes.LIKE_COUNT;
export const SET_BROWSER_SELECTION   			= "SET_BROWSER_SELECTION";

//Action on for entities added to client
export const ADD_ITEM							= 'ADD_'				+ OxiAppConstants.EntityTypes.ITEM;
export const MODIFY_ITEM						= 'MODIFY_'				+ OxiAppConstants.EntityTypes.ITEM;
export const REMOVE_ITEM						= 'REMOVE_'				+ OxiAppConstants.EntityTypes.ITEM;
export const SELECT_NEW_ITEM					= 'SELECT_NEW_'			+ OxiAppConstants.EntityTypes.ITEM;
export const ADD_ITEMCONTENT					= 'ADD_'				+ OxiAppConstants.EntityTypes.ITEM_CONTENT;
export const REMOVE_ITEMCONTENT					= 'REMOVE_'				+ OxiAppConstants.EntityTypes.ITEM_CONTENT;
export const ADD_CONTENT						= 'ADD_'				+ OxiAppConstants.EntityTypes.CONTENT;
export const ADD_CONTENTS						= 'ADD_'				+ OxiAppConstants.EntityTypes.CONTENT + 'S';
export const MODIFY_CONTENT						= 'MODIFY_'				+ OxiAppConstants.EntityTypes.CONTENT;
export const REMOVE_CONTENT						= 'REMOVE_'				+ OxiAppConstants.EntityTypes.CONTENT;
export const SELECT_CONTENT						= 'SELECT_'				+ OxiAppConstants.EntityTypes.CONTENT;
	
export const ADD_AUX_CONTENT					= 'ADD_'				+ OxiAppConstants.EntityTypes.AUX_CONTENT;
export const ADD_AUX_CONTENTS					= 'ADD_'				+ OxiAppConstants.EntityTypes.AUX_CONTENT + 'S'; //.replace(/^[^_]*/g, (match)=>`${match}S`);
export const MODIFY_AUX_CONTENT					= 'MODIFY_'				+ OxiAppConstants.EntityTypes.AUX_CONTENT;
export const REMOVE_AUX_CONTENT					= 'REMOVE_'				+ OxiAppConstants.EntityTypes.AUX_CONTENT;
export const SELECT_AUX_CONTENT					= 'SELECT_'				+ OxiAppConstants.EntityTypes.AUX_CONTENT;
	
export const ADD_OUTFIT							= 'ADD_'				+ OxiAppConstants.EntityTypes.OUTFIT;
export const MODIFY_OUTFIT						= 'MODIFY_'				+ OxiAppConstants.EntityTypes.OUTFIT;
export const REMOVE_OUTFIT						= 'REMOVE_'				+ OxiAppConstants.EntityTypes.OUTFIT;
export const ADD_PROFILE						= 'ADD_'				+ OxiAppConstants.EntityTypes.PROFILE;
export const MODIFY_PROFILE						= 'MODIFY_'				+ OxiAppConstants.EntityTypes.PROFILE;
export const REMOVE_PROFILE						= 'REMOVE_'				+ OxiAppConstants.EntityTypes.PROFILE;
export const SELECT_NEW_PROFILE					= 'SELECT_NEW_'			+ OxiAppConstants.EntityTypes.PROFILE;
export const CREATE_PROFILE						= 'CREATE_PROFILE'		+ OxiAppConstants.EntityTypes.PROFILE;
export const REPLACE_PROFILE					= "REPLACE_"			+ OxiAppConstants.EntityTypes.PROFILE;
export const REPLACE_BRAND						= 'REPLACE_' 			+ OxiAppConstants.EntityTypes.BRAND;
export const REPLACE_RETAILER					= 'REPLACE_' 			+ OxiAppConstants.EntityTypes.RETAILER;
export const REPLACE_PICTURE					= 'REPLACE_' 			+ OxiAppConstants.EntityTypes.PICTURE;
export const REPLACE_APPAREL_TYPE   			= 'REPLACE_'			+ OxiAppConstants.EntityTypes.APPAREL_TYPE;
export const REPLACE_LIKE_COUNT					= 'REPLACE_'			+ OxiAppConstants.EntityTypes.LIKE_COUNT;

//export const MODIFY_MODAL						= 'MODIFY_'				+ OxiAppConstants.EntityTypes.MODAL;
export const CREATE_MODAL						= 'CREATE_MODAL';
export const CREATE_MODALS						= 'CREATE_MODALS';
export const REMOVE_MODAL						= 'REMOVE_MODAL';
export const MODIFY_MODAL_SCRIM_OPACITY			= 'MODIFY_MODAL_SCRIM_OPACITY';
export const MODIFY_MODAL_META_DATA				= 'MODIFY_MODAL_META_DATA';
//export const MODIFY_MODAL_PREV_REQ_URL			= 'MODIFY_MODAL_PREV_REQ_URL';
//export const MODIFY_MODAL_PREV_REQ_TYPE			= 'MODIFY_MODAL_PREV_REQ_TYPE';
	
//Async action types	
export const REQUEST_LOGIN 						= "REQUEST_LOGIN";
export const REQUEST_ENTITIES 					= "REQUEST_ENTITIES";
export const RECEIVE_ENTITIES 					= "RECEIVE_ENTITIES";
export const SERVER_INVALIDATE_ENTITIES 		= "SERVER_INVALIDATE_ENTITIES";
export const CLIENT_INVALIDATE_ENTITIES			= 'CLIENT_INVALIDATE_ENTITIES';
//Fetch HTTP request actions	
export const FETCH_ENTITIES_REQUEST 			= "FETCH_ENTITIES_REQUEST";//type of action informing reducers request began
export const FETCH_ENTITIES_FAILURE 			= "FETCH_ENTITIES_FAILURE";//type of action infiorming reducers the request failed
export const FETCH_ENTITIES_SUCCESS 			= "FETCH_ENTITIES_SUCCESS";//type of action infiorming reducers the request finished successfully
	
export const FETCH_AUTH_REQUEST 				= "FETCH_AUTH_REQUEST";
export const FETCH_AUTH_FAILURE 				= "FETCH_AUTH_FAILURE";
export const FETCH_AUTH_SUCCUSS 				= "FETCH_AUTH_SUCCUSS";
export const SELECT_WEB_APP_VIEW				= "SELECT_WEB_APP_VIEW";
export const SELECT_WEB_APP_VIEW_CONTEXT 		= "SELECT_WEB_APP_VIEW_CONTEXT";
	
export const SELECT_ITEM 						= "SELECT_"				+ OxiAppConstants.EntityTypes.ITEM;
export const DISABLE_BUTTON						= "DISABLE_BUTTON";
export const DISABLE_CONTENT_BUTTON 			= 'DISABLE_CONTENT_BUTTON';
		
export const REQUEST_NAVIGATION					= 'REQUEST_NAVIGATION';
	
export const UPDATE_PROFILE 					= 'UPDATE_' 			+ OxiAppConstants.EntityTypes.PROFILE;
	
export const SET_POSITION_FILTER				= 'SET_POSITION_' 		+ OxiAppConstants.MenuTypes.FILTER;
export const SET_POSITION_HELP					= 'SET_POSITION_' 		+ OxiAppConstants.MenuTypes.FILTER;
export const SET_VISIBLE_HELP					= 'SET_VISIBLE_' 		+ OxiAppConstants.MenuTypes.HELP;
export const SET_VISIBLE_FILTER					= 'SET_VISIBLE_' 		+ OxiAppConstants.MenuTypes.HELP;
export const SET_VISIBLE_POPUP					= 'SET_VISIBLE_POPUP';
	
export const UPDATE_OUTFIT_COVERPICURI 			= 'UPDATE_OUTFIT_COVERPICURI';
	
export const RECEIVED_EXISTING_ITEMS_SEARCH 	= 'RECEIVED_EXISTING_ITEMS_SEARCH';
export const RECEIVED_RETAILER_NAMES_SEARCH 	= 'RECEIVED_RETAILER_NAMES_SEARCH';
export const RECEIVED_UDR_NAMES_SEARCH 			= 'RECEIVED_UDR_NAMES_SEARCH';
export const RECEIVED_UDS_LABELS_SEARCH 		= 'RECEIVED_UDS_LABELS_SEARCH';
export const RECEIVED_UD_ITEM_SEARCH			= 'RECEIVED_UD_ITEM_SEARCH';
export const RECEIVED_ALL_APPAREL_TYPES 		= 'RECEIVED_ALL_APPAREL_TYPES';
export const RECEIVED_SIZE_GROUPS_BY_ITEM_ID 	= 'RECEIVED_SIZE_GROUPS_BY_ITEM_ID';

export const REPLACE_SIZE_GROUP 				= 'REPLACE_SIZE_GROUP';
export const REPLACE_SIZE_CHART 				= 'REPLACE_SIZE_CHART';
export const ADD_SIZE_CHART						= 'ADD_SIZE_CHART';
export const CREATE_SIZE_GROUP 					= 'CREATE_SIZE_GROUP';
export const ADD_SIZE_GROUP						= 'ADD_SIZE_GROUP';

export const SET_PREVIEW_FOCUS 					= 'SET_PREVIEW_FOCUS';
export const UNSET_PREVIEW_FOCUS 				= 'UNSET_PREVIEW_FOCUS';

export const TOGGLE_OUTFIT_IS_LIKED 			= 'TOGGLE_OUTFIT_IS_LIKED';