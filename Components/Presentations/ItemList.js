import React from 'react';
import ItemStyles from '../../item.css';
import Item from './Item.js'

const ItemList = ({itemIds = [], items = {}, onClick}) => {
	let itemKeys = Object.keys(items)
	let idArray = itemIds;
	if(itemIds.length != itemKeys.length){
		idArray = itemKeys;
	}
	return (
	    <div className={ItemStyles.itemMenuBlock}>
	    	{
	    		idArray.map((itemId) => {
	    			console.log("itemId [from ItemList]");
	    			console.log(itemId);
	    			return <Item {...items[itemId]} onClick={onClick}/>
	    		}
	    	)}
	    </div>
	);
}

export default ItemList;