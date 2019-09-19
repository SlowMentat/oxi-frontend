import {makeActionCreator} from '../Scaffolding';
import {OxiAppConstants} from '../../../Util/OxiAppConstants.js';
import * as types from '../Types.js'


export const createPictures		= makeActionCreator(types.CREATE_PICTURE, OxiAppConstants.EntityTypes.PICTURE, 'entities');
export const replacePictures 	= makeActionCreator(types.REPLACE_PICTURE, OxiAppConstants.EntityTypes.PICTURE, 'entities');