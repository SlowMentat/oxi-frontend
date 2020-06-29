
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { 
	TabBar as RmwcTabBar, 
	Tab as RmwcTab,
} from '@rmwc/tabs';

import '@rmwc/tabs/styles';


export const TabBar = styled(({...otherProps}) => (
	<RmwcTabBar
		{...otherProps}
	/>
))`
	${
		props => (`
		`)
	}
`;

TabBar.propTypes = {
  	otherProps: PropTypes.object,
};

export const Tab = styled(({underline, ...otherProps}) => (
	<RmwcTab
		{...otherProps}
	/>
))`
	${
		props => (`
			${
				props.underline ? 
					null : 
					`& .mdc-tab-indicator__content--underline {
						align-self: flex-start;
					}
					& .mdc-tab-indicator .mdc-tab-indicator__content--underline {
						height: var(--mobile-footer-height); background-color: var(--color-02)
					}
					& .mdc-tab-indicator .mdc-tab-indicator__content--underline{
						border-color: white;		
					}`
			}
		`)
	}
`;

Tab.propTypes = {
	underline: PropTypes.bool,
  	otherProps: PropTypes.object,
};