import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { 
	MenuSurfaceAnchor as RmwcMenuSurfaceAnchor, 
	Menu as RmwcMenu,
	MenuItem as RmwcMenuItem,
} from '@rmwc/menu';

import '@rmwc/menu/styles';

export const MenuSurfaceAnchor = styled(({...otherProps}) => (
	<RmwcMenuSurfaceAnchor
		{...otherProps}
	/>
))`
	${
		props => (`
		`)
	}
`;

export const Menu = styled(({...otherProps}) => (
	<RmwcMenu
		{...otherProps}
	/>
))`
	${
		props => (`
		`)
	}
`;

Menu.propTypes = {
  otherProps: PropTypes.object,
};

export const MenuItem = styled(({fontSize = '1.2rem', ...otherProps}) => (
	<RmwcMenuItem
		{...otherProps}
	/>
))`
	${
		props => (`
			& .mdc-list {
				font-size: ${props.fontSize || '1.4rem'};
			}
		`)
	}
`;

MenuItem.propTypes = {
	fontSize: PropTypes.string,
  	otherProps: PropTypes.object,
};