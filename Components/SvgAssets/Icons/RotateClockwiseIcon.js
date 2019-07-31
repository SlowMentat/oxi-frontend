import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class RotateClockwiseIcon extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let fill = this.props.fill || 'none';
		let stroke = this.props.stroke || '#000';
		let className = this.props.className || null;
		let style = this.props.style;// || {'width':'100%','height':'100%'};
		return(
			<svg 
				width="50" 
				height="50" 
				version="1.1" 
				viewBox="0 0 50 50"		
				style={style ? style : ({})}
				className={className}>
				
				<rect 
					transform="matrix(0,1,1,0,0,0)" 
					x="32.325" y="5.5971" 
					width="13.89" 
					height="34.464" 
					ry="2.3899" 
					stroke={stroke} 
					stroke-dashoffset="85.709" 
					stroke-linecap="round" 
					stroke-linejoin="round" 
					stroke-width="4"/>
				<g stroke={stroke}>
					<rect 
						transform="scale(-1,1)" 
						x="-40.166" y="14.561" 
						width="13.519" 
						height="31.686" 
						ry="2.1972" 
						fill='#FFF'
						stroke-dashoffset="85.709" 
						stroke-linecap="round" 
						stroke-linejoin="round" 
						stroke-width="4"/>
					<path 
						d="m-29.197-3.4645z" 
						fill={fill} 
						stroke-width=".19077px"/>
					<g 
						transform="matrix(.00025554 .29926 .29926 -.00025554 22.81 20.45)">
						<path 
							d="m-40-20h-20l20 30 20-30z" 
							stroke-linejoin="round"
							stroke-width="3"/>
						<path d="m-40-20c-2e-6 -30 10-40 40-40" 
							fill={fill} 
							stroke-linecap="round" 
							stroke-width="12.047"/>
					</g>
				</g>
			</svg>
		);
	}
}