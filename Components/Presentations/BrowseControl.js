import React from 'react';
import PropTypes from 'prop-types';
import BrowseFilterMenuContainer from '../../Components/Containers/BrowseFilterMenuContainer.js';

//CSS Styles

import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

//import DeleteIcon from '../SvgAssets/Icons/DeleteIcon.js',
//import EditIcon from '../SvgAssets/Icons/EditIcon.js',
import {SvgIcon} from '../SvgAssets/SvgIcon.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import BrowseControlStyles from '../../browseControl.css';
import {Button} from './Controls.js';


const makeBrowseSelection = (props) => {
	props.selectBrowserType(props.name.toLowerCase());
	props.filterVisible ? props.hideFilterMenu() : null;
}

const ControlButton = (props) => {
	console.log('props.name = ', props.name);
	console.log('props.browseSelection = ', props.browseSelection);

	let menuPositionx = '315px';
	let menuPositiony = (props.name === 'Outfits') ?
		'25px' : 
		props.name === 'Apparel' ?
			'75px' :
			'0px';

	return(
		<React.Fragment>
			<div 
				className={props.name.toLowerCase() === props.browseSelection ? BrowseControlStyles['browseSelected_div--selected'] : BrowseControlStyles.browseSelected_div}>				
			</div>
			<div className={BrowseControlStyles.browseSelection_div}>
				<div 
					onClick={() => {
						makeBrowseSelection(props);
						/*props.selectBrowserType(props.name.toLowerCase());
						props.filterVisible ? props.hideFilterMenu() : null;*/
					}}
					className={BrowseControlStyles.browseButton_div}>
					<div className={BrowseControlStyles.browseButtonIcon_div}>
						<SvgIcon name={`${props.name}Icon`} />
					</div>
				</div>
				<div
					onClick={() => {
						makeBrowseSelection(props);
						props.name === 'Apparel' ? 
							props.getItems('all') : 
							props.name === "Outfits" ?
								props.getOutfits('all') :
									null;
					}} 
					className={props.name.toLowerCase() === props.browseSelection ? BrowseControlStyles['browseSelectionName_div--selected'] : BrowseControlStyles.browseSelectionName_div}>
					{props.name}
				</div>
				<div className={BrowseControlStyles.filterTextContainer_div}>
					<div className={BrowseControlStyles.filterText_div}>
						{props.name === 'Outfits' ? 'likes' : 'bookmarked'}
					</div>
				</div>
				{
					props.name.toLowerCase() === props.browseSelection ? 
						<div className={BrowseControlStyles.filterButtonContainer_div}>
							<div 
								className={BrowseControlStyles.filterButton_div}
								onClick={() => {
									props.positionMenu(menuPositionx, menuPositiony);
									props.filterVisible ? null : props.showFilterMenu();
								}} >
								<SvgIcon name="FilterIcon"/>
							</div>
						</div> :
						null
				}
			</div>
		</React.Fragment>
	);
}

class BrowseControl extends React.Component{
	constructor(props){
		super(props);
	}

	render(){

		const customButtonStyles = {
			color:'black',
			width:'unset',
			'margin-bottom':'8px',
			//'border':'solid 1px gray',
			padding:'3px',
			height:'calc(var(--button-height) + 2*3px + 4px)',
			'line-height':'calc(var(--button-height) + 2*3px)', 
		};

		const ligatureStyles = {
			//'padding-top':'1px',
			//'padding-bottom':'4px',
			//'border':'solid 1px var(--color3)',
			//'border-radius':'3px',
		}

		const ligatureContainerStyles = {
			'--lig-container-border-width':'1px',
			'border':'solid 1px var(--color3)',
			'border-radius':'3px',
			'padding':'var(--lig-container-border-width)',
			width:'calc(var(--button-height) + 4px)'
		}

		return(
			<React.Fragment>	
				<div className={BrowseControlStyles.buttonContainer_div}>
					<Button
						buttonType={OxiAppConstants.ControlConstants.ButtonTypes.a} 
						//onClickHandler={this.rotateImageClockwise}
						title='Outfits'
						ligature="accessibility_new"
						//iconName='RotateClockwiseIcon'
						customButtonStyles={customButtonStyles}
						ligatureStyles={ligatureStyles}
						ligatureContainerStyles={ligatureContainerStyles} 
						/>
					<Button
						buttonType={OxiAppConstants.ControlConstants.ButtonTypes.a} 
						//onClickHandler={this.rotateImageClockwise}
						title='Apparel'
						ligature="local_offer"
						//iconName='RotateClockwiseIcon'
						customButtonStyles={customButtonStyles}
						ligatureStyles={ligatureStyles}
						ligatureContainerStyles={ligatureContainerStyles}
						/>
				</div>
				{/*<ControlButton 
					name='Outfits' 
					browseSelection={this.props.browseSelection} 
					selectBrowserType={(name) => this.props.selectBrowserType(name)} 
					showFilterMenu={() => this.props.showFilterMenu()}
					hideFilterMenu={() => this.props.hideFilterMenu()}
					positionMenu={(positionx, positiony) => this.props.positionMenu(positionx, positiony)}
					filterVisible={this.props.filterVisible}
					getItems={(filter) => this.props.getItems(filter)}
					getOutfits={(filter) => this.props.getOutfits(filter)} />
				<ControlButton 
					name='Apparel' 
					browseSelection={this.props.browseSelection} 
					selectBrowserType={(name) => this.props.selectBrowserType(name)}
					showFilterMenu={() => this.props.showFilterMenu()}
					hideFilterMenu={() => this.props.hideFilterMenu()}
					positionMenu={(positionx, positiony) => this.props.positionMenu(positionx, positiony)}
					filterVisible={this.props.filterVisible}
					getItems={(filter) => this.props.getItems(filter)}
					getOutfits={(filter) => this.props.getOutfits(filter)} />
				<BrowseFilterMenuContainer />*/}
			</React.Fragment>
		);
	}
}

export default BrowseControl;