import React from 'react';
import PropTypes from 'prop-types';
import OutfitStyles from '../../outfit.css';
import {OutfitEditDelete} from './OutfitTileCtrls.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {SvgIcon} from '../SvgAssets/SvgIcon.js';

/*const statistic = (props) => (
)*/

export const OutfitSocialStatistics = (props) => (
	<div className={props.webAppView === OxiAppConstants.navRequestMap.b.toLowerCase() ? OutfitStyles.likesContainer_div : OutfitStyles.likesContainerHome_div} >
		<div className={OutfitStyles.likesStats_div}>
			<div className={OutfitStyles.likesHeader_div}>
				Likes
			</div>
			<div className={OutfitStyles.likesValue_div}>
				3.6k
			</div>
		</div>
		<div className={OutfitStyles.likesBtn_div} >
				<SvgIcon className={OutfitStyles.likesBtn_svg} name="HeartIcon" fill="none" stroke="#666" strokeWidth="3"/>
		</div>
		{/*<div className={OutfitStyles.likesBtn_div} >
				<SvgIcon className={OutfitStyles.likesBtn_svg} name="FollowIcon" fill="none" stroke="#666" strokeWidth="2.5"/>
		</div>*/}
	</div>
);