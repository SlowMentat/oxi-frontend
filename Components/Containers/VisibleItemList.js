import { connect } from 'react-redux';
import { setFormVisibility, createItem, updateItem } from '../../Components/Actions/indexActions.js';
import ItemList from '../../Components/Presentations/ItemList.js';

const getVisibleItems = (items, joinTable, filter, selectedContentId) => {
	let result = {byIds:{}, allIds:[]};
	//Only perform filter on non-empty items object
	if(!(Object.keys(items).length === 0 && items.constructor === Object)){
		switch(filter){
			case 'SHOW_ALL':
			case 'BY_TYPE':
				return items.filter(item => item.type = data);
			case 'BY_SIZE':
				return items.filter(items => item.size = data);
			/*case 'BY_SOURCE':
				return items.filter(items => item. = data);*/
			case 'BY_CONTENT_ID':
				let itemIds = [];
				console.log("jointable");
				console.log(joinTable);
				let joinTableKeys = Object.keys(joinTable);
				console.log("join table keys");
				console.log(joinTableKeys);
				//only filter by content id if joinTable is not and EMPTY object
				if(!(joinTableKeys.length === 0 && joinTable.constructor === Object)){
					for(let key of joinTableKeys){
						//get all item ids from join table where content ids = contentId
						console.log("key");
						console.log(key);
						console.log("selected content")
						console.log(selectedContentId)
						if(joinTable[key]["contentId"] == selectedContentId) itemIds.push(joinTable[key]["itemId"]);
					}
					console.log("items");
					console.log(items);
					//Convert items to array of Objects
					let itemsArray = Object.values(items);
					//filter items that match ids in itemIds
					console.log("itemIds");
					console.log(itemIds);
/*
					itemsArray.filter(item => {
						for(let i of itemIds){
							if(item.id == i) return true;
							return false;
						}
					});
					console.log("itemsArray");
					console.log(itemsArray);*/
					//reconstruct filtered items ovbject from itemsArray
					let filteredItems = {};
					for(let id of itemIds){
						filteredItems[id] = items[id];
					}
					/*for (let item of itemsArray){
						filteredItems[item.id] = item;
					}*/
					console.log("filteredItems = ");
					console.log(filteredItems);
					return filteredItems;
				}else{
					return items;
				}
			default:
				return items;
		}
	}
	return items;
}

const mapStateToProps = state => {
	return ({
		items : getVisibleItems(
			state.entitiesReducer.items.byIds, 
			state.entitiesReducer.itemContent.byIds,
			'BY_CONTENT_ID',
			state.entitiesReducer.contents.selected
		),
		//items : state.entitiesReducer.items.byIds,
		itemIds : state.entitiesReducer.items.allIds 
	});
}

const mapDispatchToProps = dispatch => ({
	onClick : () => {dispatch(setFormVisibility("UpdateItem"))}
})

const VisibleItemList = connect(mapStateToProps, mapDispatchToProps)(ItemList);
export default VisibleItemList;