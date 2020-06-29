import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { 
	Checkbox as RmwcCheckbox, 
	Tab as RmwcTab,
} from '@rmwc/checkbox';

import '@rmwc/checkbox/styles';


export const Checkbox = styled(({...otherProps}) => (
	<RmwcCheckbox
		{...otherProps}
	/>
))`
	${
		props => (`
		`)
	}
`;

Checkbox.propTypes = {
  	otherProps: PropTypes.object,
};