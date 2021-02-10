import React from 'react';
import PropTypes from 'prop-types';
import BrowseFilterMenuContainer from '../../Components/Containers/BrowseFilterMenuContainer.js';

//CSS Styles

import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

//import DeleteIcon from '../SvgAssets/Icons/DeleteIcon.js',
//import EditIcon from '../SvgAssets/Icons/EditIcon.js',
import {SvgIcon} from '../SvgAssets/SvgIcon.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import BrowseControlStyles from '../../browseControl.scss';
//import {Button} from './Controls.js';
import '@rmwc/button/styles';
//import { Button } from '@rmwc/button';
import { Button, IconButton } from '../../Components/Presentations/FitseeUI/Buttons/index.js'; 
import styled from 'styled-components';
import { desktopRules, mobileRules } from '../../mixin.js';


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

const BrowseSelectionButton = styled(({labelSize = '12px', iconSize = '24px', ...otherProps}) => (
	<Button {...otherProps} />
))`
	display: block;
	width: 100%;
	${
		props => `
			& .mdc-button__icon {
				font-size: ${props.iconSize};
				margin-right: 16px; 
				
				${desktopRules(`
					'border-top-right-radius': '0px';
					'border-bottom-right-radius': '0px';
				`)}
			
				${mobileRules(`
					height: '100%';
				`)}
			}
			& .mdc-button__label {
				font-size: ${props.labelSize};
				line-height: ${props.iconSize};
			}
		`
	}
`;

class BrowseControl extends React.Component{
	constructor(props){
		super(props);

		this.setInnerRootStyles = this.setInnerRootStyles.bind(this);
	}

	setInnerRootStyles(el){
		el ? el.className = BrowseControlStyles.customButtonStyles : null;
	}

	render(){
		//variable 
		const {
			isMobile,
			browseSelection,
		} = this.props;

		var isOutfitBrowse = browseSelection === 'outfits';

		const customButtonStyles = {
			color:'black',
			//width:'unset',
			//'margin-bottom':'8px',
			////'border':'solid 1px gray',
			//padding:'3px',
			//height:'calc(var(--button-height) + 2*3px + 4px)',
			//'line-height':'calc(var(--button-height) + 2*3px)', 
		};

		const customButtonHighlightStyles = {
			//...customButtonStyles,
			color:'#116285',
		}

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

		const ligatureContainerHighlightedStyles = {
			//...ligatureContainerStyles,
			'border':'solid 1px var(--color6)',
			color:'var(--color6)',
		}

		const buttonStyle = {
			display: 'block',
			width: '100%',
			'border-top-right-radius': '0px',
			'border-bottom-right-radius':'0px',
		}

		return(
			<React.Fragment>	
				<div 
					className={BrowseControlStyles.buttonContainer_div}
				>
					{
						isDevice ?
							<React.Fragment>

								{
									//<IconButton
									//	icon="search"
									//	style={{color:'var(--color-01-tint-02)'}}
									//	onClick={e => console.log(e)}
									///>
								}
								<IconButton
									label="Outfits"
									icon="face"
									ripple={false}
									onClick={() => {
										this.props.selectBrowserType('outfits');
										//this.props.getOutfits('all')
									}}
									selectedStyle={{}}
									style={
										isOutfitBrowse ? 
											{
												color:'var(--color-02)',
												'border-bottom': 'solid .3rem var(--color-02-shade-01)',
											} : 
											{
												color:'var(--color-02)',
											}
									}
								/>
								<IconButton
									label="Apparel"
									icon="local_offer"
									ripple={false}
									dissableRipple={true}
									onClick={() => {
										this.props.selectBrowserType('apparel');
										this.props.getItems('all');
									}}
									selectedStyle={{}}
									style={
										isOutfitBrowse ? 
											{
												color:'var(--color-02)',
											} : 
											{
												color:'var(--color-02)',
												'border-bottom': 'solid .3rem var(--color-02-shade-01)',
											}
									}
								/>
								<div>
									<IconButton
										label="Menu"
										//icon="more_horiz"
										icon="settings"
										ripple={false}
										dissableRipple={true}
										onClick={(e) => {
											this.props.toggleMenuDrawer(e, true)
										}}
										style={{
											color: 'var(--color-01-tint-02)',
										}}
									/>
								</div>
							</React.Fragment>
							:
							<React.Fragment>
								<BrowseSelectionButton 
									label="Outfits"
									icon="face"
									//theme="primary"
									style={{
										//...buttonStyle,
										'border-radius': '0px',
									}}
									onClick={() => {
										this.props.selectBrowserType('outfits');
										//this.props.getOutfits('all')
									}}
									unelevated={isOutfitBrowse}
									labelSize="12px"
									iconSize="24px"
								/>
								<BrowseSelectionButton 
									label="Apparel"
									icon="local_offer"
									//theme="primary"
									style={{
										//...buttonStyle,
										'border-radius': '0px',
									}}
									onClick={() => {
										this.props.selectBrowserType('apparel');
										this.props.getItems('all');
									}}
									unelevated={!isOutfitBrowse}
									labelSize="12px"
									iconSize="24px"
								/>
							</React.Fragment>
					}

					{/*
					<Button
						innerRootRef={this.setInnerRootStyles}
						buttonType={OxiAppConstants.ControlConstants.ButtonTypes.a} 
						onClickHandler={() => {
							this.props.selectBrowserType('outfits');
							//this.props.getOutfits('all')
						}}
						title='Outfits'
						ligature="accessibility_new"
						//iconName='RotateClockwiseIcon'
						//customButtonStyles={
						//	{...BrowseControlStyles.customButtonStyles}
						//	//browseSelection === OxiAppConstants.browseSelection.a ?
						// 	//	customButtonHighlightStyles :
						// 	//	customButtonStyles
						//}
						ligatureContainerStyles={
							browseSelection === OxiAppConstants.browseSelection.a ? 
								ligatureContainerHighlightedStyles :
								ligatureContainerStyles
						}
						ligatureStyles={ligatureStyles}
					/>
					<Button
						innerRootRef={this.setInnerRootStyles}
						buttonType={OxiAppConstants.ControlConstants.ButtonTypes.a} 
						onClickHandler={() => {
							this.props.selectBrowserType('apparel');
							this.props.getItems('all');
						}}
						title='Apparel'
						ligature="local_offer"
						//iconName='RotateClockwiseIcon'
						//customButtonStyles={
						//	{...BrowseControlStyles.customButtonStyles}
						//	//browseSelection === OxiAppConstants.browseSelection.b ?
						// 	//	customButtonHighlightStyles :
						// 	//	customButtonStyles
						// }
						ligatureContainerStyles={
							browseSelection === OxiAppConstants.browseSelection.b ? 
								ligatureContainerHighlightedStyles :
								ligatureContainerStyles
						}
						ligatureStyles={ligatureStyles}
					/>
					*/}

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