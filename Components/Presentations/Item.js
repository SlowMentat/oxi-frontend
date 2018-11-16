import React from 'react';
import ItemStyles from '../../item.css';

//{id, type, size, retailer, brand}
const Item = ({item, onClick, brands, retailers}) => {
	//const linkFavicon = "https://www.google.com/s2/favicons?domain=" + link;
	//console.log(linkFavicon);
	
	let brandColorStyle = null;
	let brandName = null;
	let brandLink = null;
	let retailerName = null;
	let retailerLink = null;
	/*
	console.log('+++++++++++++++++++++++++++++++++');
	console.log('brands', brands);
	console.log('retailers', retailers);
	console.log('++++++++++++++++++++++++++++++++++');
	console.log('item', item);
	*/
	if(brands !== undefined && brands !== null && item.brand){
		/*console.log("brand id = ", brands)
		console.log('item.brand = ', item.brand)
		console.log('brand[item.brand] = ', brands[`${item.brand}`])*/
		brandName = brands[item.brand].name;
		brandLink = brands[item.brand].link;
		brandColorStyle = {
			'background-image': `linear-gradient(to right, black, black, rgb(${brands[item.brand].red},${brands[item.brand].green},${brands[item.brand].blue}))`
		};
	}
	if(retailers !== undefined && retailers !== null && item.retailer){
		/*console.log("brand id = ", Object.keys(brands))
		console.log('item.brand = ', item.brand)*/
		retailerName = retailers[item.retailer].name;
		retailerLink = retailers[item.retailer].link
	}
	/*
	console.log('brandName = ', brandName);
	console.log('brandLink = ', brandLink);
	console.log('retailerName = ', retailerName);
	console.log('retailerLink = ', retailerLink);
	*/
	return(			
		<div className={ItemStyles.itemContainer}>
			<a className={ItemStyles.itemSizeBlock}>
				{item.type}
			</a>
			<a className={ItemStyles.itemTypeBlock}>	
				{item.size}
			</a>
			<a className={ItemStyles.itemRetailerBlock} href={retailerLink} target="_blank">
				{retailerName}
			</a>
			<a className={ItemStyles.itemBrandBlock} style={brandColorStyle} href={brandLink} target="_blank">
				{brandName}
			</a>
		</div>		
	);
}

export default Item;