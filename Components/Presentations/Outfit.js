import React from 'react';
import PropTypes from 'prop-types';
import OutfitStyles from '../../outfit.css';


export class Outfit extends React.Component{
	constructor(props){
		super(props);
		this._handleOnClick = this._handleOnClick.bind(this);
	}

	_handleOnClick(event){
		if(this.props.isControl){
			console.log("Control Outfit div clicked")
		}else{			
			console.log("view Outfit div clicked")
		}
		this.props.onClick();
		//event.stopPropagation();
	}

	//outfitClicked = () => {}
	render(){
		console.log("isControl:")
		console.log(this.props.isControl)
		return(		
			<div className={this.props.isControl ? OutfitStyles.addOutfitButton : OutfitStyles.stdOutfitBlock} onClick={this._handleOnClick}>
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

export default Outfit;