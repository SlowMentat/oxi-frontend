import {makeActionCreator} from '../Scaffolding';
import {OxiAppConstants} from '../../../Util/OxiAppConstants.js';
import * as types from '../Types.js'


//AUX_CONTENT Actions
export const createAuxContent 		= makeActionCreator(types.CREATE_AUX_CONTENT, OxiAppConstants.EntityTypes.AUX_CONTENT, 'entities');
export const replaceAuxContents 	= makeActionCreator(types.REPLACE_AUX_CONTENT, OxiAppConstants.EntityTypes.AUX_CONTENT, 'entities');
//export const addAuxContent 		= makeActionCreator(types.ADD_AUX_CONTENT, OxiAppConstants.EntityTypes.AUX_CONTENT, 'id', 'outfitId', 'items');
export const addAuxContent 			= makeActionCreator(types.ADD_AUX_CONTENT, OxiAppConstants.EntityTypes.AUX_CONTENT, 'entity');
export const addAuxContents 		= makeActionCreator(types.ADD_AUX_CONTENTS, OxiAppConstants.EntityTypes.AUX_CONTENT, 'entities');
export const modifyAuxContent 		= makeActionCreator(types.MODIFY_AUX_CONTENT, OxiAppConstants.EntityTypes.AUX_CONTENT, 'entity')
export const selectAddedAuxContent 	= makeActionCreator(types.SELECT_AUX_CONTENT, OxiAppConstants.EntityTypes.AUX_CONTENT, 'id');
export const removeAddedAuxContent 	= makeActionCreator(types.REMOVE_AUX_CONTENT, OxiAppConstants.EntityTypes.AUX_CONTENT, 'id');
export const selectAuxContent 		= makeActionCreator(types.SELECT_AUX_CONTENT, OxiAppConstants.EntityTypes.AUX_CONTENT, 'id');
export const updateAuxContent 		= makeActionCreator(types.UPDATE_AUX_CONTENT, OxiAppConstants.EntityTypes.AUX_CONTENT, 'id');