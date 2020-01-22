import React from 'react';
import PropTypes from 'prop-types';
import Styles from '../root.scss';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LoaderWrapper = (props) => {

	const {
		style,
		loaded
	} = props;

	return(
		<div 
			id="loaderContainer"
			className={Styles.loadContainer_div}
			style={style}
		>
			<Loader
				visible={!loaded}
				type="Oval"
				height={50}
				width={100}
				style={{
					width:'40px',
					height: '40px',
				}}
				color="#24b0ed"
			/>
		</div>
	);
}

export default LoaderWrapper;