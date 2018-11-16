import React from 'react';
import PropTypes from 'prop-types';
import OutfitStyles from '../../outfit.css';
import {UserProfileOutfitCtrl} from './OutfitTileCtrls.js'
import {OxiAppConstants} from '../../Util/OxiAppConstants.js'

var showOutfitTileControls = {

};

export class Outfit extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			coverpic:null,
			base64Image:null,
			tileControlShown: false
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
		this.setState({tileControlShown: !this.state.tileControlShown});
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
		this.setState({tileControlShown: !this.state.tileControlShown})
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
		let outfitBlockHomeStyle = null;
		if(this.props.webAppView === OxiAppConstants.navRequestMap.home.toLowerCase()){
			outfitBlockHomeStyle = {'display':'inline-block','margin':'20px'};
		}

		return(		
			<div 
				className={this.props.isSelected ? OutfitStyles['Outfit__div--selected'] : OutfitStyles.stdOutfitBlock} 
				style={outfitBlockHomeStyle} 
				onClick={this._handleOnClick}
				onMouseOver={this._handleOnMouseOver}
				onMouseOut={this._handleOnMouseOut}
			>
				<img 
					src={this.state.base64Image === null ? (OxiAppConstants.ContentDirectories.IMAGES + "/no_image.svg") : (this.state.base64Image)} 
					style={{
						width:'100%', 
						'max-height':'inherit',
						'border-radius':'3px',
						position:'absolute'
					}}
				/>
				<div 
					className={
						(this.props.viewState === OxiAppConstants.viewState.PREVIEW) ? OutfitStyles.outfitTileCtrlContainer : (!this.props.isSelected) ? OutfitStyles.outfitTileMask : null
					} 
					style={(this.props.viewState === OxiAppConstants.viewState.PREVIEW) ? showOutfitTileControls : {'display':'block'}}
				>
					{
						(this.props.webAppView === OxiAppConstants.navRequestMap.profile.toLowerCase() && this.props.viewState === OxiAppConstants.viewState.PREVIEW) 
						? (<UserProfileOutfitCtrl editOutfit={this.props.editOutfit}/>)
						: (null)
					}
				</div>
			</div>		
		);
	}
}

export default Outfit;