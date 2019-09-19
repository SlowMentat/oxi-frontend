import {makeActionCreator} from '../Scaffolding';
import {OxiAppConstants} from '../../../Util/OxiAppConstants.js';
import * as types from '../Types.js'


//export const createItemContent 	= makeActionCreator(types.CREATE_ITEMCONTENT, OxiAppConstants.EntityTypes.ITEM_CONTENT,'id', 'itemId', 'contentId');
export const createItemContent 	= makeActionCreator(types.CREATE_ITEMCONTENT, OxiAppConstants.EntityTypes.ITEM_CONTENT, 'entities');
export const updateItemContent 	= makeActionCreator(types.UPDATE_ITEMCONTENT, OxiAppConstants.EntityTypes.ITEM_CONTENT,'id', 'itemId', 'contentId');
//export const addItemContent 	= makeActionCreator(types.ADD_ITEMCONTENT, OxiAppConstants.EntityTypes.ITEM_CONTENT, 'itemId', 'contentId');
export const addItemContent 	= makeActionCreator(types.ADD_ITEMCONTENT, OxiAppConstants.EntityTypes.ITEM_CONTENT, 'entity');