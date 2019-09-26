import {makeActionCreator} from '../Scaffolding';
import {OxiAppConstants} from '../../../Util/OxiAppConstants.js';
import * as types from '../Types.js'


export const replaceSizeCharts	= makeActionCreator(types.REPLACE_SIZE_CHART, OxiAppConstants.EntityTypes.SIZE_CHART, 'entities');
export const addSizeChart		= makeActionCreator(types.ADD_SIZE_CHART, OxiAppConstants.EntityTypes.SIZE_CHART, 'entity');