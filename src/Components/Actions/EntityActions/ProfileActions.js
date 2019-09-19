import {makeActionCreator} from '../Scaffolding';
import {OxiAppConstants} from '../../../Util/OxiAppConstants.js';
import * as types from '../Types.js'


const defaultProfileData = {
	'id':'',
	'username':'',
	'bodyShape':'',
	'apparelInterest': '',
	'height':'',
	'neck':'',
	'fullShoulder':'',
	'halfShoulder':'',
	'chest':'',
	'waist':'',
	//'hips':'',
	'sleeve':'',
	'frontLength':'',
	'backLength':'',
	'pantOutseam':'',
	'pantInseam':'',
	'thigh':'',
	'calf':''	
};

//PROFILE Actions
export const addProfile = (profileData) => {
	let completeData = Object.assign({}, defaultProfileData, profileData)
	return({
		type: ADD_PROFILE,
		typeSpecifier: OxiAppConstants.EntityTypes.PROFILE,
		payload: {
			entity: completeData
		}

	});
};

//removes all profile entities from addedEntitiesReducer
export const removeProfile = makeActionCreator(types.REMOVE_PROFILE, OxiAppConstants.EntityTypes.PROFILE, "id");
export const updateProfile = makeActionCreator(types.UPDATE_PROFILE, OxiAppConstants.EntityTypes.PROFILE, 'id');
export const modifyProfile = makeActionCreator(types.MODIFY_PROFILE, OxiAppConstants.EntityTypes.PROFILE, "entity");
export const replaceProfile	= makeActionCreator(types.REPLACE_PROFILE, OxiAppConstants.EntityTypes.PROFILE, 'entities');