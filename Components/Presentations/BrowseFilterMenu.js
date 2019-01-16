import React from 'react';
import PropTypes from 'prop-types';

//CSS Styles

import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

//import DeleteIcon from '../SvgAssets/Icons/DeleteIcon.js',
//import EditIcon from '../SvgAssets/Icons/EditIcon.js',
import {SvgIcon} from '../SvgAssets/SvgIcon.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import menuStyles from '../../menu.css';

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

class BrowseFilterMenu extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let nameLowerCased = this.props.browseSelection.toLowerCase();
		let apparelFilters = Object.keys(filters.apparel);									
		let outfitsFilters = Object.keys(filters.outfits);
		return(
			<div 
				className={menuStyles.menuContainer_div}
				style={{
					'display': this.props.filterMenuVisible ? 'block' : 'none',
			    	'left': `${this.props.filterMenuPositionx}`,
			    	'top': `${this.props.filterMenuPositiony}`,				
				}}>
				<div>
					<div className={menuStyles.menuTitleContainer_div}>
			   		 <SvgIcon name='MenuPointer' />
			   		</div>
			   		<div>
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
					</div>
				</div>
			</div>
		);
	}
}

export default BrowseFilterMenu;