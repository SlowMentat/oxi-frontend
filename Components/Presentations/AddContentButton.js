import React from 'react';
import PropTypes from 'prop-types';
import ContentStyles from '../../content.css';
import {hextToBase64} from '../../Util/DataFormatConverter.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import {SvgIcon} from '../SvgAssets/SvgIcon.js';


const element = (onClick) => (
	<div style={{
			'position': 'absolute',
			'margin-left': 'calc(-75px)',
			'height': '70px',
		}} > 
		<div className={ContentStyles.addContentButton} onClick={onClick}>
			<SvgIcon name="SubmitIcon"/>
		</div>
	</div>
);

export const AddContentButton = (props) => {
	return(
		props.enabled && props.shown ?
		//AddContentButton is shown and enabled
		element(props.handleClick) : 
			props.shown ? 
			//AddContentButton is shown but disabled
			element(() => console.log("*add content button is disabled")) : 
			//invalid state
			null
	);
}