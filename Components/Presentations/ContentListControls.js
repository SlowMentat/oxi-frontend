import React from 'react';
import PropTypes from 'prop-types';
import ContentStyles from '../../content.css';
import {hextToBase64} from '../../Util/Misc.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import {SvgIcon} from '../SvgAssets/SvgIcon.js';


const buttonGraphic = (onClick, iconName, style, svgProperties) => (
	<div 
		className={ContentStyles.addContentBtnContainer_div}
		style={Object.assign({}, style, {
			'position': 'absolute',
			'height': '70px',
			'width':'70px',
		})} 
	> 
		<div 
			className={iconName === 'AddContentIcon' ? ContentStyles.addContentBtn_div : ContentStyles.deleteContentBtn_div}
			//style={iconName === 'DeleteIcon' ? ({width:'55%', margin:'auto'}) :({})}
			onClick={onClick}
		>
			<SvgIcon name={iconName} {...svgProperties}/>
		</div>
	</div>
);

export const AddContentButton = (props) => {
	const iconName="AddContentIcon"
	return(
		props.enabled && props.shown ?
		//AddContentButton is shown and enabled
		buttonGraphic(props.handleClick, iconName, props.style) : 
			props.shown ? 
			//AddContentButton is shown but disabled
			buttonGraphic(() => console.log("*add content button is disabled"), iconName, props.style) : 
			//invalid state
			null
	);
}

export const DeleteContentButton = (props) => {
	const iconName = "DeleteIcon";
	return(
		props.enabled && props.shown ?
			buttonGraphic(props.handleClick, iconName, props.style, {strokeWidth: 2.3}) :
				props.shown ?
				buttonGraphic(() => console.log("**delete content button is disabled"), iconName, props.style, {strokeWidth: 2.9}) :
				null
	);
}