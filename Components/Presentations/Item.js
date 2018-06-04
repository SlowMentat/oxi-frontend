import React from 'react';
import ItemStyles from '../../item.css';


const Item = ({id, type, link, size}, onClick) => {
	console.log(size)
	return(			
		<div className={ItemStyles.itemContainer}>
			<div className={ItemStyles.itemSizeBlock}>
				{size}
			</div>
			<div className={ItemStyles.itemTypeBlock}>	
				{type}
			</div>
			<div className={ItemStyles.itemImageBlock}>
				{id}
				<img src=""/>
			</div>
		</div>		
	);
}

export default Item;