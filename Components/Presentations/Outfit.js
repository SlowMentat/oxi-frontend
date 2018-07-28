import React from 'react';
import PropTypes from 'prop-types';
import OutfitStyles from '../../outfit.css';


export class Outfit extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			thumbnail:null,
			base64Image:null
		};

		this._handleOnClick = this._handleOnClick.bind(this);
		this._handleImageReceived = this._handleImageReceived.bind(this);
		//Dispatch ADD_CONTENT on creation
		/*if(!this.props.isControl){
			this.props.createContent(this.outfitId);
		}*/
	}

	componentDidMount(){
		//if thumbnail filename exists, call get request for content coverpic data
		if(this.props.thumbnail != null) this.props.getCoverPic(this.props.thumbnail, this._handleImageReceived);
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
	
	_handleImageReceived(event, data){
		this.setState({
			base64Image: 'data:image/jpeg;base64,' + data
		});
	}

	//outfitClicked = () => {}
	render(){
		console.log("isControl:")
		console.log(this.props.isControl)
		return(		
			<div className={this.props.isControl ? OutfitStyles.addOutfitButton : OutfitStyles.stdOutfitBlock} onClick={this._handleOnClick}>
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

export default Outfit;