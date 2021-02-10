import {makeActionCreator} from './Scaffolding.js';



//======== GENERIC LIST ACTIONS ========

export const addToList = (listType, listElement) => {
	return function(dispatch){
		dispatch(makeActionCreator(`ADD_${listType.toUpperCase()}`, listType.toUpperCase(), 'id')(listElement));
	}
} 

export const removeFromList = (listType, listElement) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REMOVE_${listType.toUpperCase()}`, listType.toUpperCase(), 'id')(listElement));
	}
}

export const clearList = (listType, listElement) => {
	return function(dispatch){
		dispatch(makeActionCreator(`CLEAR_${listType.toUpperCase()}`, listType.toUpperCase(), 'id')(listElement));
	}
}

export const updateList = (listType, listElement) => {
	return function(dispatch){
		dispatch(makeActionCreator(`UPDATE_${listType.toUpperCase()}`, listType.toUpperCase(), 'id')(listElement));
	}
}


//======== GENERIC MAP ACTIONS ========

export const addToMap = (mapType, ...keyValuePair) => {
	return function(dispatch){
		dispatch(makeActionCreator(`PUT_TO_${mapType.toUpperCase()}`, mapType.toUpperCase(), 'itemId', 'createdOn')(keyValuePair[0], keyValuePair[1]));
	}
}

export const replaceMap = (mapType, newMap) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REPLACE_${mapType.toUpperCase()}`, mapType.toUpperCase(), 'newMap')(newMap));
	}
}

export const removeFromMap = (mapType, itemId) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REMOVE_FROM_${mapType.toUpperCase()}`, mapType.toUpperCase(), 'itemId')(itemId));
	}
}

// Delete a single outfits by ids.  Any child entities will remain in the redux state.
export const deleteOutfitEntities = (entityType, entityIds) => {
	return function(dispatch){
		dispatch(makeActionCreator(`DELETE_${entityType.toUpperCase()}S`, entityType.toUpperCase(), 'ids')(entityIds));
	}
}



//========================================

export const receiveEntitiesTest = (entityType, data) => {
	dispatch(makeActionCreator(`RECEIVED_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'receivedAt')(data));
}

export const updatePrevSelectedEntity = (entityType, entityId) => {
	return function(dispatch){
		dispatch(makeActionCreator(`UPDATE_PREV_SELECTED_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'prevSelected')(entityId));
	}	
}

export const selectEntity = (entityType, entityId) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SELECT_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'selected')(entityId));
	}
}

export const selectMultipleEntity = (entityType, entityId) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SELECT_MUL_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'selected')(entityId));
	}
}

export const deselectMultipleEntity = (entityType, entityId) => {
	return function(dispatch){
		dispatch(makeActionCreator(`DESELECT_MUL_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'selected')(entityId));
	}
}

export const clearSelectMultipleEntity = (entityType) => {
	return function(dispatch){
		dispatch(makeActionCreator(`CLEAR_SELECT_MUL_${entityType.toUpperCase()}`, entityType.toUpperCase())());
	}
}


//======== Popup Menu Actions ======== 

export const showMenu = (menuType, isVisible) => {
	return function(dispatch){
		//dispatch(makeActionCreator(`SET_VISIBLE_${menuType.toUpperCase()}`, menuType.toUpperCase(), 'isVisible')(isVisible));
		dispatch(makeActionCreator(`SET_VISIBLE_POPUP`, menuType.toUpperCase(), 'isVisible', 'type')(isVisible, menuType));
	}
}

export const placeMenu = (menuType, positionx, positiony) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SET_POSITION_${menuType.toUpperCase()}`, menuType.toUpperCase(), 'positionx', 'positiony')(positionx, positiony));
	}
}


//======== ADDED ENTITIES ACTIONS ========

export const removeEntity = (entityType, entityId) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REMOVE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'id')(entityId));
	}
}

//Removes a multiple entities specified by entityIds array from the addedEntitiesReducer state tree
export const removeEntities = (entityType, entityIds) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REMOVE_MULTIPLE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'ids')(entityIds));
	}
}

//Remove all entities from the addedEntitiesReducer state tree
export const removeAllEntities = (entityType) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REMOVE_ALL_${entityType.toUpperCase()}`, entityType.toUpperCase())());
	}
}


