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

import styled from 'styled-components';
import { desktopRules, mobileRules } from '../../mixin.js';

import { ListLoadProgress } from '../../Components/Presentations/FitseeUI/ListLoadProgress.js';

const PagedItemListBrowse = ({className, ...props}) => (
	<PagedListContainer
		id={OxiAppConstants.PageListIds.a}
		className={className}
		//pageBufferSize={props.pageBufferSize}
		currentPage={props.currentPage}
		lastPage={props.lastPage}
		isFetching={props.isFetching}
		prevPageURL={props.prevPageURL}
		nextPageURL={props.nextPageURL}
		setScrollPageHeight={props.setScrollPageHeight}
		scrollPageHeight={props.scrollPageHeight}
		setCurrentEntityPage={props.setCurrentEntityPage}
		pages={props.pages}
		setNextPageURL={props.setNextPageURL}
		setPrevPageURL={props.setPrevPageURL}
		list={
		<React.Fragment>
			<div 
				className={ItemStyles.itemListBrowseContainer_div}
			>
				<TransitionGroup
					style={!isDevice ? {
						display: 'flex',
    					'flex-wrap': 'wrap',
    					'justify-content': 'space-around',
					} : {}}
				>
			   		{
			   			props.itemIds.map((itemId) => {
			   			//this.state.itemIds.map((itemId) => {
			   				//console.log("itemId [from ItemList] = ", itemId);
			   				return (props.items[itemId] === undefined ?
			   					false : 
			   					(			    					
			   						<CSSTransition
			   							key={itemId}
			   							tiemout={200}
			   							classNames="itemBrowseInitialize"
			   							onExit={(element) => {console.log(itemId, ' exited.  Element is: ', element)}}
			   							unmountOnExit 
			   						>
			   							{
			   								(state) => (state === 'unmounted' ? null : (
			   									<ItemBrowse
			   										key={itemId}
			   										item={props.items[itemId]} 
			   										picture={props.pictures[props.items[itemId].pictureId]}
			   										selectedAllIds={props.multipleSelectedAllIds}
			   										onSelect={props.createHandleMulSel} 
			   										onDeselect={props.createHandleMulDesel}
			   										clearSelectMultipleEntity={props.clearSelectMultipleEntity}
			   										brands={props.brands} 
			   										retailers={props.retailers}
			   										itemIdHovered={props.itemIdHovered}
			   										webAppView={props.webAppView}
			   										browseSelection={props.browseSelection}
			   										_handleMouseOver={(event) => props.changeItemHovered(itemId, event)}
			   										_handleMouseLeave={(event) => props.changeItemHovered(null, event)}
			   										getContentsByItemId={() => props.getContentsByItemId(itemId)}
			   										removeContentEntities={props.removeContentEntities}
			   										removeAuxContentEntities={props.removeAuxContentEntities}
			   										getCoverPic={props.getCoverPic}
			   										toggleMetricPanel={props.toggleMetricPanel}
			   									/>
			   								))
			   							}
			   						</CSSTransition>
			   					)
			   				);
			   			})
			   		}
					{/*<ListLoadProgress isShown={props.isFetching}/>*/}
			   	</TransitionGroup>
			</div>
		</React.Fragment>
	} />
);

const StyledPagedItemListBrowse = styled(PagedItemListBrowse)`
	${desktopRules(`
		padding-top: 50px;
	`)}
	
	${mobileRules(`
		padding-top: var(--mobile-page-header-height);
		background-color: var(--main-background-color);
	`)}	
`;

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
			<StyledPagedItemListBrowse {...{className: this.props.scrollContainerStyle, ...this.props}}/>
		);
	}
}