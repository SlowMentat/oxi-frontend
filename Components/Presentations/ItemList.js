import React from 'react';
import ItemStyles from '../../item.css';
import Item from './Item.js'

const ItemList = ({itemIds = [], items = {}, onClick}) => {
	return (
	    <div className={ItemStyles.itemMenuBlock}>
	    	{itemIds.map((itemId) => 
	    		<Item {...items[itemId]} onClick={onClick}/>
	    	)}
	    </div>
	);
}

export default ItemList;