//======== ADDED ENTITIES ACTIONS ========

//Removes a single entity from the addedEntitiesReducer state tree
export const removeAddedEntity = (entityType, entityId) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REMOVE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'id')(entityId));
	}
}

//Removes a multiple entities specified by entityIds array from the addedEntitiesReducer state tree
export const removeAddedEntities = (entityType, entityIds) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REMOVE_MULTIPLE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'ids')(entityIds));
	}
}

//Remove all entities from the addedEntitiesReducer state tree
export const removeAllAddedEntities = (entityType) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REMOVE_ALL_ADDED_${entityType.toUpperCase()}`, entityType.toUpperCase())());
	}
}


//======== EDITTING IDS ACITONS ========


//appends the given id to the specified entityType's allEdittingIds state array
export const addToEdittingIds = (entityType, entityId) => {
	return function(dispatch){
		dispatch(makeActionCreator(`ADD_TO_${entityType.toUpperCase()}_EDITTING_IDS`, entityType.toUpperCase(), 'id')(entityId));
	}
};

//replaces the array of ids to the specified entityType's allEdittingIds state array
export const replaceEdittingIds = (entityType, entityIds) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REPLACE_${entityType.toUpperCase()}_EDITTING_IDS`, entityType.toUpperCase(), 'ids')(entityIds));
	}
};

//clears the array of ids to the specified entityType's allEdittingIds state array
export const clearEdittingIds = (entityType) => {
	return function(dispatch){
		dispatch(makeActionCreator(`CLEAR_${entityType.toUpperCase()}_EDITTING_IDS`, entityType.toUpperCase())());
	}
};


//========CLIENT INVALIDATION ACTIONS========

//add specified entityIds to the clientInvalidated Leaf of entitiesStateReducer
export const clientInvalidateEntities = (entityType, entityIds=[]) => {
	return function(dispatch){
		dispatch(makeActionCreator(`CLIENT_INVALIDATE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'ids')(entityIds));
	}
};
//Remove specified entityIds from the clientInvalidated Leaf of entitiesStateReducer
export const removeClientInvalidation = (entityType, entityIds=[]) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REMOVE_CLIENT_INVALIDATE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'ids')(entityIds));
	}
};
//Remove all entityIds from the clientInvalidated Leaf of entitiesStateReducer
export const clearClientInvalidation = (entityType) => {
	return function(dispatch){
		dispatch(makeActionCreator(`CLEAR_CLIENT_INVALIDATE_${entityType.toUpperCase()}`, entityType.toUpperCase())());
	}
};


//========CLIENT PAGING ACTIONS========

//add specified entityIds to the clientInvalidated Leaf of entitiesStateReducer
export const setEntityCurrentPage = (entityType, pageNumber) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SET_CURRENT_PAGE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'currentPage')(pageNumber));
	}
};
//Remove specified entityIds from the clientInvalidated Leaf of entitiesStateReducer
export const setEntityLastPage = (entityType, pageNumber) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SET_LAST_PAGE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'lastPage')(pageNumber));
	}
};
//add {page:ids} to tail of pages object
/*export const pageEntityDown = (entityType, ids) => {
	return function(dispatch){
		dispatch(makeActionCreator(`PAGE_BUFFER_DOWN_${entityType.toUpperCase()}`, entityType.toUpperCase('ids'))(ids));
	}
};
//remove {page:ids} from tail of pages object
export const pageEntityUp = (entityType, ids) => {
	return function(dispatch){
		dispatch(makeActionCreator(`PAGE_BUFFER_UP_${entityType.toUpperCase()}`, entityType.toUpperCase('ids'))(ids));
	}
};*/
export const modifyPagedEntityIds = (entityType, page, ids) => {
	return function(dispatch){
		dispatch(makeActionCreator(`MODIFY_PAGED_${entityType.toUpperCase()}`, entityType.toUpperCase(), `${page}`)(ids));
	}
}
//Set maxBufferedPages
export const setPageBuffer = (entityType, pages) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SET_PAGE_BUFFER_SIZE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'pageBufferSize')(pages));
	}
};

export const receiveEntities = (entityType, error) => {
	return function(dispatch){
		dispatch(makeActionCreator(`RECEIVE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'receivedAt', 'error')(Date.now(), error));
	}
}

