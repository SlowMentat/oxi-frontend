import {makeActionCreator} from '../Scaffolding';
import {OxiAppConstants} from '../../../Util/OxiAppConstants.js';
import * as types from '../Types.js'

export const selectItem 		= makeActionCreator(types.SELECT_ITEM, OxiAppConstants.EntityTypes.ITEM, 'id');
//ITEM Actions
export const createItem 		= makeActionCreator(types.CREATE_ITEM, OxiAppConstants.EntityTypes.ITEM, 'entities');
export const updateItem 		= makeActionCreator(types.UPDATE_ITEM, OxiAppConstants.EntityTypes.ITEM, 'id');
//export const updateItems 		= makeActionCreator(types.UPDATE_ITEM, OxiAppConstants.EntityTypes.ITEM, 'ids');
export const replaceItems 		= makeActionCreator(types.REPLACE_ITEM, OxiAppConstants.EntityTypes.ITEM, 'entities');
//export const addItem 			= makeActionCreator(types.ADD_ITEM, OxiAppConstants.EntityTypes.ITEM, 'type','positionx', 'positiony', 'size', 'retailer', 'brand');
export const addItem 			= makeActionCreator(types.ADD_ITEM, OxiAppConstants.EntityTypes.ITEM, 'entity');
export const modifyItem 		= makeActionCreator(types.MODIFY_ITEM, OxiAppConstants.EntityTypes.ITEM, 'entity');
export const removeAddedItem	= makeActionCreator(types.REMOVE_ITEM, OxiAppConstants.EntityTypes.ITEM, 'id');