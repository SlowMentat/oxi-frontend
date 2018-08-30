import { connect } from 'react-redux';
import { setFormVisibility, createItem, updateItem } from '../../Components/Actions/indexActions.js';
import ItemList from '../../Components/Presentations/ItemList.js';

/*const getVisibleItems = (items, joinTable, filter, selectedContentId) => {
	let result = {byIds:{}, allIds:[]};
	//Only perform filter on non-empty items object
	if(!(Object.keys(items).length === 0 && items.constructor === Object)){
		switch(filter){
			case 'SHOW_ALL':
			case 'BY_TYPE':
				return items.filter(item => item.type = data);
			case 'BY_SIZE':
				return items.filter(items => item.size = data);
			//case 'BY_SOURCE':
			//	return items.filter(items => item. = data);
			case 'BY_CONTENT_ID':
				let itemIds = [];
				let joinTableKeys = Object.keys(joinTable);
				//only filter by content id if joinTable is not and EMPTY object
				if(!(joinTableKeys.length === 0 && joinTable.constructor === Object)){
					for(let key of joinTableKeys){
						//get all item ids from join table where content ids = contentId
						if(joinTable[key]["contentId"] == selectedContentId) itemIds.push(joinTable[key]["itemId"]);
					}
					//filter items that match ids in itemIds
					let filteredItems = {};
					for(let id of itemIds){
						filteredItems[id] = items[id];
					}
					console.log("filteredItems = ");
					console.log(filteredItems);
					return filteredItems;
				}else{
					return items;
				}
			default:
				return items;
		}
	}else if(selectedContentId === false){
		return
	}
	return items;
}*/

const getVisibleItems = (items, filter, contents) => {
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
				return items.filter(items => item.size = data);
			/*case 'BY_SOURCE':
				return items.filter(items => item. = data);*/
			case 'BY_CONTENT_ID':
				if(contents != undefined){
					console.log("contents =");
					console.log(contents)
					if(contents.selected != undefined){
						if(contents.selected != false){
							//array of content ids
							result.allIds = contents.byIds[contents.selected]["items"].sort();
							for(let itemId of result.allIds){
								result.byIds[itemId] =  itemsById[itemId];
							}
							//result.allIds = Object.keys(result.byIds);
							console.log("result");
							console.log(result);
							return Object.assign({}, items, result);	
						}else{
							console.log("contents.selected is false");
						}				
					}else{
						console.log("contents.selected is undefined");
					}
				}else{
					console.log("contents is undefined");
				}
			default:
				return Object.assign({}, items, result);
		}
	}else if(selectedContentId === false){
		return
	}
	return items;
}

const mapStateToProps = state => {
	let filteredItems = getVisibleItems(
		state.entitiesReducer.items,
		'BY_CONTENT_ID',
		state.entitiesReducer.contents
	);
	let filteredAddedItems = getVisibleItems(
		state.addedEntitiesReducer.items,
		'BY_CONTENT_ID',
		state.addedEntitiesReducer.contents
	);
	return ({
		items : filteredItems.byIds,
		itemIds : filteredItems.allIds,//state.entitiesReducer.items.allIds 
		addedItems : filteredAddedItems.byIds,
		addedItemIds : filteredAddedItems.allIds
	});
}

const mapDispatchToProps = dispatch => ({
	onClick : () => {console.log("dispatching setFormVisibility for UpdateItme"); dispatch(setFormVisibility("UpdateItem"));}
})

const VisibleItemList = connect(mapStateToProps, mapDispatchToProps)(ItemList);
export default VisibleItemList;