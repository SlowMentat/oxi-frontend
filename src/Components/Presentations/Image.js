import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FormStyles from '../../forms.scss';
import { CircularProgress } from  '@rmwc/circular-progress';
import  '@rmwc/circular-progress/styles';


export const Image = (props) => {
	//const [imgLoaded, setImgLoaded] = useState(false);

	const {
		imgLoaded,
		onLoad,
		setupImageRef,
		src,
		showProgress,
		className,
		imgStyle,
		defaultStyle,
		onClick,
	} = props;

	return(
		<React.Fragment>
		<div
			style={imgLoaded ? 
				({
					display:'none', 
				}) : 
				({
					height:'100%',
					'background-color': '#f0f0f0',
					display:'flex',
					'justify-content':'center',
					'align-items':'center',
					...(isDevice ? ({width: '100vw'}) : ({width:'calc(var(--img-preview-modal-height)*3/4)'})),
					...defaultStyle,
				})
			}
		>
			{showProgress ? <CircularProgress size="xlarge" /> : null}
		</div>
		<img 
			src={src}
			//className={FormStyles.image_img}
			className={className}
			ref={setupImageRef ? setupImageRef : null}
			style={{
				...(imgLoaded ? ({}) : ({display:'none'}) ),
				...imgStyle,
			}}
			onLoad={(e) => onLoad(e)}
			onClick={onClick}
			crossorigin="Anonymous"
		/>
		</React.Fragment>
	);
}