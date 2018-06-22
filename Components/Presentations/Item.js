import React from 'react';
import ItemStyles from '../../item.css';


const Item = ({id, type, link, size}, onClick) => {
	const linkFavicon = "https://www.google.com/s2/favicons?domain=" + link;
	console.log(linkFavicon);
	return(			
		<div className={ItemStyles.itemContainer}>
			<div className={ItemStyles.itemSizeBlock}>
				{size}
			</div>
			<div className={ItemStyles.itemTypeBlock}>	
				{type}
			</div>
			<div className={ItemStyles.itemImageBlock}>
				<img src={linkFavicon}/>
			</div>
		</div>		
	);
}

export default Item;