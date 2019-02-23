import React from 'react';
import PropTypes from 'prop-types';
import OutfitStyles from '../../outfit.css';
import {OutfitAddDelete} from './OutfitTileCtrls.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {SvgIcon} from '../SvgAssets/SvgIcon.js';

/*const statistic = (props) => (
)*/

export const OutfitSocialStatistics = (props) => (
	<div className={props.webAppView === OxiAppConstants.navRequestMap.profile.toLowerCase() ? OutfitStyles.SocialStatsContainer : OutfitStyles.SocialStatsContainerHome} >
		<div className={OutfitStyles.socialStatsIconContainer} >
				<SvgIcon className={OutfitStyles.socialStatsIcon} name="HeartIcon" fill="none" stroke="#666" strokeWidth="3"/>
		</div>
		<div className={OutfitStyles.socialStatsIconContainer} >
				<SvgIcon className={OutfitStyles.socialStatsIcon} name="FollowIcon" fill="none" stroke="#666" strokeWidth="2.5"/>
		</div>
	</div>
);