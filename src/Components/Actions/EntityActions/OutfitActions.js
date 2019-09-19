import {makeActionCreator} from '../Scaffolding';
import {OxiAppConstants} from '../../../Util/OxiAppConstants.js';
import * as types from '../Types.js'


export const selectOutfit 		= makeActionCreator(types.SELECT_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'id');
//OUTFIT Actions
export const createOutfit 		= makeActionCreator(types.CREATE_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'entities');
export const updateOutfit 		= makeActionCreator(types.UPDATE_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'id');
export const replaceOutfits 	= makeActionCreator(types.REPLACE_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'entities');
export const deleteOutfit 		= makeActionCreator(types.DELETE_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'id', 'likes', 'comments', 'coverpicuri', 'contents', 'profile');
//export const addOutfit 			= makeActionCreator(types.ADD_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'id', 'likes', 'comments', 'coverpicuri', 'contents', 'profile');
export const addOutfit 			= makeActionCreator(types.ADD_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'entity');
export const modifyOutfit 		= makeActionCreator(types.MODIFY_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'entity');
export const toggleOutfitIsLiked= makeActionCreator(types.TOGGLE_OUTFIT_IS_LIKED, OxiAppConstants.EntityTypes.OUTFIT, 'id')
export const selectAddedOutfit 	= makeActionCreator(types.SELECT_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'id');
export const removeAddedOutfit	= makeActionCreator(types.REMOVE_OUTFIT, OxiAppConstants.EntityTypes.OUTFIT, 'id');
export const updateOutfitCoverpicuri = makeActionCreator(types.UPDATE_OUTFIT_COVERPICURI, OxiAppConstants.EntityTypes.OUTFIT, 'entity');