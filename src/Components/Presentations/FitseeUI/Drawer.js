import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Drawer as RmwcDrawer } from '@rmwc/drawer';

export {
	DrawerHeader,
	DrawerTitle,
	DrawerSubtitle,
	DrawerContent,
	DrawerAppContent,
} from '@rmwc/drawer';

import  '@rmwc/drawer/styles';

export const Drawer = styled(({...otherProps}) => (
	<RmwcDrawer
		{...otherProps}
	/>
))`
	${
		props => (`
			& .mdc-drawer--modal + .mdc-drawer-scrim {
				background-color: #00000087;
			}
		`)
	}
`;

Drawer.propTypes = {
  otherProps: PropTypes.object,
};