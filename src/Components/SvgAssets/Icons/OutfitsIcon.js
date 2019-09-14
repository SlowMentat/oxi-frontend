import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class OutfitsIcon extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let stroke = this.props.stroke || "#000";
		let fill = this.props.fill || "none";
		let strokeWidth = this.props.strokeWidth || "2";
		return(
			<svg 
				width="50" 
				height="50" 
				version="1.1" 
				viewBox="0 0 50 50"	
				style={{'width':'100%','height':'100%'}}>
				<g>
					<path 
					d="m31.627 3.0324a7.0849 9.6341 21.989 0 0-8.1662 6.9509 7.0849 9.6341 21.989 0 0 1.4876 10.299 12.407 22.965 0 0 0-10.562 22.69 12.407 22.965 0 0 0 0.10764 2.8534h24.596a12.407 22.965 0 0 0 0.1114-2.8534 12.407 22.965 0 0 0-8.4203-21.722 7.0849 9.6341 21.989 0 0 6.0416-6.5321 7.0849 9.6341 21.989 0 0-3.2843-11.38 7.0849 9.6341 21.989 0 0-1.9112-0.30525z" 
					fill={fill} 
					stroke={stroke}
					stroke-linejoin="round" 
					stroke-width={strokeWidth}/>
				</g>
			</svg>
		);
	}
}