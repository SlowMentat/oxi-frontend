import React from 'react';
import PropTypes from 'prop-types';
import ContentStyles from '../../content.css';


export class Content extends React.Component{
	constructor(props){
		super(props);
		this._handleOnClick = this._handleOnClick.bind(this);
	}

	_handleOnClick(event){
		console.log("controll click event in Content div");
		this.props.onClick();
	}

	render(){
		console.log("isControl:")
		console.log(this.props.isControl)
		return(		
			<div className={this.props.isControl ? ContentStyles.addContentButton : ContentStyles.stdContentBlock } onClick={this._handleOnClick}>
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