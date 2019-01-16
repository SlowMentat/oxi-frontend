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
		if(this.props.webAppView === OxiAppConstants.navRequestMap.profile.toLowerCase()){
			button = (
				<div className={OutfitNavStyles.outfitCtrlButton} style={this.props.style} onClick={this.handleAddOutfitClcik}>
					<div 
						style={{
							'position':' relative',
    						'background-color':'#4a4547',
    						'height':' 50px',
    						'width':' 50px',
    						'border-radius':' 25px',
    						'margin':' auto',
    						'color':' white',
    						'margin-top':' calc((5vh + 25px)/4 - 10px)',
						}}>
						<div
							style={{
								'position':' absolute',
   								'height':' 25px',
   								'width':' 25px',
   								'top':' calc(50% - 12.5px)',
   								'left':' calc(50% - 12.5px)',
   								'font-size':' 25px',
							}}>
							+
						</div>
					</div>
				</div>
			);
		}
		return(button);
	}
}

export default OutfitCtrlAndInd