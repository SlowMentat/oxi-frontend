import React from 'react';
import PropTypes from 'prop-types';
import OutfitStyles from '../../outfit.scss';
import {OutfitEditDelete, OutfitTileBrowseCtrls} from './OutfitTileCtrls.js';
import {OutfitSocialStatistics} from './OutfitSocialStatistics.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import { getImageURL } from '../../Util/Misc.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {SvgIcon} from '../SvgAssets/SvgIcon.js';
import { PpIcon } from '../../Components/Presentations/ProfileTitle.js';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import Style from '../../root.scss';
import styled from 'styled-components';

import '@rmwc/icon-button/styles';
import { IconButton } from '@rmwc/icon-button';
import  '@rmwc/ripple/styles';
import { Ripple } from '@rmwc/ripple';
import  '@rmwc/elevation/styles';
import { Elevation } from '@rmwc/elevation';
import { Checkbox } from '../../Components/Presentations/FitseeUI/Checkbox.js';

import { Image } from '../../Components/Presentations/Image.js';

var showOutfitTileControls = {
	position: 'relative',
};

const LikeButton = styled(({...props}) => (
	<IconButton {...props} />
))`
	color: var(--color-01);
`;

export class Outfit extends React.Component{
	constructor(props){
		super(props);
		var {
			coverpic,
			hovering,
		} = props;

		this.state = {
			coverpic: coverpic || null,
			base64Image: null,
			base64ImageProfile: null,
			hovering: hovering || false,
			imgLoaded: false,
		};

		this._handleTileClicked = this._handleTileClicked.bind(this);
		this._handleImageReceived = this._handleImageReceived.bind(this);
		this._handleOnMouseOver = this._handleOnMouseOver.bind(this);
		this._handleOnMouseOut = this._handleOnMouseOut.bind(this);
	}

	async componentDidMount(){
		// Methods
		const {
			getCoverPic,
		} = this.props;

		// Variables
		const {
			coverpicuri,
			profilePicUri,
		} = this.props;

		var profilePicData = null;
		var coverpicData = null

		/*const updateProfilePicData = (event, data) => {profilePicData = data;}
		const updateCoverpicData = (event, data) => {coverpicData = data;}

		//if coverpic filename exists, call get request for content coverpic data
		console.log("small = ", coverpicuri)
		if(profilePicUri !== null  && profilePicUri !== undefined) await getCoverPic(profilePicUri, updateProfilePicData, 'small');
		if(coverpicuri !== null  && coverpicuri !== undefined) await getCoverPic(coverpicuri, updateCoverpicData, 'small');

		if(profilePicData || coverpicData) this._handleImageReceived(null, coverpicData, profilePicData);*/
	}

	async componentDidUpdate(prevProps){
		// Methods
		const {
			getCoverPic,
		} = this.props;

		// Variables
		const {
			coverpicuri,
			profilePicUri,
		} = this.props;

		/*var profilePicData = null;
		var coverpicData = null

		const updateProfilePicData = (data) => {profilePicData = data;}
		const updateCoverpicData = (data) => {coverpicData = data;}

		if(profilePicUri !== null && profilePicUri !== prevProps.profilePicUri) await getCoverPic(profilePicUri, updateProfilePicData, 'small');
		if(coverpicuri !== prevProps.coverpicuri) await getCoverPic(coverpicuri, updateCoverpicData, 'small');

		if(profilePicData || coverpicData) this._handleImageReceived(null, coverpicData, profilePicData);*/
	}

	_handleTileClicked(event){
		switch(this.props.webAppView){

			//Navigated to Browse
			case OxiAppConstants.navRequestMap.a.toLowerCase():
				if(!this.props.isSelected){
					this.props.onClickContextBrowse(this.props.id, null);
				}
				break;

			//Navigated to Profile
			case OxiAppConstants.navRequestMap.b.toLowerCase():
				if(!this.props.isSelected && this.props.viewState === OxiAppConstants.viewState.PREVIEW){			
					//call selectAndPropagate
					this.props.onClickContextProfile(this.props.id, this.props.contentIds[0]);
				}
				this.props.setPreviewFocus();
				event.stopPropagation();
				break;

			default:
				break;
		}
	}