export const requestEntities = (entityType) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REQUEST_${entityType.toUpperCase()}`, entityType.toUpperCase())());
	}
}

export const setNextPageURL = (entityType, URL) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SET_NEXT_${entityType.toUpperCase()}_PAGE_URL`, entityType.toUpperCase(), 'nextPageURL')(URL));
	}
}

export const setPrevPageURL = (entityType, URL) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SET_PREV_${entityType.toUpperCase()}_PAGE_URL`, entityType.toUpperCase(), 'prevPageURL')(URL));
	}
}

export const setCurrentEntityPage = (entityType, page) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SET_CURRENT_${entityType.toUpperCase()}_PAGE`, entityType.toUpperCase(), 'currentPage')(page));
	}
}

export const setEntityScrollPageHeight = (entityType, scrollPageHeight) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SET_${entityType.toUpperCase()}_SCROLL_PAGE_HEIGHT`, entityType.toUpperCase(), 'scrollPageHeight')(scrollPageHeight));
	}
}



//========CLIENT INVALIDATION ACTIONS========

//add specified entityIds to the clientInvalidated Leaf of entitiesStateReducer
export const clientDeleteEntities = (entityType, entityIds=[]) => {
	return function(dispatch){
		dispatch(makeActionCreator(`CLIENT_DELETE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'ids')(entityIds));
	}
};
//Remove specified entityIds from the clientInvalidated Leaf of entitiesStateReducer
export const removeClientDeleteEntities = (entityType, entityIds=[]) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REMOVE_CLIENT_DELETE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'ids')(entityIds));
	}
};
//Remove all entityIds from the clientInvalidated Leaf of entitiesStateReducer
export const clearClientDeleteEntities = (entityType) => {
	return function(dispatch){
		dispatch(makeActionCreator(`CLEAR_CLIENT_DELETE_${entityType.toUpperCase()}`, entityType.toUpperCase())());
	}
};


//========SERVER INVALIDATION ACTIONS========

//add specified entityIds to the serverInvalidation Leaf of entitiesStateReducer
export const serverInvalidateEntities = (entityType, entityIds=[]) => {
	return function(dispatch){
		dispatch(makeActionCreator(`SERVER_INVALIDATE_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'ids')(entityIds));
	}
};
//Remove specified entityIds from the serverInvalidated Leaf of entitiesStateReducer
export const removeServerInvalidation = (entityType, entityIds=[]) => {
	return function(dispatch){
		dispatch(makeActionCreator(`REMOVE_SERVER_INVALIDATION_${entityType.toUpperCase()}`, entityType.toUpperCase(), 'ids')(entityIds));
	}
};
//Remove all entityIds from the serverInvalidated Leaf of entitiesStateReducer
export const clearServerInvalidation = (entityType) => {
	return function(dispatch){
		dispatch(makeActionCreator(`CLEAR_SERVER_INVALIDATION_${entityType.toUpperCase()}`, entityType.toUpperCase())());
	}
};


//========ENTITY PROPERTIES MODIFICATION ACTIONS========

//modifiedProperties is of the form {[targetEntityId]:{ ...<properties modified> }}
export const modifyEntityProperties = (entityType, modifiedProperties={} ) => {
	return function(dispatch){
		dispatch(makeActionCreator(`MODIFY_${entityType.toUpperCase()}_PROPERITIES`, entityType.toUpperCase(), 'modifiedProperties')(modifiedProperties));
	}
} 