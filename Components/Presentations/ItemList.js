import React from 'react';
import ItemStyles from '../../item.css';
import Item from './Item.js'

const ItemList = ({itemIds = [], items = {}, addedItemIds = [], addedItems = {}, onClick}) => {
	/*let itemKeys = Object.keys(items)
	let idArray = itemIds;
	//modify the idArray to be in agreement with provided items object
	if(itemIds.length != itemKeys.length){
		idArray = itemKeys;
	}*/
	return (
	    <div className={ItemStyles.itemMenuBlock}>
	    	{
	    		itemIds.map((itemId) => {
	    			console.log("itemId [from ItemList]");
	    			console.log(itemId);
	    			return <Item {...items[itemId]} onClick={onClick}/>
	    		})
	    	}
	    	{
	    		addedItemIds.map((itemId) => {
	    			console.log("itemId [from ItemList]");
	    			console.log(itemId);
	    			return <Item {...addedItems[itemId]} onClick={onClick}/>
	    		})
	    	}
	    </div>
	);
}

export default ItemList;