	_handleOnMouseOver(event){
		showOutfitTileControls = Object.assign({}, {display: 'block'});
		this.setState({hovering: true});
		switch(this.props.webAppView){
			case OxiAppConstants.navRequestMap.a.toLowerCase():
				break;
			case OxiAppConstants.navRequestMap.b.toLowerCase():
				break;
			default:
				break;
		}
	}

	_handleOnMouseOut(event){
		showOutfitTileControls = Object.assign({}, {display: 'none'});
		this.setState({hovering: false})
		switch(this.props.webAppView){
			case OxiAppConstants.navRequestMap.a.toLowerCase():
				break;
			case OxiAppConstants.navRequestMap.b.toLowerCase():
				break;
			default:
				break;
		}		
	}

	_handleImageReceived(event, coverpicData, profilePicData){
		this.setState(prevState => ({
			...prevState,
			base64Image: coverpicData ? ('data:image/jpeg;base64,' + coverpicData) : prevState.base64Image,
			base64ImageProfile: profilePicData ? ('data:image/jpeg;base64,' + profilePicData) : prevState.base64ImageProfile,
		}));
	}

	render(){
		//console.log('Outfit(id = ', this.props.id, ')')
		/*if(this.props.id === this.props.modifiedOutfitProperites.id){
			console.log(`modifiedOutfitProperites.coverpicuri = ${this.props.modifiedOutfitProperites.coverpicuri}, \n this.props.coverpicuri = ${this.props.coverpicuri}`);
			if(this.props.modifiedOutfitProperites.coverpicuri !== this.props.coverpicuri){
				this.props.getCoverPic(this.props.modifiedOutfitProperites.coverpicuri, this._handleImageReceived, 'small')
			}
		}*/

		const {
			editOutfit,
			navToHostProfile,
			routeToHostProfile,
			getHostMeasurements,
			toggleMetricPanel,
			previewOutfitFromBrowse,
			setPreviewFocus,
			showOutfitPreviewFromBrowse,
			selectOutfit,
			deselectOutfit,
		} = this.props;

		var {
			contents,
			pictures,
			coverpicuri,
			contentIds,
			webAppView,
			webAppViewContext,
			owner,
			outfit,
			containerHeight,
			isLiked,
			likeCount,
			like,
			unlike,
			id, 				//outfit id
			viewState,
			username,
			isSelected,
			webAppView,
			history,
			edittingProfilePage,
			profilePicUri,

		} = this.props;

		const ppIconStyles = {
        	'width':' 58px',
        	'height':' 58px',
        	'border-radius':' 29px',
        	'background-color':'#263238',
        	...(isDevice ? ({margin: '5px'}) : ({})),
		}

		let contextualStyles = null;
		let outfitHeight = containerHeight;///3;
		let outfitWidth = outfitHeight * OxiAppConstants.aspectRatio;
		let isBrowse = webAppView === OxiAppConstants.navRequestMap.a.toLowerCase();
		var isEditingProfile = webAppViewContext === OxiAppConstants.webAppViewContext.b;

		var fill = "#FFF6";
		var stroke = "#000";
		//var isLiked = profileIds.owner ? profileIds.owner.likeCountIds.includes(likeCount.toUpperCase()) : false
		
		if(isLiked){
			fill = "#000";
			stroke = "#000";//isSelected ? "var(--color5)" : '#aaa';
		}


		contextualStyles = isBrowse ?
			contextualStyles = {
				//'display':'inline-block',
				////'margin-top':'80px'
				//'margin-right': '50px',
				//'margin-bottom': '0px',
				//'margin-left': '50px',
				////'margin':'80px 50px 0px 50px'
			} :
			containerHeight !== null ? 
				contextualStyles ={
					//height:`calc(${outfitHeight}px)`,
					height:`calc(${outfitWidth}px)`,
					width:`calc(${outfitWidth}px)`,
					//'margin-left':'130px',
					//'margin-bottom':'50px',
					//'margin-top':'40px',
				} :
				null;

		return(
			<Elevation z={isDevice ? 0 : 1} wrap style={{'z-index':'1'}}>
				<div 
					//className={isSelected ? OutfitStyles['Outfit__div--selected'] : OutfitStyles.stdOutfitBlock} 
					className={isBrowse ? OutfitStyles.stdOutfitBlock : OutfitStyles.stdOutfitBlockProfile_div} 
					style={contextualStyles} 
					onClick={webAppView === OxiAppConstants.navRequestMap.b.toLowerCase() ? this._handleTileClicked : null}
				
				>
					{
						isBrowse ? 
							(
								<div 
									className={isSelected ? OutfitStyles['outfitUsernameContainer_div--selected'] : OutfitStyles.outfitUsernameContainer_div} 
									style={{'padding':'0px'}} >
									<div className={OutfitStyles.outfitHeader_div}>										
										<PpIcon 
											//base64Image={this.state.base64ImageProfile} 
											imageName={profilePicUri}
											isMobile={false} 
											customStyle={ppIconStyles}
											customDefaultStyle={{
												...ppIconStyles,
												'border':'solid 5px var(--color-desktop-01)',
											}}
											onClick={(e) => {
												history.push(`/shop/profile/${username}`);
												navToHostProfile(username, owner);
											}}
										/>
										<div className={OutfitStyles.outfitUsername_div}>
											{ username !== undefined && username !== null ? username.toUpperCase() : "Username" }
										</div>
									</div>
									
									{/*<div className={OutfitStyles.ppIconStyles}>
																		
									</div>*/}
									<div className={OutfitStyles.outfitControls_div}>
										<IconButton 
											ripple={true}
											style={{
												...(isDevice ? ({}) : ({'margin-top':'36px'})),
												'border':'unset',
												outline:'none',
												'line-height': '18px',
				
											}}
											onClick={(e) => {
												console.log('onchange event e = ', e);
												//e.stopPropagation();
												this._handleTileClicked();
												getHostMeasurements(id);
												toggleMetricPanel(e, true);
											}}
											icon={
												<div
													style={{
														width:'24px',
														height:'24px',
														'border-radius':'50%',
													}}
												>
													<SvgIcon 
														className={OutfitStyles.measureBtn_svg} 
														name="MeasureIcon" 
														//fill={fill}
														//stroke={stroke} 
														strokeWidth="2"
													/>
												</div>
											}
										/>
										<LikeButton
											//style={{color:'var(--color-01)', 'line-height':'18px',}}
											onClick={(event) => {
												isLiked ?
													unlike(id, outfit) :
													like(id, outfit)
											}}	
											icon={isLiked ? "favorite" : "favorite_border"}	
											//onIcon={isLiked ? "favorite_border" : "favorite"}	
										/>
									</div>
									{/*<div 
										className={ OutfitStyles.likesBtn_div }
										onClick={(event) => {
											isLiked ?
												unlike(id, outfit) :
												like(id, outfit)
										}} >
											<SvgIcon 
												className={OutfitStyles.likesBtn_svg} 
												name="HeartIcon" 
												fill={fill}
												stroke={stroke} 
												strokeWidth="3" 
											/>
									</div>*/}
								</div>
							) : (
								<div className={isSelected ? OutfitStyles['outfitMultiPicContainer_div--selected'] : OutfitStyles.outfitMultiPicContainer_div}>
									<div className={OutfitStyles.outfitMultiPic_div}>
										{
											Object.keys(contents).length > 1 ? 
												(<SvgIcon 
													style={{
														width:'100%', 
														height:'100%'
													}} 
													name="MultiplePicIcon" 
													stroke={isSelected ? '#FFF' : '#000'}/>) :
												null
										}
									</div>
								</div>
							)
					}
					<Ripple
						disabled={isEditingProfile}
					>
						<div
							style={{
								'text-align': 'left', 
								height:'100%', 
								'background-color': '#f0f0f0',
								'position':'relative',
							}}
							onMouseOver={this._handleOnMouseOver}
							onMouseOut={this._handleOnMouseOut}
						>
							<div 
								style={this.state.imgLoaded ? 
									({
										display:'none', 
									}) : 
									({
										height:'100%', 
										width:'100%',
										'background-color': '#f0f0f0',
									})
								}
							>
							</div>
							<img 
								//src={this.state.base64Image === null ? (OxiAppConstants.ContentDirectories.IMAGES + "/no_image.svg") : (this.state.base64Image)}
								src={
									(outfit && pictures[outfit.coverPictureId]) ? 
										getImageURL(pictures[outfit.coverPictureId].mediumuri) : 
										coverpicuri ?
											getImageURL(coverpicuri) :
											`${OxiAppConstants.ContentDirectories.IMAGES}/no_image.svg`
								}
								className={OutfitStyles.outfitImage_img}
								style={{
									'object-fit':'cover',
									...(this.state.imgLoaded ? ({}) : ({display:'none'}) )
								}}
								onLoad={e => this.setState(prevState => ({...prevState, imgLoaded: true,}))}
								onClick={(event) => {									
									if(!isEditingProfile){ 
										previewOutfitFromBrowse(id)
									}else{
										isSelected ? deselectOutfit(id) : selectOutfit(id);
									}

									event.stopPropagation();
								}}
							/>
							{
								isEditingProfile ? 
									<Checkbox
										style={{
											position:'absolute', 
											top:'0px', 
											left:'0px',
											'background-color':'#ffffff75',
										}}
										checked={isSelected}
										//onChange={e => selectOutfit(e)}
									/> : 
									null
							}
							{/*<Image
								//setupImageRef={this.props.setupImageRef}
								src={src}
								className={OutfitStyles.outfitImage_img}
								imgLoaded={this.state.imgLoaded}
								onLoad={e => this.setState(prevState => ({...prevState, imgLoaded: true,})) }
								imgStyle={{
									'object-fit':'cover',
								}}
								defaultStyle={{

								}}	
								onClick={(event) => {
									previewOutfitFromBrowse(id);
									event.stopPropagation();
								}}							
							/>*/}
							{/*<CSSTransition 
								key={id}
							    tiemout={200}
							    classNames="outfitMenuContainer"
							    in={(this.state.hovering && viewState === OxiAppConstants.viewState.PREVIEW && isDevice)}
							    unmountOnExit >
								<div 
									className={(viewState === OxiAppConstants.viewState.PREVIEW) ? 
										OutfitStyles.outfitMenuContainer : 
											!isSelected ? 
												OutfitStyles.outfitTileMask : 
												null } 
									style={(viewState === OxiAppConstants.viewState.PREVIEW) ? 
										showOutfitTileControls : 
										({
											'display':'block', 
											'top':`calc(${outfitHeight} - 70px`
										})}
									//onMouseOver={(event) => event.stopPropagation()} 
								>	
									{
										(webAppView === OxiAppConstants.navRequestMap.b.toLowerCase() && viewState === OxiAppConstants.viewState.PREVIEW) ?
											( <OutfitEditDelete editOutfit={editOutfit}/> ) : 
											(
												<OutfitTileBrowseCtrls 
													navToHostProfile={navToHostProfile} 
													routeToHostProfile={routeToHostProfile}
													username={isBrowse ? username : null}
													getHostMeasurementsHandler={ () => { getHostMeasurements(id) } }
													handleTileSelected={this._handleTileClicked}
													showOutfitPreviewFromBrowse={() => showOutfitPreviewFromBrowse(id)}
													
													toggleMetricPanel={toggleMetricPanel}
													owner={owner}
													outfitId={id}
													contentIds={contentIds}
													previewOutfitFromBrowse={previewOutfitFromBrowse}
													setPreviewFocus={setPreviewFocus}
												/>
											)
									}
								</div>
							</CSSTransition>*/}
						</div>
					</Ripple>		
				</div>
			</Elevation>
		);
	}
}

export default Outfit;