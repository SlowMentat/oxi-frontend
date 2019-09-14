import { connect } from 'react-redux';
import { 
	setFormVisibility, 
	createItem, updateItem, 
	selectMultipleEntity, 
	deselectMultipleEntity,
	clientInvalidateEntities,
	clearSelectMultipleEntity,
	removeAddedEntities,
	clientDeleteEntities,
	modifyContent,
	addToMap,
	removeFromMap,
	postSaveItem,
	deleteSavedItem,
	replaceProfile,
	fetchImage,
} from '../../Components/Actions/indexActions.js';
import ItemList from '../../Components/Presentations/ItemList.js';
import {maskEdits} from '../../Util/CommonSelectors.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';


const getVisibleItems = (items, filter, contents, selectedContentIds=[]) => {
	//console.log('getVisibleItems: passed items = ', items);
	let itemsById = items.byIds;
	let result = {byIds:{}, allIds:[]};
	//Only perform filter on non-empty items object
	if(!(Object.keys(items).length === 0 && items.constructor === Object)){
		switch(filter){
			case 'SHOW_ALL':
				return items;
			case 'BY_TYPE':
				return items.filter(item => item.type = data);
			case 'BY_SIZE':
				return items.filter(item => item.size = data);
			/*case 'BY_SOURCE':
				return items.filter(items => item. = data);*/
			case 'BY_CONTENT_ID':
				if(contents != undefined && selectedContentIds.length > 0){
					//console.log("contents =");
					//console.log(contents)
					let mergedItems = null;
					for(let selectedContentId of selectedContentIds){
						if(selectedContentId != undefined && contents.allIds.length > 0){
							if(selectedContentId != false){
								//array of content ids
								if(Object.keys(contents.byIds).length > 0){
									//console.log('contents.byIds[selectedContentId]["items"] = ',contents.byIds[selectedContentId]["items"])
									//console.log('contents.byIds[selectedContentId]["items"].sort() = ',contents.byIds[selectedContentId]["items"].sort())
									result.allIds = [...result.allIds, ...contents.byIds[selectedContentId]["items"]];
								}
								//result.allIds.sort()
								//for(let itemId of result.allIds){
								//	result.byIds[itemId] = itemsById[itemId];
								//}
								////result.allIds = Object.keys(result.byIds);
								////console.log('result', result);
								//mergedItems = Object.assign({}, items, result);	
								////console.log('mergedItems = ', mergedItems);
								//return mergedItems
							}else{
								//console.log("selectedContentId is false");
							}				
						}else{
							//console.log("selectedContentId is undefined");
						}
					}

					result.allIds.sort();

					for(let itemId of result.allIds){
						result.byIds[itemId] = itemsById[itemId];
					}

					//console.log('result', result);
					mergedItems = Object.assign({}, items, result);
					return mergedItems;
					
				}else{
					//console.log("contents is undefined or no content selected");
				}
			default:
				return Object.assign({}, items, result);
		}
	}else if(selectedContentIds === false){
		return
	}
	return items;
}

const mapStateToProps = (state, props) => {
	let brands = state.entitiesReducer.brands.byIds;
	let retailers = state.entitiesReducer.retailers.byIds;

	let filteredAddedItems = getVisibleItems(
		state.addedEntitiesReducer.items, 
		'BY_CONTENT_ID', 
		state.addedEntitiesReducer.contents,
		//state.entitiesStateReducer.contents.selected
		(state.addedEntitiesReducer.outfits.byIds[state.entitiesStateReducer.outfits.selected] ? 
			state.addedEntitiesReducer.outfits.byIds[state.entitiesStateReducer.outfits.selected].contents : 
			[])
	);

	let filteredItems = maskEdits(
		getVisibleItems(
			state.entitiesReducer.items, 
			'BY_CONTENT_ID', 
			state.entitiesReducer.contents, 
			//typeof state.entitiesStateReducer.contents.selected === 'number' ? false : state.entitiesStateReducer.contents.selected
			state.entitiesReducer.outfits.byIds[state.entitiesStateReducer.outfits.selected] ? 
				state.entitiesReducer.outfits.byIds[state.entitiesStateReducer.outfits.selected].contents : 
				[]
		), 
		state.entitiesReducer.items.allEditingIds
	);


	return ({
		items : filteredItems.byIds,
		itemIds : filteredItems.allIds,
		addedItems : filteredAddedItems.byIds,
		addedItemIds : filteredAddedItems.allIds,
		apparelTypeByIds : state.entitiesReducer.apparelTypes.byIds,
		brands : brands,
		retailers : retailers,
		viewState: state.contentViewState.viewState,
		webAppView: state.appView.webAppView,
		multipleSelectedAllIds: state.entitiesStateReducer.items.multipleSelected,
		selectedContent: state.addedEntitiesReducer.contents.byIds[state.entitiesStateReducer.contents.selected],
		savedItemMap: state.cache.savedItemMap,
		sizeGroups: state.entitiesReducer.sizeGroups.byIds,
	});
}

const mapDispatchToProps = dispatch => ({
	onClick : () => {
		console.log("dispatching setFormVisibility for UpdateItme"); dispatch(setFormVisibility("UpdateItem"));
	},
	createHandleMulSel: (id) => () => dispatch(selectMultipleEntity(OxiAppConstants.EntityTypes.ITEM , id)),
	createHandleMulDesel: (id) => () => dispatch(deselectMultipleEntity(OxiAppConstants.EntityTypes.ITEM , id)),
	unsaveItem: (itemId) => { 
		dispatch( deleteSavedItem( itemId ) ); 
	},
	saveItem: (itemId) => {
		dispatch( postSaveItem( itemId ) );
	},
	deleteItem: (selectedAllIds, selectedContent) => {
		dispatch(clientDeleteEntities(OxiAppConstants.EntityTypes.ITEM, selectedAllIds));
		//add selected content to content.clientInvalidated
		///dispatch(clientInvalidateEntities(OxiAppConstants.EntityTypes.CONTENT, [selectedContent.id]));
		//remove items from addedEntitiesReducer corresponding to the id found in items.multipleSelected
		dispatch(removeAddedEntities(OxiAppConstants.EntityTypes.ITEM, selectedAllIds));
		//update content child items to reflect changes
		dispatch(modifyContent({
			id: selectedContent.id,
			items: selectedContent.items.filter(id => {
				for(let removedId of selectedAllIds){
					if(id === removedId) return false;
				}
				return true;
			})
		}));
		//clear items.mulltipleSelected
		dispatch(clearSelectMultipleEntity(OxiAppConstants.EntityTypes.ITEM));
	},
	clientInvalidateItems: (itemIds) => dispatch(clientInvalidateEntities(OxiAppConstants.EntityTypes.ITEM, itemIds)),
	compareMetrics: (metrics) => {
		dispatch(replaceProfile({'host' : {'userMetricsDto': metrics}}));
	},
	getCoverPic : (filename, callback) => dispatch(fetchImage(filename, callback)),
})

const VisibleItemList = connect(mapStateToProps, mapDispatchToProps)(ItemList);
export default VisibleItemList;