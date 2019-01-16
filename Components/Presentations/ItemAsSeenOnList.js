import React from 'react';
import PropTypes from 'prop-types';
import AsSeenOnStyles from '../../itemAsSeenOnList.css';

//Presentation Component 
import PagedList from './PagedList.js';

import { TransitionGroup, CSSTransition } from 'react-transition-group';


const ItemSample = (props) => {
	return(
		<div style={{
			'margin-top': '10px',
    		'height': '50px',
		}}>
			<div style={{
				'display': 'inline-block',
    			'width': '50px',
    			'margin-left': '25px',
    			'vertical-align': 'top',
			}}>
				<div style={{
					'position': 'absolute',
    				'width': '50px',
    				'height': '50px',
    				'border-style': 'solid',
    				'border-color': '#ff5597',
    				'border-radius': '3px',
    				'border-width': '2px',
				}}>
				</div>
			</div>
			<div style={{
				'display': 'inline-block',
   				'vertical-align': 'top',
   				'margin-left': '30px',
			}}>
				{props.contentId}
			</div>
		</div>
	);
}

class ItemAsSeenOnList extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
    		<PagedList
    			id="itemAsSeenOnList"
    			scrollContainerStyle={AsSeenOnStyles.contentContainer_div}
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
    			list={this.props.contentIds.map((contentId => {
					return(
						<ItemSample 
							contentId={contentId}
    						prevPageURL={this.props.prevPageURL}
    						nextPageURL={this.props.nextPageURL}
						/>
					);
				}))} 
    		/>
		);
	}
}

export default ItemAsSeenOnList;