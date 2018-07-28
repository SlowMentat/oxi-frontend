import React from 'react';
import PropTypes from 'prop-types';
import ContentStyles from '../../content.css';
import {hextToBase64} from '../../Util/DataFormatConverter.js'


export class Content extends React.Component{
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
		console.log("control click event in Content div");
		console.log(this.props.id);
		this.props.onClick(this.props.id);
	}

	_handleImageReceived(event, data){
		this.setState({
			base64Image: 'data:image/jpeg;base64,' + data
		});
	}

	render(){
		console.log("isControl:")
		console.log(this.props.isControl)
		return(		
			<div className={this.props.isControl ? ContentStyles.addContentButton : ContentStyles.stdContentBlock } onClick={this._handleOnClick}>

				<img src={this.state.base64Image}  style={{width:'100%', 'max-height':'inherit'}}/>
			</div>		
		);
	}
}

/*const Outfit = ({id}, onAddOutfit, isControl) => {
	return(			
		<div className={isControl ? OutfitStyles.outfitContainer : OutfitStyles.addOutfitButton} onClick={() => {console.log("controll click event in Outfit div"); console.log(onAddOutfit); onAddOutfit()}}>
		</div>		
	);
}*/

export default Content;