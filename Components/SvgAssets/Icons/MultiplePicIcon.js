import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class MultiplePicIcon extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let stroke = this.props.stroke || "#000";
		let fill = this.props.fill || "none";
		let strokeWidth = this.props.strokeWidth || 15;
		let style = this.props.style || {};
		return(
			<svg 
				width="50mm" 
				height="50mm" 
				version="1.1" 
				viewBox="0 0 50 50" 
				xmlns="http://www.w3.org/2000/svg"	
				className={this.props.className || null}
				style={style}			
				>
					{/*<g fill="none" stroke="#000" stroke-linecap="round" stroke-width="4">
						<rect x="10" y="3.75" width="30" height="30" ry="4.6875" stroke-dashoffset="85.709" stroke-linejoin="round"/>
						<path d="m25 45h-9.5s-4.25 0.25-5.75-2.5m15.25 2.5h9.5s4.25 0.25 5.75-2.5"/>
					</g>*/}
					<g>
						<g transform="rotate(90 25 24.378)" fill={fill} stroke={stroke} stroke-linecap="round" stroke-width="4">
							<rect x="10" y="3.75" width="30" height="30" ry="4.6875" stroke-dashoffset="85.709" stroke-linejoin="round"/>
							<path d="m25 45h-9.5s-4.25 0.25-5.75-2.5m15.25 2.5h9.5s4.25 0.25 5.75-2.5"/>
						</g>
					</g>
			</svg>
		);
	}
}