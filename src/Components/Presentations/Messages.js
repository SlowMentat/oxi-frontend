import React from 'react';
import ReactDOM from 'react-dom';

import Styles from '../../root.scss';
import { OxiAppConstants } from '../../Util/OxiAppConstants.js';
import { SvgIcon } from '../../Components/SvgAssets/SvgIcon.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import styled from 'styled-components';


export const ComingSoonMessage = ({type}) => (
	<div className={Styles.comingSoon_div}>
		<h1 className={Styles.comingSoon_h1}>
			Comming Soon
			<i 
				class="material-icons"
				style={{
					//color:'white',
					'margin-left':'12px',
				}}
			>
				construction
			</i>
		</h1>
		{
			Object.keys(OxiAppConstants.messages[type]).map((msgKey, ind) => (
				<div className={Styles.msg_div}>
					{ OxiAppConstants.messages[type][msgKey] }
				</div>
			))
		}
	</div>
);