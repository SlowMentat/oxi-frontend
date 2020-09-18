
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import '@rmwc/list/styles';
import {
	CollapsibleList as RmwcCollapsibleList,
	ListItem as RmwcListItem,
} from '@rmwc/list';

export {
	List,
	SimpleListItem,
	ListItemGraphic,
	//ListItem,
	ListItemMeta,
	ListItemText,
	ListItemPrimaryText,
	ListItemSecondaryText,
} from '@rmwc/list';

export const CollapsibleList = styled(({innerStyle, /*listItemStyles,*/ ...otherProps}) => (
	<RmwcCollapsibleList
		{...otherProps}
	/>
))`
	${
		props => (`
			& .rmwc-collapsible-list__children-inner{
				${Object.keys(props.innerStyle).reduce((accum, name) => `${name}:${props.innerStyle[name]};`, "")}
			}
		`)
	}
`;

CollapsibleList.propTypes = {
	otherProps: PropTypes.object,
	//listItemStyles: PropTypes.object,
	innerStyle: PropTypes.object,
};

CollapsibleList.defaultProps = {
	innerStyle: {},
	//listItemStyles: {},
	otherProps: {},
}

export const ListItem = styled(({innerStyle, ...otherProps}) => (
	<RmwcListItem
		{...otherProps}
	/>
))`
	${
		props => (`
			& .mdc-list-item{
				${Object.keys(props.innerStyle).reduce((accum, name) => `${name}:${props.innerStyle[name]};`, "")}
			}
		`)
	}
`;

ListItem.propTypes = {
	otherProps: PropTypes.object,
	innerStyle: PropTypes.object,
};

ListItem.defaultProps = {
	innerStyle: {},
	otherProps: {},
}
