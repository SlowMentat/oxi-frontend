import React from 'react';
import PropTypes from 'prop-types';
import AsSeenOnStyles from '../../itemAsSeenOnList.scss';

//Presentation Component 
import PagedList from './PagedList.js';
import PagedListContainer from '../../Components/Containers/PagedListContainer.js'

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

import  '@rmwc/ripple/styles';
import { Ripple } from '@rmwc/ripple';

import styled from 'styled-components';
import { Image } from '../../Components/Presentations/Image.js';

import { 
	Button, 
	IconButton 
} from '../../Components/Presentations/FitseeUI/Buttons/index.js'; 

import {SvgIcon} from '../SvgAssets/SvgIcon.js';




class ItemAsSeenOnControls extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			areControlsShown: false,
		}

		this.timer = null;
	}

	showControls(){
		this.setState(prevState => ({
			...prevState,
			areControlsShown: true,
		}));
	}

	hideControls(){
		this.setState(prevState => ({
			...prevState,
			areControlsShown: false,
		}));
	}

	render(){
		// Methods
		const {
			handleViewOutfit,
			handleViewMeasurements,
		} = this.props;

		// Variables
		const {
			children,
		} = this.props;

		return(
			<div 
				style={{
					width: 'inherit',
					height: 'inherit',
					position: 'relative',
				}}
				onClick={e => {
					// Do nothing if desktop
					if(isDevice){
						this.showControls();

						// Clear hide ctrls timer if exists
						if(this.timer) clearTimeout(this.timer);

						// Set timer to hide controls
						this.timer = setTimeout(() => {this.hideControls()}, 2000);
					}
					e.stopPropagation();
				}}
				onMouseOver={e => {
					// Do nothing if mobile
					if(!isDevice){
						this.showControls();
					}
				}}
				onMouseOut={e => {
					// Do nothing if mobile
					if(!isDevice){
						this.hideControls();
					}
				}}
			>
				{children}
				<CSSTransition
					tiemout={600}
					classNames="itemAsSeenOnControls"
					in={this.state.areControlsShown} 
					//className={
					//	this.state.isControlShown ? 
					//		AsSeenOnStyles['itemAsSeenOnControls_div'] : 
					//		AsSeenOnStyles['itemAsSeenOnControlsShown_div']
					//}
					//style={{
					//	...(
					//		this.state.areControlsShown ? 
					//		{
					//			display: 'flex'
					//		} : 
					//		{
					//			display: 'none'
					//		}
					//	)
					//}}
				>
					<div 
						className={AsSeenOnStyles.itemAsSeenOnControls}
					>
						<div
							onClick={e => {
								if(this.state.areControlsShown) handleViewMeasurements();
							}}
						>
							<IconButton
								style={{color:'black'}}
								icon={
									<SvgIcon
										name="MeasureIcon"
										stroke="#000"
										strokeWidth="2"
										//style={{color:'black'}}
									/>
								}
								ripple={false}
							/>
						</div>
						<div
							onClick={e => {
								if(this.state.areControlsShown) handleViewOutfit();
							}}
						>
							<IconButton
								icon="visibility"
								class="material-icons-outlined"
								style={{color:'black'}}
								ripple={false}
							/>
						</div>
					</div>
				</CSSTransition>
			</div>
		);
	}
}

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
					<ItemAsSeenOnControls
						handleViewOutfit={
							(event) => {
								this.props.previewOutfitFromBrowse(this.props.outfitId ? this.props.outfitId.toLowerCase() : this.props.outfitId);
								event.stopPropagation();
							}
						}
						handleViewMeasurements={
							(event) => {
								this.props.getHostMeasurements(this.props.outfitId);
								this.props.toggleMetricPanel(event, true);
								event.stopPropagation();
							}
						}
					>
						<div 
							className={AsSeenOnStyles.imageContainer_div}
							style={{'background-color': '#f0f0f0'}}
						>
							<Image
								src={this.state.base64Image === null ? (OxiAppConstants.ContentDirectories.IMAGES + "/no_image.svg") : (this.state.base64Image)} 
								className={AsSeenOnStyles.imageApparel_img}
								imgLoaded={this.state.imgLoaded}
								onLoad={e => {
									this.setState(prevState => ({...prevState, imgLoaded: true,}));								
								}}
							/>
						</div>
					</ItemAsSeenOnControls>
				</div>
			</div>
		);
	}
}

const AsSeenOnPagedList = ({className, ...props}) => (	
   	<PagedListContainer
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
   					toggleMetricPanel={props.toggleMetricPanel}
   					getHostMeasurements={props.getHostMeasurements}
				/>
			);
		}))} 
   	/>
);

const StyledAsSeenOnPagedList = styled(AsSeenOnPagedList)`
	margin-top: 7px;
	padding-top: 0px;
	margin-bottom: 0px;
	overflow: auto;
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
    		</CSSTransition>
		);
	}
}

export default ItemAsSeenOnList;