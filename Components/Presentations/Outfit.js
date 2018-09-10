import React from 'react';
import PropTypes from 'prop-types';
import OutfitStyles from '../../outfit.css';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js'


export class Outfit extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			thumbnail:null,
			base64Image:null
		};

		this._handleOnClick = this._handleOnClick.bind(this);
		this._handleImageReceived = this._handleImageReceived.bind(this);
	}

	componentDidMount(){
		//if thumbnail filename exists, call get request for content coverpic data
		if(this.props.thumbnail != null) this.props.getCoverPic(this.props.thumbnail, this._handleImageReceived);
	}

	_handleOnClick(event){
		if(!this.props.isSelected){			
			console.log("view Outfit div clicked")
			//call selectAndPropogate
			this.props.onClick(this.props.id, this.props.contents[0]);
		}
		event.stopPropagation();
	}

	_handleImageReceived(event, data){
		this.setState({
			base64Image: 'data:image/jpeg;base64,' + data
		});
	}

	render(){
		return(		
			<div className={this.props.isSelected ? OutfitStyles['Outfit__div--selected'] : OutfitStyles.stdOutfitBlock} onClick={this._handleOnClick}>
				<img src={this.state.base64Image == null ? (OxiAppConstants.ContentDirectories.IMAGES + "/no_image.svg") : (this.state.base64Image)} style={{width:'100%', 'max-height':'inherit'}}/>
			</div>		
		);
	}
}

export default Outfit;