import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class MenuTail extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let stroke = this.props.stroke || "#bababa";
		let fill = this.props.fill || "#f8f8f8";
		let strokeWidth = this.props.strokeWidth || "5";
		return(
			<svg 
				width="50" 
				height="50" 
				version="1.1" 
				viewBox="0 0 50 50"	
				style={{'width':'100%','height':'100%'}}>
				<g 
					stroke-linecap="round" 
					stroke-linejoin="round">
					<path 
						transform="scale(.26458)" 
						d="m188.98 0-103.94 89.764 103.94 99.213z" 
						fill={fill} 
						stroke={fill} 
						stroke-width={strokeWidth}/>
					<path 
						d="m50 2.84e-5 -27.5 23.75 27.5 26.25" 
						fill="none" 
						stroke={stroke} 
						stroke-width={strokeWidth}/>
				</g>
			</svg>
		);
	}
}