import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Tooltip as RmwcTooltip } from '@rmwc/tooltip';
import '@rmwc/tooltip/tooltip.css';

export const Tooltip = styled(({labelSize = '1.2rem', ...otherProps}) => (
	<RmwcTooltip
		{...otherProps}
	/>
))`
	${
		props => (`
			& .mdc-button__icon {
				font-size: ${props.iconSize};
				margin-right: calc(${props.iconSize}2/3); 
			}
			& .mdc-button__label {
				font-size: ${props.labelSize};
				line-height: ${props.labelSize};
			}
		`)
	}
`;

Tooltip.propTypes = {
  otherProps: PropTypes.object,
};