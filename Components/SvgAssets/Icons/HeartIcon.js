import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class HeartIcon extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let stroke = this.props.stroke || "#000";
		let fill = this.props.fill || "none";
		return(
			<svg 
				width="50mm" 
				height="50mm" 
				version="1.1" 
				viewBox="0 0 50 50" 
				xmlns="http://www.w3.org/2000/svg"				
				style={{'width':'100%','height':'100%'}}>
				<g>
					<path 
						transform="scale(.26458)" d="m51.969 9.8945c-23.483 8.41e-5 -42.519 18.837-42.52 42.074 0.017964 8.9242 2.903 17.612 8.2383 24.807h-0.0625l76.863 102.31 76.566-101.83h-0.0664c5.5644-7.2822 8.5841-16.158 8.6035-25.287-1.5e-4 -23.237-19.037-42.074-42.52-42.074-23.483 8.14e-5 -42.519 18.837-42.552 42.074-0.032373-23.237-19.069-42.074-42.552-42.074z" 
						fill={fill} 
						stroke={stroke}
						stroke-linecap="round" 
						stroke-linejoin="round" 
						stroke-width="15"/>
				</g>
			</svg>
		);
	}
}