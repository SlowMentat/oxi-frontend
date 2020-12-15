import React from 'react';
import PropTypes from 'prop-types';

//CSS Styles
import OutfitNavStyles from '../../outfitNav.scss';
import Styles from '../../root.scss';
import NavStyles from '../../nav.scss';
import ControlStyles from '../../controls.scss';

import {Button} from '../../Components/Presentations/Controls.js';

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
		if(!this.props.buttonDisabled){this.props.addOutfit(1, undefined, this.props.entitiesStateReducer);}
	}

	render(){
		let button = null;
		let customButtonStyles = {
			color:'white',
			'margin':'auto',		
		}
		if(this.props.webAppView === OxiAppConstants.navRequestMap.b.toLowerCase()){
			/*button = (
				<Button
					buttonType={OxiAppConstants.ControlConstants.ButtonTypes.a} //dynamic icon button
					//onClickHandler={this.props.discardChanges}
					title='add new outfit'
					iconName='AddOutfitIcon'
					customButtonStyles={customButtonStyles} />
			)*/
			button = (
				<div 
					className={OutfitNavStyles.outfitCtrlBtnContainer_div} 
					style={this.props.style} 
					onClick={this.handleAddOutfitClcik}>
					<div 
						className={OutfitNavStyles.outfitCtrlBtn_div}
						style={{
						}}>
						{/*<div
								className={OutfitNavStyles.outfitCtrlBtnContent_div}
								style={{
								}}>
								+
							</div>*/}
						<Button
							buttonType={OxiAppConstants.ControlConstants.ButtonTypes.b} //dynamic icon button
							//onClickHandler={this.props.discardChanges}
							title='add new outfit'
							iconName='AddOutfitIcon'
							expandedWidth={150}
							buttonHeight={40}
							customButtonStyles={customButtonStyles} />
							</div>
				</div>
			);
		}
		return(button);
	}
}

export default OutfitCtrlAndInd