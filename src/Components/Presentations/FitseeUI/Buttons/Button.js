import React from 'react';
import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

import { Button as RmwcButton } from '@rmwc/button'; 
import '@rmwc/button/styles'; 
import { IconButton as RmwcIconButton } from '@rmwc/icon-button';
import  '@rmwc/ripple/styles';


const is = '2.4rem';
const ls = '1.2rem';

export const IconButton = styled(({labelSize = '1.2rem', iconSize = '2.4rem', ...otherProps}) => {
	return(
		<RmwcIconButton
			{...otherProps}
		/>
	)
})`
	${
		props => (`
			& .mdc-button__icon {
				font-size: ${props.iconSize || is};
				margin-right: calc(${props.iconSize || is} * 2/3); 
			}
			& .mdc-button__label {
				font-size: ${props.labelSize || ls};
				line-height: ${props.labelSize || ls};
			}
		`)
	}
`;

IconButton.propTypes = {
  otherProps: PropTypes.object,
};



export const Button = styled(({labelSize = '1.2rem', ...otherProps}) => {	
	return(
		<RmwcButton
			{...otherProps}
		/>
	);
})`
	${
		props => `
			& .mdc-button .mdc-button__icon {
				font-size: ${props.iconSize || is};
				margin-right: calc(${props.iconSize || is} * 2/3); 
			}
			& .mdc-button__label {
				font-size: ${props.labelSize || ls};
				line-height: ${props.labelSize || ls};
			}
		`
	}
`;


Button.propTypes = {
  otherProps: PropTypes.object,
};