
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import '@rmwc/list/styles';
import {
	CollapsibleList as RmwcCollapsibleList,
} from '@rmwc/list';

export {
	List,
	SimpleListItem
} from '@rmwc/list';

export const CollapsibleList = styled(({innerStyle, ...otherProps}) => (
	<RmwcCollapsibleList
		{...otherProps}
	/>
))`
	${
		props => (`
			& .rmwc-collapsible-list__children-inner{
				${Object.keys(props.innerStyle).reduce(name => `${name}:${props.innerStyle[name]};`, "")}
			}
		`)
	}
`;

CollapsibleList.propTypes = {
	otherProps: PropTypes.object,
	innerStyle: PropTypes.object,
};

CollapsibleList.defaultProps = {
	innerStyle: {},
	otherProps: {},
}