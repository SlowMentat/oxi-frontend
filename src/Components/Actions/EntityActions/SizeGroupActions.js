import {makeActionCreator} from '../Scaffolding';
import {OxiAppConstants} from '../../../Util/OxiAppConstants.js';
import * as types from '../Types.js'


export const createSizeGroups	= makeActionCreator(types.CREATE_SIZE_GROUP, OxiAppConstants.EntityTypes.SIZE_GROUP, 'entities');
export const replaceSizeGroups	= makeActionCreator(types.REPLACE_SIZE_GROUP, OxiAppConstants.EntityTypes.SIZE_GROUP, 'entities');