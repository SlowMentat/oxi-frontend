
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import '@rmwc/list/styles';
import {
	CollapsibleList as RmwcCollapsibleList,
	ListItem as RmwcListItem,
	SimpleListItem as RmwcSimpleListItem,
} from '@rmwc/list';

const extractCSS = (styles) => {
	return(styles ? Object.keys(styles).reduce((accum, name) => `${name}:${styles[name]}`, "") : "");
}

export {
	List,
	//SimpleListItem,
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
				${extractCSS(props.innerStyle)}
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


export const SimpleListItem = styled(({innerStyle, ...otherProps}) => (
	<RmwcSimpleListItem
		{...otherProps}
	/>
))`
	${
		props => (`
			& .mdc-list-item{
				${extractCSS(props.innerStyle)}
			}

			& .mdc-list-item__graphic{
				${extractCSS(props.listIconStyle)}
			}
		`)
	}
`;

SimpleListItem.propTypes = {
	otherProps: PropTypes.object,
	innerStyle: PropTypes.object,
};

SimpleListItem.defaultProps = {
	innerStyle: {},
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
