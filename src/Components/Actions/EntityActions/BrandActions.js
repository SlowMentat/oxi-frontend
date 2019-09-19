import {makeActionCreator} from '../Scaffolding';
import {OxiAppConstants} from '../../../Util/OxiAppConstants.js';
import * as types from '../Types.js'


export const replaceBrands 		= makeActionCreator(types.REPLACE_BRAND, OxiAppConstants.EntityTypes.BRAND, 'entities');