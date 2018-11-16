import React from 'react';
import {OxiAppConstants} from './OxiAppConstants.js';


/*export const maskEdits = (entities, idsEditting) => {
	let filteredByIds = {};
	if(idsEditting.length > 0){
		filteredByIds = Object.keys(entities.byIds).reduce((result, value, key) => {
			for(let id of idsEditting){
				console.log('id: ', id, ', key: ', key);
				if(key !== id){
					result[key] = entities.byIds[key];
				}
			}
			return result;
		}, {});
	}else{
		filteredByIds = entities.byIds;
	}
	console.log('filteredByIds = ', filteredByIds);
	return Object.assign({}, entities, {byIds:filteredByIds, allIds:Object.keys(filteredByIds)});
}*/

export const maskEdits = (entities, idsEditting) => {
	let filteredEntities = Object.assign({}, entities, {byIds: {...entities.byIds}});
	console.log('maskEdits:  entities = ', entities);
	if(idsEditting.length > 0){
		const result = filteredEntities.allIds.filter(entityKey => {
			for(let id of idsEditting){
				if(entityKey == id){
					delete filteredEntities.byIds[id];
					return false;
				}
			}
			return true;
		});
		filteredEntities.allIds = result;
	}
	console.log('filteredEntities = ', filteredEntities);
	return filteredEntities;
}