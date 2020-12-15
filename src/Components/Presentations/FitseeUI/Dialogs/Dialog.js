import React from 'react';
import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

import {
	mobileRules,
	desktopRules,
} from '../../../../mixin.js';

import { 
	Dialog as RmwcDialog, 
	DialogContent as RmwcDialogContent, 
} from '@rmwc/dialog';

import '@rmwc/dialog/styles';

export {
	DialogActions,
	DialogButton,
	DialogTitle 
} from '@rmwc/dialog';

export const Dialog = styled(({children, ...otherProps}) => (
	<RmwcDialog	{...otherProps}	>
		{ children }
	</RmwcDialog>
))`
	${
		props => (`
			& .mdc-dialog__container{
				${
					mobileRules(`
						width: 100vw;
					`)
				}
			}
			& .mdc-dialog__scrim{
				opacity: ${props.scrimOpacity};
			}
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
