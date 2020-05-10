import React from 'react';
import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

import { TextField as RmwcTextField } from '@rmwc/textfield';
import '@rmwc/textfield/styles';



export const TextField = styled(({...otherProps}) => (
	<RmwcTextField
		{...otherProps}
	/>
))`
	${props => (`
			#textfield-${props.label}-label {
				font-size: 1.4rem;
				height: 1.4rem;
			}
			.mdc-text-field__input {
				font-size: 1.4rem;
			}
		`)
	}
`;

TextField.propTypes = {
  otherProps: PropTypes.object,
};


export const ItemTextField = ({context, type, label, onChange, toggleFocus, toggleBlur, textValue, ...otherProps}) => {
	let backgroundColorStyle = context === 0 ? 
		({'background-color':'var(--retailer-dd-field-color)'}) : 
		({'background-color':'var(--user-dd-field-color)'});

	//const inputRef = 
		//<div 
		//	className={FormStyles.nameField} 
		//	style={backgroundColorStyle}
		//>
	//		<input 
	//			value={textValue}  
	//			type="text" 
	//			name={name} 
	//			placeholder={name/*(name == 'retailer' ? ("Where'd Ya Get It") : (name))*/} 
	//			onChange={onChange} 
	//			onFocus={toggleFocus} 
	//			onBlur={toggleBlur}
	//			style={backgroundColorStyle}
	//		/>
		//</div>
	//	;

	return(
		<TextField 
			//inputRef
			value={textValue}  
			type="text" 
			label={label}
			rootProps={{
				onChange: onChange,
				onFocus: toggleFocus,
				onBlur: toggleBlur,	
			}}
			{...otherProps}
		/> 
	)
}