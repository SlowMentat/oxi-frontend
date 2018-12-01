import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class CommojiIcon extends React.Component{
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
				<g 
					stroke="#000" 
					stroke-linecap="round">
					<path 
						d="m25 3.9134c-11.721 7.59e-5 -21.223 7.5186-21.224 16.793 0.011041 6.9778 5.4741 13.223 13.724 15.689v2.2417c0 6.9954-4.1823 7.9093-5.81 8.0016 5.5598 1.611 13.31 0.54648 13.31-8.0016v-1.1374c11.721-7.7e-5 21.223-7.5186 21.224-16.793-1.37e-4 -9.2747-9.5022-16.793-21.224-16.793z" 
						fill={fill} 
						stroke={stroke}
						stroke-linejoin="round" 
						stroke-width="4"/>
					<path 
						d="m12.5 26.25c7.5822 4.5687 16.116 5.4162 26.25 0" 
						fill={fill} 
						stroke={stroke}
						stroke-width="4"/>
					<path 
						d="m15 17.5c2.6401-1.8075 5.1178-1.5206 7.5 0 0-2.5-1.25-6.25-3.75-6.25s-3.75 3.75-3.75 6.25z" 
						stroke-linejoin="round" 
						stroke={stroke}
						fill={stroke}
						stroke-width="1"/>
					<path 
						d="m28.75 17.5c2.6401-1.8075 5.1178-1.5206 7.5 0 0-2.5-1.25-6.25-3.75-6.25s-3.75 3.75-3.75 6.25z" 
						stroke={stroke}
						fill={stroke}
						stroke-linejoin="round" 
						stroke-width="1"/>
				</g>
			</svg>
		);
	}
}