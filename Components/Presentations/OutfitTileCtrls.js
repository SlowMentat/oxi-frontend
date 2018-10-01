import React from 'react';
import PropTypes from 'prop-types';

//CSS Styles
import OutfitNavStyles from '../../outfitNav.css';
import Styles from '../../root.css';
import NavStyles from '../../nav.css';

import {OxiAppConstants} from '../../Util/OxiAppConstants.js'


const ButtonContainer ={
	'display': 'inline-block',
    'width': '49%',
    'height': '100px'
}

const Button = {
	'position': 'absolute',
    'width': '50px',
    'height': '50px',
    'bottom': '10px',
    'text-align': 'center',
    'border-radius': '4px',
    'border-style': 'solid',
    'border-width': '2px',
    'border-color': '#ececec',
    //'left': '10px'
}

export class UserProfileOutfitCtrl extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div style={{overflow:'hidden', height:'50%'}}>
				<div style={ButtonContainer}>
					<div style={Object.assign({}, Button, {left:'10px'})}>
						<div style={{'text-align':'center'}}>
							<div style={{
								width:'100%',
								height:'10px',
								top:'50%',
								position:'absolute',
								'margin-top':'-7px'
							}}>
								Del
							</div>
						</div>
					</div>
				</div>
				<div style={ButtonContainer}>
					<div style={Object.assign({}, Button, {right:'10px'})}>
						<div style={{'text-align':'center'}}>
							<div style={{
								width:'100%',
								height:'10px',
								top:'50%',
								position:'absolute',
								'margin-top':'-7px'
							}}>
								Edit
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

