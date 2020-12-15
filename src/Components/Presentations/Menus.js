

import React, { useState } from 'react';
import PropTypes from 'prop-types';

//CSS Styles

import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

//import DeleteIcon from '../SvgAssets/Icons/DeleteIcon.js',
//import EditIcon from '../SvgAssets/Icons/EditIcon.js',
import {SvgIcon} from '../SvgAssets/SvgIcon.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import menuStyles from '../../menu.css';
import { logout } from '../../Components/Actions/indexActions.js';


const Menus = (props) => {
	const {
		closeMenu,
	} = props;

	const {
		menuType,
		position,
	} = props;

	console.log('props.menuType = ', menuType);
	switch(menuType){

		// Settings
		case OxiAppConstants.MenuType.a:
			return (
				<SettingsMenu 
					menuType={menuType} 
					position={position}
					closeMenu={closeMenu}
				/>
			)

		// Messages
		case OxiAppConstants.MenuType.b:
			return (
				null
			)

		// Filters
		case OxiAppConstants.MenuType.c:
			return (
				<BrowseFilterMenu 
					menuType={menuType} 
					position={position}
					closeMenu={closeMenu}
				/>
			)

		default:
			return null
	} 
}

const getMenuTailOrientations = (tailWidth) => {
	return({
		NL: { rotation: '90deg', position:{ 'left': `${tailWidth}`, 'right': 'unset', 'top': `-${tailWidth}`, 'bottom': 'unset', } },
		NR: { rotation: '90deg', position:{ 'left': 'unset', 'right': `${tailWidth}`, 'top': `-${tailWidth}`, 'bottom': 'unset', } },
		ET: { rotation: '180deg', position:{ 'left': 'unset', 'right': `-${tailWidth}`, 'top': `${tailWidth}`,'bottom': 'unset', } },
		EB: { rotation: '180deg', position:{ 'left': 'unset', 'right': `-${tailWidth}`, 'top': 'unset', 'bottom': `${tailWidth}`, } },
		SL: { rotation: '270deg', position:{ 'left': `${tailWidth}`, 'right': 'unset', 'top': 'unset', 'bottom': `-${tailWidth}`, } },
		SR: { rotation: '270deg', position:{ 'left': 'unset', 'right': `${tailWidth}`, 'top': 'unset', 'bottom': `-${tailWidth}`, } },
		WT: { rotation: '0deg', position:{ 'left': `-${tailWidth}`, 'right': 'unset','top': `${tailWidth}`,'bottom': 'unset', } },
		WB: { rotation: '0deg', position:{ 'left': `-${tailWidth}`, 'right': 'unset', 'top': 'unset', 'bottom': `${tailWidth}`, } },
	});
}

const menuTailOrientations = getMenuTailOrientations('25px');

/* 
*  Generates the bounding box for the menus
*  @param 	{string} 		orientation			String indicating the orientation and position of the menu's tail.
*  @param 	{object}		position			object{string: top, string: bottom, string: left, string: right} integer values of menus , x, and y location.  location is interpreted from the tip of the tail.
*
*  @returns {Component?}
*/
const getBoundingBox = (orientation, position) => {
	var flip;
	// Clockwise
	var rotation = menuTailOrientations[orientation].rotation;
	console.log('getBoundingBox# position = ', position);
	return(
		(content) => (
			<div
				className={menuStyles.menuContainer_div}
				style={{
					//'display': this.props.filterMenuVisible ? 'block' : 'none',
					...position,		
				}}
			>
				<div>
					<div 
						className={menuStyles.menuTail_div}						
			   			style={{
			   				'transform': `rotate(${rotation})`,
			   				...menuTailOrientations[orientation].position,
			   			}}
					>
			   			<SvgIcon 
			   				name='MenuTail' 
			   				strokeWidth={1.5}
			   				fill={'#FFF'}
			   			/>
			   		</div>
					{ content }
				</div>
			</div>
		)
	);
}

const SettingsMenu = (props) => {
	const {
		closeMenu,
	} = props;
	
	const {
		position,
	} = props;

	const settingOptions = {
		account: (event)=>{
			console.log('account selected');
		},
		logout: (event)=>{
			console.log('logging out');
			closeMenu();
			logout();
		},
	};

	const getMenuItem = (option) => (
		<div 
			style={{cursor:'pointer'}}
			onClick={(event) => {
				settingOptions[option](event);
			}}
		>
			<div className={menuStyles.settingsItemContainer_div}>
				<div className={menuStyles.settingsItem_div}>
					<span id="menuItemText">{option}</span>
				</div>
			</div>
		</div>
	)

	const settingsContent = (
		<div className={menuStyles.settingsHeader_div}>
			<div className={menuStyles.settings_div}>
				Settings
			</div>
			{ Object.keys(settingOptions).map(option => getMenuItem(option)) }
		</div>
	)

	return(
		<React.Fragment>
			{ getBoundingBox('NR', position)(settingsContent)}
		</React.Fragment>
	);
}

const filters = {
	'outfits':{
		'views':[],
		'following':[],
		'likes':[],
		'new':[],
		'fit':[]
	},
	'apparel':{
		'bookmarked':[],
		'brand':[],
		'retailer':[],
		'designer':[],
		'new':[],
		'fit':[]
	}
};

export class BrowseFilterMenu extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const {
			position,
		} = this.props;

		let nameLowerCased = null;//this.props.browseSelection.toLowerCase();
		let apparelFilters = Object.keys(filters.apparel);									
		let outfitsFilters = Object.keys(filters.outfits);

		return(
			<React.Fragment>
				{
					getBoundingBox('NR', position)(
						<React.Fragment>
				   			<div id="filterTitle" className={menuStyles.menuTitle_div}>
								Filters
							</div>
							<div id="filters" style={{'text-align': 'center'}}>
								<ul style={{'padding-left': '0px'}}>
									{(
										nameLowerCased === 'outfits' ?
											outfitsFilters.map((value, index) => {
												return(
													<div>
														{value}
													</div>
												);
											}) :
											nameLowerCased === 'apparel' ?
												apparelFilters.map((value, index) => {
													return(
														<div>
															{value}
														</div>
													);
												}) : null
									)}
								</ul>
							</div> 
						</React.Fragment> )
				}
			</React.Fragment>
		);
	}
}

export default Menus;