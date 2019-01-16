import React from 'react';
import {OxiAppConstants} from './OxiAppConstants.js';



/*export const maskEdits = (entities, idsEditting) => {
	let filteredEntities = Object.assign({}, entities, {byIds: {...entities.byIds}});
	console.log('maskEdits:  entities = ', entities);
	if(idsEditting.length > 0){
		let keptObjs = {};
		const result = filteredEntities.allIds.filter(entityKey => {
			for(let id of idsEditting){
				if(entityKey == id){
					//delete filteredEntities.byIds[id];
					const {[id]:removedObj, ...keptObjs} = Object.assign({}, filteredEntities.byIds);
					console.log('removing object: ', removedObj);
					console.log('kept objects: ', keptObjs);
					return false;
				}
			}
			return true;
		});
		console.log('result before assignment = ', result);
		console.log('final keptObjs = ', keptObjs);
		filteredEntities.allIds = result;
		filteredEntities.byIds = keptObjs;
	}
	console.log('filteredEntities = ', filteredEntities);
	return filteredEntities;
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