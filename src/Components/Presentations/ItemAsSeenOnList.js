import React from 'react';
import PropTypes from 'prop-types';
import AsSeenOnStyles from '../../itemAsSeenOnList.scss';

//Presentation Component 
import PagedList from './PagedList.js';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

import  '@rmwc/ripple/styles';
import { Ripple } from '@rmwc/ripple';

import styled from 'styled-components';
import { Image } from '../../Components/Presentations/Image.js';


class ItemAsSeenOn extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			coverpicuri: null,
			base64Image: null,
			imgLoaded: false,
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

		const {
			navToHostProfile
		} = this.props;

		var {
			username,
			likes,
			following,
		} = this.props.contentWithOutfit;

		return(			    				
			<div 
				className={AsSeenOnStyles.itemAsSeenOnContainer_div} 
				>
				<div
					className={AsSeenOnStyles.itemAsSeenOn_div} 
				>
					<Ripple>
						<div 
							className={AsSeenOnStyles.imageContainer_div}
							style={{'background-color': '#f0f0f0'}}
						>
							{/*<img 
								className={AsSeenOnStyles.imageApparel_img} 
								src={this.state.base64Image === null ? (OxiAppConstants.ContentDirectories.IMAGES + "/no_image.svg") : (this.state.base64Image)} 
								onClick={(event) => {
									this.props.previewOutfitFromBrowse(this.props.outfitId ? this.props.outfitId.toLowerCase() : this.props.outfitId);
									event.stopPropagation();
								}}
							/>*/}
							<Image
								src={this.state.base64Image === null ? (OxiAppConstants.ContentDirectories.IMAGES + "/no_image.svg") : (this.state.base64Image)} 
								className={AsSeenOnStyles.imageApparel_img}
								imgLoaded={this.state.imgLoaded}
								onLoad={e => {
									this.setState(prevState => ({...prevState, imgLoaded: true,}));								
								}}
								onClick={(event) => {
									this.props.previewOutfitFromBrowse(this.props.outfitId ? this.props.outfitId.toLowerCase() : this.props.outfitId);
									event.stopPropagation();
								}}
							/>
						</div>
					</Ripple>
				</div>
				{/*<div className={AsSeenOnStyles.infoContainer_div}>
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
				</div>*/}
			</div>
		);
	}
}

const AsSeenOnPagedList = ({className, ...props}) => (	
   	<PagedList
   		id="itemAsSeenOnList"
   		className={className}
   		scrollContainerStyle={AsSeenOnStyles.contentContainer_div}
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
   		list={props.contentIds.map((contentId => {
			return(
				<ItemAsSeenOn 
					previewOutfitFromBrowse={props.previewOutfitFromBrowse}
					contentId={contentId}
					outfitId={ props.contents[contentId].outfitId }
					contentWithOutfit = {props.contents[contentId]}
   					prevPageURL={props.prevPageURL}
   					nextPageURL={props.nextPageURL}
   					coverpicuri={
   						(props.pictures[ props.contents[contentId].picture ] !== undefined) ? 
   							props.pictures[ props.contents[contentId].picture ].smalluri :
   								props.contents[contentId].coverpicuri !== undefined ?
   									props.contents[contentId].coverpicuri :
   									null
   						}
   					getCoverPic={props.getCoverPic}
				/>
			);
		}))} 
   	/>
);

const StyledAsSeenOnPagedList = styled(AsSeenOnPagedList)`
	margin-top: 7px;
	padding-top: 0px;
	margin-bottom: 10px;
`;

class ItemAsSeenOnList extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
	
			<CSSTransition
				//key={selectedItemId}
				timeout={500}
				classNames="contentContainer_div"
				in={true}
				unmountOnExit 
			>
				<StyledAsSeenOnPagedList
					{
						...{
								className: AsSeenOnStyles.contentContainer_div,
								...this.props,
						}
					}
				/>
    			{/*<PagedList
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
								previewOutfitFromBrowse={this.props.previewOutfitFromBrowse}
								contentId={contentId}
								outfitId={ this.props.contents[contentId].outfitId }
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
    			/>*/}
    		</CSSTransition>
		);
	}
}

export default ItemAsSeenOnList;