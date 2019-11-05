import React from 'react';
import PropTypes from 'prop-types';
import AsSeenOnStyles from '../../itemAsSeenOnList.scss';

//Presentation Component 
import PagedList from './PagedList.js';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import {OxiAppConstants} from '../../Util/OxiAppConstants.js';


class ItemAsSeenOn extends React.Component{
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
		var {
			username,
			likes,
			following,
		} = this.props.contentWithOutfit;

		return(
			<div 
				className={AsSeenOnStyles.itemAsSeenOnContainer_div} >
				<div className={AsSeenOnStyles.itemAsSeenOn_div} >
					<div className={AsSeenOnStyles.imageContainer_div}>
						<img className={AsSeenOnStyles.imageApparel_img/*.image_img*/} src={this.state.base64Image === null ? (OxiAppConstants.ContentDirectories.IMAGES + "/no_image.svg") : (this.state.base64Image)} />
					</div>
				</div>
				<div className={AsSeenOnStyles.infoContainer_div}>
					<div className={AsSeenOnStyles.infoName_div}>
						{ username }
					</div>
					<div className={AsSeenOnStyles.infoSocial_div}>
						<div className={AsSeenOnStyles.infoLikes_div}>
							likes
							<span className={AsSeenOnStyles.infoLikes_span}>
								{ this.props.contentWithOutfit[OxiAppConstants.JsonPropertyNames.LIKE_COUNT].count }
							</span>
						</div>
						<div className={AsSeenOnStyles.infoFollowing_div}>
							Following
							<span className={AsSeenOnStyles.infoFollowing_span}>
								235235
							</span>
						</div>
					</div>
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
						<ItemAsSeenOn 
							contentId={contentId}
							contentWithOutfit = {this.props.contents[contentId]}
    						prevPageURL={this.props.prevPageURL}
    						nextPageURL={this.props.nextPageURL}
    						coverpicuri={
    							(this.props.pictures[ this.props.contents[contentId].picture ] !== undefined) ? 
    								this.props.pictures[ this.props.contents[contentId].picture ].smalluri :
    									this.props.contents[contentId].coverpicuri !== undefined ?
    										this.props.contents[contentId].coverpicuri :
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