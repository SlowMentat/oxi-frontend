import {makeActionCreator} from '../Scaffolding';
import {OxiAppConstants} from '../../../Util/OxiAppConstants.js';
import * as types from '../Types.js'


export const createModal = makeActionCreator(types.CREATE_MODAL, OxiAppConstants.EntityTypes.MODAL, 'entity');
export const createModals = makeActionCreator(types.CREATE_MODALS, OxiAppConstants.EntityTypes.MODAL, 'entities');
export const removeModalById = makeActionCreator(types.REMOVE_MODAL, OxiAppConstants.EntityTypes.MODAL, 'id');
export const modifyModalScrimOpacity = makeActionCreator(types.MODIFY_MODAL_SCRIM_OPACITY, OxiAppConstants.EntityTypes.MODAL, 'id', 'scrimOpacity');
export const modifyModalMetaData = makeActionCreator(types.MODIFY_MODAL_META_DATA, OxiAppConstants.EntityTypes.MODAL, 'id', 'otherData'); // TODO: change other data to metaData in EntityType.MODAL and everywhere else
//export const modifyModalPrevReqUrl = makeActionCreator(types.MODIFY_MODAL_PREV_REQ_URL, OxiAppConstants.EntityTypes.MODAL, 'id', 'prevRequestUrl');
//export const modifyModalPrevReqType = makeActionCreator(types.MODIFY_MODAL_PREV_REQ_TYPE, OxiAppConstants.EntityTypes.MODAL, 'id', 'prevRequestType');