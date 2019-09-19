import {makeActionCreator} from '../Scaffolding';
import {OxiAppConstants} from '../../../Util/OxiAppConstants.js';
import * as types from '../Types.js'


//CONTENT Actions
export const createContent 		= makeActionCreator(types.CREATE_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'entities');
export const replaceContents 	= makeActionCreator(types.REPLACE_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'entities');
//export const addContent 		= makeActionCreator(types.ADD_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'id', 'outfitId', 'items');
export const addContent 		= makeActionCreator(types.ADD_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'entity');
export const addContents 		= makeActionCreator(types.ADD_CONTENTS, OxiAppConstants.EntityTypes.CONTENT, 'entities');
export const modifyContent 		= makeActionCreator(types.MODIFY_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'entity')
export const selectAddedContent = makeActionCreator(types.SELECT_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'id');
export const removeAddedContent = makeActionCreator(types.REMOVE_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'id');
export const selectContent 		= makeActionCreator(types.SELECT_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'id');
export const updateContent 		= makeActionCreator(types.UPDATE_CONTENT, OxiAppConstants.EntityTypes.CONTENT, 'id');