import React from 'react';
import PropTypes from 'prop-types';
import FormStyles from '../../forms.scss';

//CSS Styles

import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

//import DeleteIcon from '../SvgAssets/Icons/DeleteIcon.js',
//import EditIcon from '../SvgAssets/Icons/EditIcon.js',
import {SvgIcon} from '../SvgAssets/SvgIcon.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';



export const InputTextField = ({context, type, name, onChange, toggleFocus, toggleBlur, textValue}) => {
	let backgroundColorStyle = context === 0 ? 
		({'background-color':'var(--retailer-dd-field-color)'}) : 
		({'background-color':'var(--user-dd-field-color)'});
	return(
		<div 
			className={FormStyles.nameField} 
			style={backgroundColorStyle}
		>
			<input 
				value={textValue} 
				type="text" 
				name={name} 
				placeholder={name/*(name == 'retailer' ? ("Where'd Ya Get It") : (name))*/} 
				onChange={onChange} 
				onFocus={toggleFocus} 
				onBlur={toggleBlur}
				style={backgroundColorStyle}
			/>
		</div>	
	)
}

