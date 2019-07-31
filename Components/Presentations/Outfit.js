import React from 'react';
import PropTypes from 'prop-types';
import OutfitStyles from '../../outfit.css';
import {OutfitEditDelete, OutfitTileBrowseCtrls} from './OutfitTileCtrls.js';
import {OutfitSocialStatistics} from './OutfitSocialStatistics.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {SvgIcon} from '../SvgAssets/SvgIcon.js';

var showOutfitTileControls = {
	position: 'relative',
};

export class Outfit extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			coverpic:null,
			base64Image:null,
			hovering: false
		};

		this._handleTileClicked = this._handleTileClicked.bind(this);
		this._handleImageReceived = this._handleImageReceived.bind(this);
		this._handleOnMouseOver = this._handleOnMouseOver.bind(this);
		this._handleOnMouseOut = this._handleOnMouseOut.bind(this);
	}

	componentDidMount(){
		//if coverpic filename exists, call get request for content coverpic data
		console.log("small = ", this.props.coverpicuri)
		if(this.props.coverpicuri !== null  && this.props.coverpicuri !== undefined) this.props.getCoverPic(this.props.coverpicuri, this._handleImageReceived, 'small');
	}

	componentDidUpdate(prevProps){
		//console.log('this.prosp.coverpicuri = ', this.props.coverpicuri);
		//console.log('prevProps.coverpicuri = ', prevProps.coverpicuri);
		if(this.props.coverpicuri !== prevProps.coverpicuri){
			this.props.getCoverPic(this.props.coverpicuri, this._handleImageReceived, 'small');
		}
	}

	_handleTileClicked(event){
		switch(this.props.webAppView){
			case OxiAppConstants.navRequestMap.a.toLowerCase():
				if(!this.props.isSelected){
					this.props.onClickContextBrowse(this.props.id, null);
				}
				break;
			case OxiAppConstants.navRequestMap.b.toLowerCase():
				if(!this.props.isSelected && this.props.viewState === OxiAppConstants.viewState.PREVIEW){			
					//call selectAndPropogate
					this.props.onClickContextProfile(this.props.id, this.props.contentIds[0]);
				}
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

	_handleImageReceived(event, data){
		this.setState({
			base64Image: 'data:image/jpeg;base64,' + data
		});
	}

	render(){
		//console.log('Outfit(id = ', this.props.id, ')')
		/*if(this.props.id === this.props.modifiedOutfitProperites.id){
			console.log(`modifiedOutfitProperites.coverpicuri = ${this.props.modifiedOutfitProperites.coverpicuri}, \n this.props.coverpicuri = ${this.props.coverpicuri}`);
			if(this.props.modifiedOutfitProperites.coverpicuri !== this.props.coverpicuri){
				this.props.getCoverPic(this.props.modifiedOutfitProperites.coverpicuri, this._handleImageReceived, 'small')
			}
		}*/
		let contextualStyles = null;
		let outfitHeight = this.props.containerHeight/3;
		let outfitWidth = outfitHeight*(2/3);
		let isHome = this.props.webAppView === OxiAppConstants.navRequestMap.a.toLowerCase()
		contextualStyles = isHome ?
			contextualStyles = {
				'display':'inline-block',
				'margin':'80px 50px 0px 50px'
			} :
			this.props.containerHeight !== null ? 
				contextualStyles ={
					height:`calc(${outfitHeight}px)`,
					width:`calc(${outfitWidth}px)`
				} :
				null;

		return(
			<div 
				//className={this.props.isSelected ? OutfitStyles['Outfit__div--selected'] : OutfitStyles.stdOutfitBlock} 
				className={OutfitStyles.stdOutfitBlock} 
				style={contextualStyles} 
				onClick={this.props.webAppView === OxiAppConstants.navRequestMap.b.toLowerCase() ? this._handleTileClicked : null}
		
			>
				{
					isHome ? 
						(<div 
							className={this.props.isSelected ? OutfitStyles['outfitUsernameContainer_div--selected'] : OutfitStyles.outfitUsernameContainer_div} 
							style={{'padding':'0px'}}>
							<div className={OutfitStyles.outfitUsername_div}>
								{this.props.username !== undefined && this.props.username !== null ? this.props.username.toUpperCase() : null}
							</div>
						</div>) :
						(<div className={this.props.isSelected ? OutfitStyles['outfitMultiPicContainer_div--selected'] : OutfitStyles.outfitMultiPicContainer_div}>
							<div className={OutfitStyles.outfitMultiPic_div}>
								{
									Object.keys(this.props.contents).length > 1 ? 
										(<SvgIcon 
											style={{
												width:'100%', 
												height:'100%'
											}} 
											name="MultiplePicIcon" 
											stroke={this.props.isSelected ? '#FFF' : '#000'}/>) :
										null
								}
							</div>
						</div>)
				}
				<div
					onMouseOver={this._handleOnMouseOver}
					onMouseOut={this._handleOnMouseOut}>
					<img 
						src={this.state.base64Image === null ? (OxiAppConstants.ContentDirectories.IMAGES + "/no_image.svg") : (this.state.base64Image)} 
						style={{
							width:'100%', 
							'max-height':'inherit',
							'border-radius':'3px',
							'border-top-left-radius':'0px',
							'border-bottom-left-radius':'0px',
							position:'absolute'
						}}
					/>
					<CSSTransition 
						key={this.props.id}
					    tiemout={200}
					    classNames="outfitMenuContainer"
					    in={(this.state.hovering && this.props.viewState === OxiAppConstants.viewState.PREVIEW)}
					    unmountOnExit >
						<div 
							className={(this.props.viewState === OxiAppConstants.viewState.PREVIEW) ? 
								OutfitStyles.outfitMenuContainer : 
									!this.props.isSelected ? 
										OutfitStyles.outfitTileMask : 
										null } 
							style={(this.props.viewState === OxiAppConstants.viewState.PREVIEW) ? 
								showOutfitTileControls : 
								({
									'display':'block', 
									'top':`calc(${outfitHeight} - 70px`
								})} 
						>	
							{
								(this.props.webAppView === OxiAppConstants.navRequestMap.b.toLowerCase() && this.props.viewState === OxiAppConstants.viewState.PREVIEW) ?
								(<OutfitEditDelete editOutfit={this.props.editOutfit}/>) :
								(<OutfitTileBrowseCtrls 
									navToHostProfile={this.props.navToHostProfile} 
									routeToHostProfile={this.props.routeToHostProfile}
									username={isHome ? this.props.username : null}
									getHostMeasurementsHandler={() => {this.props.getHostMeasurements(this.props.id)}}
									handleTileSelected={this._handleTileClicked}/>)
							}
						</div>
					</CSSTransition>
				</div>
				<OutfitSocialStatistics webAppView={this.props.webAppView}/>
			</div>
		);
	}
}

export default Outfit;