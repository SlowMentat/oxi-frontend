import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class CompTypeMaleIcon extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let stroke = this.props.stroke || "#000";
		let fill = this.props.stroke || "#000";
		let style = this.props.style || {width:'100%',height:'100%'};
		return(
			<svg 
				width="50mm" 
				height="50mm" 
				version="1.1" 
				viewBox="0 0 50 50" 
				xmlns="http://www.w3.org/2000/svg"			
				style={style} >
				<g 
					fill={fill} 
					fill-opacity=".99302" 
					stroke={stroke} 
					stroke-dashoffset="85.709" 
					stroke-linecap="round" 
					stroke-linejoin="round">
					<circle 
						cx="24.111" 
						cy="7.0185" 
						r="4.8479" 
						stroke-width=".86075"/>
					<path 
						d="m12.667 18.251v12.476h2.8223v-15.665s-1.6183-0.05019-2.1295 0.43159c-0.77496 0.73034-0.69277 2.7574-0.69277 2.7574zm5.4907 29.358h4.33v-16.509h1.5967v-16.701h-5.9086v18.701zm17.351-29.358v12.476h-2.8223v-15.665s1.6183-0.05019 2.1295 0.43159c0.77496 0.73034 0.69277 2.7574 0.69277 2.7574zm-5.4907 29.358h-4.33v-16.509h-1.5967v-16.701h5.9086v18.701z" 
						stroke-width=".62614"/>
				</g>
			</svg>
		);
	}
}