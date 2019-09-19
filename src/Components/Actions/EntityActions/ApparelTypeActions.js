import {makeActionCreator} from '../Scaffolding';
import {OxiAppConstants} from '../../../Util/OxiAppConstants.js';
import * as types from '../Types.js'


export const createApparelTypes = makeActionCreator(types.CREATE_APPAREL_TYPE, OxiAppConstants.EntityTypes.APPAREL_TYPE, 'entities');
export const replaceApparelTypes = makeActionCreator(types.REPLACE_APPAREL_TYPE, OxiAppConstants.EntityTypes.APPAREL_TYPE, 'entities');