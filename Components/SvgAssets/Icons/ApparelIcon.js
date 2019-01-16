import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class ApparelIcon extends React.Component{
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
						d="m3.7794 26.121 10.33 17.126 29.971-18.077-0.44192-5.5722-5.1651-8.5633-4.7227-2.9902zm31.703-10.364a2.5 2.5 0 0 1 3.4321 0.84954 2.5 2.5 0 0 1-0.84954 3.4321 2.5 2.5 0 0 1-3.4321-0.84954 2.5 2.5 0 0 1 0.84954-3.4321z" 
						fill={fill}
						stroke={stroke} 
						stroke-linejoin="round" 
						stroke-width={strokeWidth}/>
				</g>
				<path 
					transform="scale(.26458)" 
					d="m147.43 72.086c-3.0949-2.6186-6.4333-4.1271-9.8555-4.4531-0.9514-0.08444-1.9064-0.07727-2.8613 0.02148-15.817 1.636-28.475 27.532-28.271 57.84 0.20327 30.31 13.192 53.554 29.01 51.916 15.817-1.636 28.475-27.532 28.271-57.84-0.0602-7.3754-0.89583-14.591-2.457-21.215" 
					fill="none" 
					stroke={stroke}
					stroke-dashoffset="4" 
					stroke-linecap="round" 
					stroke-linejoin="round" 
					stroke-width="6"/>
			</svg>
		);
	}
}