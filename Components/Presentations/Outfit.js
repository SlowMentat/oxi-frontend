import React from 'react';
import PropTypes from 'prop-types';
import OutfitStyles from '../../outfit.css';
import {OutfitAddDelete} from './OutfitTileCtrls.js';
import {OutfitSocialStatistics} from './OutfitSocialStatistics.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

var showOutfitTileControls = {

};

export class Outfit extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			coverpic:null,
			base64Image:null,
			hovering: false
		};

		this._handleOnClick = this._handleOnClick.bind(this);
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
		console.log('this.prosp.coverpicuri = ', this.props.coverpicuri);
		console.log('prevProps.coverpicuri = ', prevProps.coverpicuri);
		if(this.props.coverpicuri !== prevProps.coverpicuri){
			this.props.getCoverPic(this.props.coverpicuri, this._handleImageReceived, 'small');
		}
	}

	_handleOnClick(event){
		switch(this.props.webAppView){
			case OxiAppConstants.navRequestMap.home.toLowerCase():
				//TDOO: freeze the tileCotnrolShown state
				this.props.onClickContextHome(this.props.id);
				break;
			case OxiAppConstants.navRequestMap.profile.toLowerCase():
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
			case OxiAppConstants.navRequestMap.home.toLowerCase():
				break;
			case OxiAppConstants.navRequestMap.profile.toLowerCase():
				break;
			default:
				break;
		}
	}

	_handleOnMouseOut(event){
		showOutfitTileControls = Object.assign({}, {display: 'none'});
		this.setState({hovering: false})
		switch(this.props.webAppView){
			case OxiAppConstants.navRequestMap.home.toLowerCase():
				break;
			case OxiAppConstants.navRequestMap.profile.toLowerCase():
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
		console.log('Outfit(id = ', this.props.id, ')')
		/*if(this.props.id === this.props.modifiedOutfitProperites.id){
			console.log(`modifiedOutfitProperites.coverpicuri = ${this.props.modifiedOutfitProperites.coverpicuri}, \n this.props.coverpicuri = ${this.props.coverpicuri}`);
			if(this.props.modifiedOutfitProperites.coverpicuri !== this.props.coverpicuri){
				this.props.getCoverPic(this.props.modifiedOutfitProperites.coverpicuri, this._handleImageReceived, 'small')
			}
		}*/
		let contextualStyles = null;
		let outfitHeight = this.props.containerHeight/3;
		let outfitWidth = outfitHeight*(2/3);
		let isHome = this.props.webAppView === OxiAppConstants.navRequestMap.home.toLowerCase()
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
				className={this.props.isSelected ? OutfitStyles['Outfit__div--selected'] : OutfitStyles.stdOutfitBlock} 
				style={contextualStyles} 
				onClick={this._handleOnClick}
				onMouseOver={this._handleOnMouseOver}
				onMouseOut={this._handleOnMouseOut}
			>
				{
					isHome ? 
						(<div className={OutfitStyles.outfitUsernameContainer_div} style={{'padding':'0px'}}>
							<div className={OutfitStyles.outfitUsername_div}>
								{this.props.username !== undefined ? this.props.username.toUpperCase() : null}
							</div>
						</div>) :
						null
				}
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
							(this.props.webAppView === OxiAppConstants.navRequestMap.profile.toLowerCase() && this.props.viewState === OxiAppConstants.viewState.PREVIEW) 
							? (<OutfitAddDelete editOutfit={this.props.editOutfit}/>)
							: (null)
						}
					</div>
				</CSSTransition>
				<OutfitSocialStatistics webAppView={this.props.webAppView}/>
			</div>
		);
	}
}

export default Outfit;