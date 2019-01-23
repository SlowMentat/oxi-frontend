import React from 'react';
import PropTypes from 'prop-types';
import AsSeenOnStyles from '../../itemAsSeenOnList.css';

//Presentation Component 
import PagedList from './PagedList.js';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import {OxiAppConstants} from '../../Util/OxiAppConstants.js';


class ItemSample extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			coverpicuri: null,
			base64Image: null
		};

		this._handleImageReceived = this._handleImageReceived.bind(this);
	}

	componentDidMount(){
		//if coverpicuri filename exists, call get request for content coverpic data
		console.log("coverpicuri = ", this.props.coverpicuri)
		if(this.props.coverpicuri !== null && this.props.coverpicuri !== undefined) this.props.getCoverPic(this.props.coverpicuri, this._handleImageReceived);
	}

	_handleImageReceived(event, data){
		this.setState({
			base64Image: 'data:image/jpeg;base64,' + data
		});
	}

	render(){
		let imageWidth = 65;
		let borderWidth = 2;
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
    					'width': `${imageWidth}px`,
    					'height': `calc(${imageWidth}px*(3/2))`,
    					'border-style': 'solid',
    					'border-color': '#ff5597',
    					'border-radius': '3px',
    					'border-width': `${borderWidth}px`,
					}}>
						<img 
							src={this.state.base64Image === null ? (OxiAppConstants.ContentDirectories.IMAGES + "/no_image.svg") : (this.state.base64Image)} 
							style={{
								width:`calc(${imageWidth} - (${borderWidth}px*2))`,
								height:`calc((${imageWidth}px)*3/2 - (${borderWidth}px*2))`
							}}/>
					</div>
				</div>
				<div style={{
					'display': 'inline-block',
   					'vertical-align': 'top',
   					'margin-left': '30px',
				}}>
					{this.props.contentId}
				</div>
			</div>
		);
	}
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
    						coverpicuri={
    							(this.props.pictures[ this.props.contents[contentId].picture ] !== undefined) ? 
    								this.props.pictures[ this.props.contents[contentId].picture ].smalluri :
    								null
    							}
    						getCoverPic={this.props.getCoverPic}
						/>
					);
				}))} 
    		/>
		);
	}
}

export default ItemAsSeenOnList;