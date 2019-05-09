import React from 'react';
import PropTypes from 'prop-types';

//CSS Styles
import OutfitNavStyles from '../../outfitNav.css';
import Styles from '../../root.css';
import NavStyles from '../../nav.css';
import OutfitStyles from '../../outfit.css';

import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

//import DeleteIcon from '../SvgAssets/Icons/DeleteIcon.js';
//import EditIcon from '../SvgAssets/Icons/EditIcon.js';
import {SvgIcon} from '../SvgAssets/SvgIcon.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';


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

export class OutfitEditDelete extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className={OutfitStyles.editOutfitBtnContainer4_div}>
				{/*<div style={ButtonContainer}>
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
				</div>*/}
				<div className={OutfitStyles.editOutfitBtnContainer3_div}>
					<div className={OutfitStyles.editOutfitBtnContainer2_div} onClick={this.props.editOutfit}>
						<div className={OutfitStyles.editOutfitBtnContainer_div}>
							<div className={OutfitStyles.editOutfitBtn_div}>
								<SvgIcon name={'EditIcon'} penColor="#FFF" writingColor="#FFF" borderColor="#FFF"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export class OutfitTileBrowseCtrls extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div style={{
				position: 'absolute',
    			top: 'calc(50% - 25px)',
    			width: '153px',
    			left: 'calc(50% - 153px/2)',
			}}>
				<div className={OutfitStyles.previewMeasureBtnContainer_div}>
					<div className={OutfitStyles.previewMeasureBtn_div}>
					</div>
				</div>
				<div 
					className={OutfitStyles.previewMeasureBtnContainer_div}
					style={{padding:'0px'}}>
					<div 
						className={OutfitStyles.previewMeasureBtn_div}
						style={{
							height:'100%',
							'line-height':'50px',
						}}
						onClick={(e) => {
							e.stopPropagation();
							this.props.handleTileSelected();
							this.props.getHostMeasurementsHandler()();
						}}>
					•
					</div>
				</div>
				<div className={OutfitStyles.previewMeasureBtnContainer_div}>
					<Link to={`/shop/profile/${this.props.username}`}>
					{/*<Link to={`/shop/browse`}>*/}
						<div 
							className={OutfitStyles.previewMeasureBtn_div}
							style={{'line-height':'40px'}}
							onClick={(e) => {
								//e.stopPropagation();
								this.props.navToHostProfile();
								//this.props.routeToHostProfile();
							}}>
						→
						</div>
					</Link>
				</div>
			</div>
		)
	}
}