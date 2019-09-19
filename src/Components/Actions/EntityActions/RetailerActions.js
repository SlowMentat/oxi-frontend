import {makeActionCreator} from '../Scaffolding';
import {OxiAppConstants} from '../../../Util/OxiAppConstants.js';
import * as types from '../Types.js'


export const replaceRetailers	= makeActionCreator(types.REPLACE_RETAILER, OxiAppConstants.EntityTypes.RETAILER, 'entities');