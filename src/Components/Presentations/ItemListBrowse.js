import React from 'react';

//Container Component 
import PagedListContainer from '../../Components/Containers/PagedListContainer.js';

//Presentation Component
import {Item, ItemBrowse, ItemBrowseInfo} from './Item.js';
import PagedList from './PagedList.js';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import {SvgIcon} from '../SvgAssets/SvgIcon.js';
import ItemStyles from '../../itemBrowse.scss';



export default class ItemListBrowse extends React.Component{
	constructor(props){
		super(props)		
		this.state = {
			itemIds: [...props.itemIds]
		};
	}

	render(){
		console.log('items = ', this.props.items)
		console.log('multipleSelectedAllIds * = ', this.props.multipleSelectedAllIds)
		return (
    		<PagedListContainer
    			id="itemListBrowse"
    			scrollContainerStyle={this.props.scrollContainerStyle}
    			//pageBufferSize={this.props.pageBufferSize}
    			currentPage={this.props.currentPage}
    			lastPage={this.props.lastPage}
    			isFetching={this.props.isFetching}
    			prevPageURL={this.props.prevPageURL}
    			nextPageURL={this.props.nextPageURL}
    			setScrollPageHeight={this.props.setScrollPageHeight}
    			scrollPageHeight={this.props.scrollPageHeight}
    			setCurrentEntityPage={this.props.setCurrentEntityPage}
    			pages={this.props.pages}
    			setNextPageURL={this.props.setNextPageURL}
				setPrevPageURL={this.props.setPrevPageURL}
    			list={
    			<React.Fragment>
		    		{/*<div style={{'height':'calc(5vh + 25px)'}}>
		    			<div className={ItemStyles.itemMenuHeaderContainer}>
		    				<div className={ItemStyles.itemMenuHeader}>
		    					<div className={ItemStyles.itemMenuHeaderIconContainer}>
		    						{
		    							this.props.multipleSelectedAllIds.length === 0 ? 
		    								null : 
		    								this.props.viewState === OxiAppConstants.viewState.PREVIEW ? 
		    									<SvgIcon 
		    										name="BookmarkIcon"
		    										onClick={() => console.log('bookmark clicked')}
		    									/> : 
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
		    										}}
		    									/>
		    						}
		    					</div>
		    				</div>
		    			</div>
		    		</div>*/}
		    		<div 
		    			className={ItemStyles.itemListBrowseContainer_div}
		    		>
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
					   							classNames="itemBrowseInitialize"
					   							onExit={(element) => {console.log(itemId, ' exited.  Element is: ', element)}}
					   							unmountOnExit >
					   							{
					   								(state) => (state === 'unmounted' ? null : (<ItemBrowse
					   									key={itemId}
					   									item={this.props.items[itemId]} 
					   									selectedAllIds={this.props.multipleSelectedAllIds}
					   									onSelect={this.props.createHandleMulSel} 
					   									onDeselect={this.props.createHandleMulDesel}
					   									clearSelectMultipleEntity={this.props.clearSelectMultipleEntity}
					   									brands={this.props.brands} 
					   									retailers={this.props.retailers}
					   									itemIdHovered={this.props.itemIdHovered}
					   									webAppView={this.props.webAppView}
					   									browseSelection={this.props.browseSelection}
					   									_handleMouseOver={(event) => this.props.changeItemHovered(itemId, event)}
					   									_handleMouseLeave={(event) => this.props.changeItemHovered(null, event)}
					   									getContentsByItemId={() => this.props.getContentsByItemId(itemId)}
					   									removeContentEntities={this.props.removeContentEntities}
					   									getCoverPic={this.props.getCoverPic} />))
					   							}
					   						</CSSTransition>
					   					)
					   				);
					   			})
					   		}
					   	</TransitionGroup>
		    		</div>
    			</React.Fragment>
		    } />	
		);
	}
}