import {makeActionCreator} from '../Scaffolding';
import {OxiAppConstants} from '../../../Util/OxiAppConstants.js';
import * as types from '../Types.js'


export const createLikeCount = makeActionCreator(types.CREATE_LIKE_COUNT, OxiAppConstants.EntityTypes.LIKE_COUNT, 'entities');
export const replaceLikeCount = makeActionCreator(types.REPLACE_LIKE_COUNT, OxiAppConstants.EntityTypes.LIKE_COUNT, 'entities');