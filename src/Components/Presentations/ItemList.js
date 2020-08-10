import React from 'react';
import ItemStyles from '../../item.scss';
import {Item} from './Item.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import {SvgIcon} from '../SvgAssets/SvgIcon.js';

export default class ItemList extends React.Component{
	constructor(props){
		super(props)		
		this.state = {
			itemIds: [...props.itemIds],
			addedItemIds: [...props.addedItemIds],
			expandedItemId: false,
			sizeGroupIndLUT:{},
			loaded: false,
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
        const differentItems = this.props.items !== nextProps.items;
        const differentAddedItems = this.props.addedItems !== nextProps.addedItems;
        const differentBrands = this.props.brands !== nextProps.brands;
        const differentRetailers = this.props.retailers !== nextProps.retailers;
        const diffExpandedItemId = this.state.expandedItemId !== nextState.expandedItemId;
        const shouldUpdate = differentItems || differentItems || differentBrands || differentRetailers || diffExpandedItemId;
        //console.log('should ItemList component updated: ', shouldUpdate);
        return differentItems || differentItems || differentBrands || differentRetailers || diffExpandedItemId;
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
		//console.log('items = ', this.props.items)
		//console.log('addedItems = ', this.props.addedItems)
		let allFilteredItems = Object.assign({}, this.props.items, this.props.addedItems);
		//console.log('allFilteredItems = ', allFilteredItems);
		//console.log('this.props.populateItemsMap = ', this.props.populateItemsMap);
		//console.log('Object.keys(allFilteredItems) = ', Object.keys(allFilteredItems))
		//console.log('Object.keys(allFilteredItems).length = ', Object.keys(allFilteredItems).length)
		if(Object.keys(allFilteredItems).length > 0) this.props.populateItemsMap ? this.props.populateItemsMap(allFilteredItems) : null;
		//if(Object.keys(allFilteredItems).length > 0){
			/*console.log('>>> this.props.visibleItemsMap = ', this.props.visibleItemsMap.visibleItemsByIds);
			console.log('>>> allFilteredItems = ', allFilteredItems);
			this.props.populateItemsMap(allFilteredItems);
			if(Object.keys(this.props.visibleItemsMap.visibleItemsByIds).length !== Object.keys(allFilteredItems).length){
				//this.props.populateItemsMap(allFilteredItems);
			}*/
		//}
		/*this.setState({
			itemIds: [...this.props.itemIds],
			addedItemIds: [...this.props.addedItemIds],
		});*/
		let itemControl;
		//let sizeGroupIndLUT = {};
//
		//// If item is a retailer item add sizechartDto id/index mapping
		//const buildSizeGroupIndLUT =  (item) => {
		//	if(item && item.platform !== OxiAppConstants.PLATFORM && this.state.sizeGroupIndLUT[item.sizeGroupId] === undefined){
		//		var { sizeGroupDtos } = item.sizeChartDto;
		//		sizeGroupDtos.map((sgId, ind) => {sgId === item.sizeGroupId ? (sizeGroupIndLUT[item.sizeGroupId] = ind) : null} );  
		//		this.setState(prevState => ({
		//			...prevState,
		//			sizeGroupIndLUT
		//		}));
		//	}
		//}

		return (
		    <div className={ItemStyles.itemBlock}>
		    	<div style={{'height':'60px'}}>
		    		<div className={ItemStyles.itemMenuHeaderContainer}>
		    			<div className={ItemStyles.itemMenuHeader}>
		    				<div className={ItemStyles.itemMenuHeaderIconContainer}>
		    					{this.props.multipleSelectedAllIds.length === 0 ? 
		    						null : 
		    						this.props.viewState === OxiAppConstants.viewState.PREVIEW ? 
		    							null : 
		    							<SvgIcon 
		    								name="DeleteIcon"
		    								onClick={() => {
		    									this.props.deleteItem(this.props.multipleSelectedAllIds, this.props.selectedContent);
		    									
		    									//preemptively remove the selected item ids from the item array property of this.props.selectedContent reference
		    									let updatedItems = this.props.selectedContent.items.filter(id => {
		    										for(let removedId of this.props.multipleSelectedAllIds){
		    											if(removedId === id) return false;
		    										}
		    										return true;
		    									});
		    									//this.props.clientInvalidateItems(updatedItems);
		    								}}/>
		    					}
		    				</div>
		    			</div>
		    		</div>
		    	</div>
				<div 
					className={ItemStyles.itemsContainer_div}
					//style={{height: this.props.imageHeight}} 
				>
		    		<div style={{position:'relative', height:'100%'}}>
		    			<TransitionGroup component={null}>
			    			{
			    				this.props.itemIds.map((itemId, ind) => {
			    				//this.state.itemIds.map((itemId) => {
			    					//console.log("itemId [from ItemList] = ", itemId);
	
			    					//var item = this.props.items[itemId];
			    					//buildSizeGroupIndLUT(item);
	
			    					return (this.props.items[itemId] === undefined ?
			    						false : 
			    						(			    					
			    							<CSSTransition
			    								key={itemId}
			    								timeout={200}
			    								classNames="itemInitialize"
			    								onExit={(element) => {console.log(itemId, ' exited.  Element is: ', element)}}
			    								unmountOnExit >
			    								{
			    									(state) => (state === 'unmounted' ? 
			    										null : 
			    										( <Item 
			    											key={itemId}
			    											index={ind}
			    											item={this.props.items[itemId]} 
			    											selectedAllIds={this.props.multipleSelectedAllIds}
			    											selectedId={this.props.selectedId}
			    											onSelect={this.props.createHandleMulSel(itemId)} 
			    											onDeselect={this.props.createHandleMulDesel(itemId)}
			    											brands={this.props.brands} 
			    											retailers={this.props.retailers}
			    											itemIdHovered={this.props.itemIdHovered}
			    											webAppView={this.props.webAppView}
			    											browseSelection={this.props.browseSelection}
			    											viewState={this.props.viewState}
			    											_handleMouseOver={(event) => this.props.changeItemHovered(itemId, event)}
			    											_handleMouseLeave={(event) => this.props.changeItemHovered(null, event)}
			    											apparelTypeByIds={this.props.apparelTypeByIds}
			    											saveItem={this.props.saveItem}
			    											unsaveItem={this.props.unsaveItem}
			    											isSaved={this.props.savedItemMap[itemId.toUpperCase()] !== undefined}
			    											expandItem={(id) => {
			    												this.setState(prevState => ({
			    													...prevState, 
			    													'expandedItemId': id,
			    												}));

			    												this.props.hideHeader(true);
			    												this.props.hideControls(true);
			    											}}
			    											collapseItem ={() => {
			    												this.setState(prevState => ({
			    													...prevState, 
			    													'expandedItemId': false,
			    												}));

			    												this.props.hideHeader(false);
			    												this.props.hideControls(false);
			    											}}
			    											isExpanded={this.state.expandedItemId === itemId}
			    											expandedViewState={this.state.expandedItemId !== false}
			    											//sizeGroupIndLUT={this.state.sizeGroupIndLUT}
			    											compareMetrics={this.props.compareMetrics}
			    											sizeGroups={this.props.sizeGroups}
			    											getCoverPic={this.props.getCoverPic} 
															toggleMetricPanel={this.props.toggleMetricPanel} 
															deleteItem={this.props.deleteItem}
															selectedContent={this.props.selectedContent}
														/>) 
			    									)
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
	
			    					//var item = this.props.items[itemId];
			    					//buildSizeGroupIndLUT(item);
	
			    					return (this.props.addedItems[itemId] === undefined ? 
			    						null : 
			    						(
			    							<CSSTransition
			    								key={itemId}
			    								tiemout={200}
			    								classNames="itemInitialize"
			    								unmountOnExit >
			    								{
			    									(state) => (state === 'unmounted' ? 
			    										null : 
			    										(<Item 
			    											item={this.props.addedItems[itemId]}
			    											selectedAllIds={this.props.multipleSelectedAllIds}
			    											selectedId={this.props.selectedId}
			    											onSelect={this.props.createHandleMulSel(itemId)} 
			    											onDeselect={this.props.createHandleMulDesel(itemId)}
			    											brands={this.props.brands} 
			    											retailers={this.props.retailers}
			    											itemIdHovered={this.props.itemIdHovered}
			    											viewState={this.props.viewState}
			    											webAppView={this.props.webAppView}
			    											browseSelection={this.props.browseSelection}
			    											_handleMouseOver={(event) => this.props.changeItemHovered(itemId)}
			    											_handleMouseLeave={(event) => this.props.changeItemHovered(null)} 
			    											apparelTypeByIds={this.props.apparelTypeByIds}
			    											expandItem={(id) => {
			    												this.setState(prevState => ({
			    													...prevState, 
			    													'expandedItemId': id,
			    												}));
			    											}}
			    											collapseItem ={() => {
			    												this.setState(prevState => ({
			    													...prevState, 
			    													'expandedItemId': false,
			    												}));
			    											}}
			    											isExpanded={this.state.expandedItemId === itemId}
			    											sizeGroupIndLUT={this.state.sizeGroupIndLUT}
			    											compareMetrics={this.props.compareMetrics}
			    											expandedViewState={this.state.expandedItemId !== false}
			    											sizeGroups={this.props.sizeGroups}
			    											getCoverPic={this.props.getCoverPic} 
															toggleMetricPanel={this.toggleMetricPanel} 
															hideHeader={this.props.hideHeader}
															hideControls={this.props.hideControls} 
															deleteItem={this.props.deleteItem}
															selectedContent={this.props.selectedContent}
														/>))
			    								}
			    							</CSSTransition>
			    						));
			    				})
			    			}
			    		</TransitionGroup>
		    		</div>
		    	</div>
		    </div>
		);
	}
}