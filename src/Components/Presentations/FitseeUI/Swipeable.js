import React from 'react';
import PropTypes from 'prop-types';

import { 
	useSwipeable, 
	Swipeable as ReactSwipeable,
	//LEFT as _LEFT,
	//RIGHT as _RIGHT,
	//UP as _UP,
	//DOWN as _DOWN,
} from 'react-swipeable';


export { LEFT } from 'react-swipeable';
export { RIGHT } from 'react-swipeable';
export { UP } from 'react-swipeable';
export { DOWN } from 'react-swipeable';

export const Swipeable = (props) => {
	const {
		eventCallback,
		refCallback,
		innerRef,
		onSwiped,
	} = props;

	const {
		children,
		delta,
	} = props;

	return(
		<ReactSwipeable 
			onSwiped={
				(e) => {
					var dist = Math.sqrt(Math.pow(e.absX, 2) + Math.pow(e.absY, 2));
					var velocityX = e.velocity * Math.sqrt(Math.pow(dist, 2) - Math.pow(e.absY, 2)) / dist;
					
					if(velocityX > 0.7) onSwiped(e);
				}
			}
			delta={delta}
			innerRef={innerRef}
		>
			{children}
		</ReactSwipeable>
	);
};

Swipeable.propTypes = {
	props: PropTypes.object,
};