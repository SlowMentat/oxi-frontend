import React from 'react';
import ItemStyles from '../../item.css';
import Item from './Item.js'

export default class ItemList extends React.Component{
	constructor(props){
		super(props)		
		this.state = {
			visibleItemIds: []
		};
	}

	shouldComponentUpdate(nextProps) {
        const differentItems = this.props.items !== nextProps.items;
        const differentAddedItems = this.props.addedItems !== nextProps.addedItems;
        const differentBrands = this.props.brands !== nextProps.brands;
        const differentRetailers = this.props.retailers !== nextProps.retailers;
        return differentItems || differentItems || differentBrands || differentRetailers;
    }
	/*let itemKeys = Object.keys(items)
	let idArray = itemIds;
	//modify the idArray to be in agreement with provided items object
	if(itemIds.length != itemKeys.length){
		idArray = itemKeys;
	}*/
	/*
	console.log('**********************************');
	console.log('brands', brands);
	console.log('retailers', retailers);
	console.log('**********************************');
	*/
	render(){
		console.log('items = ', this.props.items)
		console.log('addedItems = ', this.props.addedItems)
		let allFilteredItems = Object.assign({}, this.props.items, this.props.addedItems);
		console.log('allFilteredItems = ', allFilteredItems);
		console.log('this.props.populateItemsMap = ', this.props.populateItemsMap);
		this.props.populateItemsMap(allFilteredItems);
		return (
		    <div className={ItemStyles.itemMenuBlock}>
		    	<div style={{'height':'calc(5vh + 25px)'}}>
		    	</div>
		    	<div>
			    	{
			    		this.props.itemIds.map((itemId) => {
			    			console.log("itemId [from ItemList] = ", itemId);
			    			return (this.props.items[itemId] === undefined ? null : (<Item item={this.props.items[itemId]} onClick={this.props.onClick} brands={this.props.brands} retailers={this.props.retailers}/>));
			    		})
			    	}
			    	{
			    		this.props.addedItemIds.map((itemId) => {
			    			console.log("itemId [from addedItemList] = ", itemId);
			    			return (this.props.addedItems[itemId] === undefined ? null : (<Item item={this.props.addedItems[itemId]} onClick={this.props.onClick} brands={this.props.brands} retailers={this.props.retailers}/>));
			    		})
			    	}
		    	</div>
		    </div>
		);
	}
}