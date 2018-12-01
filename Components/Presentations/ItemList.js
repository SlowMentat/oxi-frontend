import React from 'react';
import ItemStyles from '../../item.css';
import {Item} from './Item.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export default class ItemList extends React.Component{
	constructor(props){
		super(props)		
		this.state = {
			itemIds: [...props.itemIds],
			addedItemIds: [...props.addedItemIds],
		};
	}

	shouldComponentUpdate(nextProps) {
        const differentItems = this.props.items !== nextProps.items;
        const differentAddedItems = this.props.addedItems !== nextProps.addedItems;
        const differentBrands = this.props.brands !== nextProps.brands;
        const differentRetailers = this.props.retailers !== nextProps.retailers;
        const shouldUpdate = differentItems || differentItems || differentBrands || differentRetailers;
        console.log('should ItemList component updated: ', shouldUpdate);
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
		if(Object.keys(allFilteredItems).length > 0) this.props.populateItemsMap(allFilteredItems);
		/*this.setState({
			itemIds: [...this.props.itemIds],
			addedItemIds: [...this.props.addedItemIds],
		});*/
		return (
		    <div className={ItemStyles.itemMenuBlock}>
		    	<div style={{'height':'calc(5vh + 25px)'}}>
		    	</div>
		    	<div>
		    		<TransitionGroup>
			    		{
			    			this.props.itemIds.map((itemId) => {
			    			//this.state.itemIds.map((itemId) => {
			    				//console.log("itemId [from ItemList] = ", itemId);
			    				return (this.props.items[itemId] === undefined ?
			    					false : 
			    					(			    					
			    						<CSSTransition
			    							key={itemId}
			    							tiemout={200}
			    							classNames="itemInitialize"
			    							onExit={(element) => {console.log(itemId, ' exited.  Element is: ', element)}}
			    							unmountOnExit >
			    							{
			    								(state) => (state === 'unmounted' ? null : (<Item 
			    									key={itemId}
			    									item={this.props.items[itemId]} 
			    									onClick={this.props.onClick} 
			    									brands={this.props.brands} 
			    									retailers={this.props.retailers}
			    									itemIdHovered={this.props.itemIdHovered}
			    									viewState={this.props.viewState}
			    									_handleMouseOver={(event) => this.props.changeItemHovered(itemId, event)}
			    									_handleMouseLeave={(event) => this.props.changeItemHovered(null, event)} />))
			    							}
			    						</CSSTransition>
			    					)
			    				);
			    			})
			    		}
			    		{
			    			this.props.addedItemIds.map((itemId) => {
			    			//this.state.addedItemIds.map((itemId) => {
			    				//console.log("itemId [from addedItemList] = ", itemId);
			    				return (this.props.addedItems[itemId] === undefined ? 
			    					null : 
			    					(
			    						<CSSTransition
			    							key={itemId}
			    							tiemout={200}
			    							classNames="itemInitialize"
			    							unmountOnExit >
			    							{
			    								(state) => (state === 'unmounted' ? null : (<Item 
			    									item={this.props.addedItems[itemId]}
			    									onClick={this.props.onClick} 
			    									brands={this.props.brands} 
			    									retailers={this.props.retailers}
			    									itemIdHovered={this.props.itemIdHovered}
			    									viewState={this.props.viewState}
			    									_handleMouseOver={(event) => this.props.changeItemHovered(itemId)}
			    									_handleMouseLeave={(event) => this.props.changeItemHovered(null)} />))
			    							}
			    						</CSSTransition>
			    					));
			    			})
			    		}
			    	</TransitionGroup>
		    	</div>
		    </div>
		);
	}
}