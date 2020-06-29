import React from 'react';
import PropTypes from 'prop-types';

import { 
	Swipeable,
	LEFT,
	RIGHT,
	UP,
	DOWN,
} from '../../Components/Presentations/FitseeUI/Swipeable.js';


export const Carousel = ({className, ...props}) => {
	const {
		innerRef,
		swipeCallback,
		ref,
	} = props;

	const {
		size,
		index,
		swipeableRef,
		children,
	} = props;

	return(
		<div 
			id="carousel"
			className={className}
			//ref={innerRef}
			//style={imgFormStyle}
			//ref={ref}
		>
			<Swipeable 
				onSwiped={
					(e) => swipeCallback(e)
				}
				delta={30}
				innerRef={swipeableRef} 
				//innerRef={(div) => {
				//	if(div){
				//		div.style.height = '100%';
				//		isDevice ? null : div.style.maxWidth = 'calc(75vh - 20px)';
				//	}
				//}} 
			>
				<div 
					style={{
						height: '100%',
						display: 'flex',
						'justify-content': 'flex-start',
						'align-items': 'center',
						//'max-width': `${isDevice ? `calc(75vh - 20px)` : `unset`}`,
						width: (isDevice ? `calc(100vw * ${size})` : `calc((75vh - 20px) * ${size})`),
						transition: 'transform 300ms ease-in-out',
						transform: `translateX(${(-100 / size) * index}%)`,
						'will-change':'transform',
					}}
				>
					{ children }
				</div>
			</Swipeable>
		</div>
	);
}

Carousel.propTypes = {
  props: PropTypes.object,
};