import React from 'react';
import PropTypes from 'prop-types';

//CSS Styles
import OutfitNavStyles from '../../outfitNav.css';
import Styles from '../../root.css';
import NavStyles from '../../nav.css';

import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

//import DeleteIcon from '../SvgAssets/Icons/DeleteIcon.js';
//import EditIcon from '../SvgAssets/Icons/EditIcon.js';
import {SvgIcon} from '../SvgAssets/SvgIcon.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const ButtonContainer ={
	'display': 'inline-block',
    'width': '49%',
    'height': '70px'
}

const Button = {
	'cursor':'pointer',
	'position': 'absolute',
    'width': '30px',
    'height': '30px',
    'bottom': '10px',
    'text-align': 'center',
    'border-radius': '4px',
    //'border-style': 'solid',
    //'border-width': '2px',
    //'border-color': '#ececec',
    //'left': '10px'
}

export class OutfitAddDelete extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div style={{overflow:'hidden', height:'50%'}}>
				<div style={ButtonContainer}>
					<div style={Object.assign({}, Button, {left:'10px'})} onClick={this.props.deleteOutfit}>
						<div style={{'text-align':'center'}}>
							<div style={{
								width:'100%',
								position:'absolute',
							}}>
								<SvgIcon name={'DeleteIcon'} crossColor="#FFF" strokeWidth={null}/>
							</div>
						</div>
					</div>
				</div>
				<div style={ButtonContainer}>
					<div style={Object.assign({}, Button, {right:'10px'})} onClick={this.props.editOutfit}>
						<div style={{'text-align':'center'}}>
							<div style={{
								width:'100%',
								position:'absolute',
							}}>
								<SvgIcon name={'EditIcon'} penColor="#FFF" writingColor="#FFF" borderColor="#FFF"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

/*

			<div style={{overflow:'hidden', height:'50%'}}>
				<div style={ButtonContainer}>
					<div style={Object.assign({}, Button, {left:'10px'})} onClick={this.props.deleteOutfit}>
						<div style={{'text-align':'center'}}>
							<div style={{
								width:'100%',
								height:'10px',
								top:'50%',
								position:'absolute',
								'margin-top':'-7px'
							}}>
								<DeleteIcon/>
							</div>
						</div>
					</div>
				</div>
				<div style={ButtonContainer}>
					<div style={Object.assign({}, Button, {right:'10px'})} onClick={this.props.editOutfit}>
						<div style={{'text-align':'center'}}>
							<div style={{
								width:'100%',
								height:'10px',
								top:'50%',
								position:'absolute',
								'margin-top':'-7px'
							}}>
								<EditIcon/>
							</div>
						</div>
					</div>
				</div>
			</div>
*/