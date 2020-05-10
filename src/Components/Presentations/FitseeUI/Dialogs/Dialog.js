import React from 'react';
import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

import { 
	Dialog as RmwcDialog, 
	DialogContent as RmwcDialogContent, 
} from '@rmwc/dialog';

import '@rmwc/dialog/styles';


export const Dialog = styled(({children, ...otherProps}) => (
	<RmwcDialog	{...otherProps}	>
		{ children }
	</RmwcDialog>
))`
	${
		props => (`
		`)
	}
`;

Dialog.propTypes = {
  otherProps: PropTypes.object,
};



export const DialogContent = styled(({children, ...otherProps}) => (
	<RmwcDialogContent {...otherProps} >
		{ children }
	</RmwcDialogContent>
))`
	${
		props => (`
		`)
	}
`;

DialogContent.propTypes = {
  otherProps: PropTypes.object,
};
