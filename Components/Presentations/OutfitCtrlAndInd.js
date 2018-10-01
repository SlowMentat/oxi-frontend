import React from 'react';
import PropTypes from 'prop-types';

//CSS Styles
import OutfitNavStyles from '../../outfitNav.css';
import Styles from '../../root.css';
import NavStyles from '../../nav.css';

import {OxiAppConstants} from '../../Util/OxiAppConstants.js'

class OutfitCtrlAndInd extends React.Component{
	constructor(props){
		super(props);
		this.handleAddOutfitClcik = this.handleAddOutfitClcik.bind(this);
		this.stateChangeFinish - this.stateChangeFinish.bind(this);
	}

	componentDidMount(){		 
	}

	componentWillUnmount(){
	}

	componentWillMount(){

	}

	stateChangeFinish(){
	}

	handleAddOutfitClcik(){
		if(!this.props.buttonDisabled){this.props.addOutfit(1, undefined);}
	}

	render(){
		let button = null;
		if(this.props.webAppView.webAppView !== OxiAppConstants.navRequestMap.home.toLowerCase()){
			button = (
				<div className={OutfitNavStyles.outfitCtrlButton} onClick={this.handleAddOutfitClcik}>
					Add Outfit
				</div>
			);
		}
		return(button);
	}
}

export default OutfitCtrlAndInd