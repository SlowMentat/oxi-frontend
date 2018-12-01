import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class TypeJacket extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let stroke = this.props.stroke || "#000";
		let fill = this.props.stroke || "#000";
		return(
			<svg 
				width="50mm" 
				height="50mm" 
				version="1.1" 
				viewBox="0 0 50 50" 
				xmlns="http://www.w3.org/2000/svg"				
				style={{'width':'100%','height':'100%'}}>
				<g stroke={stroke}>
					<path d="m25 44.473v-17.906" fill="none" stroke-width=".23688px"/>
					<g 
						stroke-width=".23688px"
						fill={fill} >
						<path 
							d="m25 44.473v-17.906c0-2.2382-0.81163-16.444-5.1479-16.787-2.9095 0-7.2348 1.3429-9.9206 5.3717-2.6859 3.805-3.1925 9.0269-3.3573 10.52-0.29619 1.8926-0.48495 13.982-0.47562 17.423 0.00121 0.44576 0.027978 1.3783 1.5947 1.3783h3.3573c1.3429 0 1.2566-1.1189 1.2628-1.2964 0.08013-2.2847 0.97542-14.595 1.8707-18.176l0.44764 17.906c0 0.89529 0.44743 1.5668 1.3427 1.5668h9.0256"/>
						<path 
							d="m25 44.473v-17.906c0-2.2382 0.81163-16.444 5.1479-16.787 2.9095 0 7.2348 1.3429 9.9206 5.3717 2.6859 3.805 3.1925 9.0269 3.3573 10.52 0.29619 1.8926 0.48495 13.982 0.47562 17.423-0.0012 0.44576-0.02798 1.3783-1.5947 1.3783h-3.3573c-1.3429 0-1.2566-1.1189-1.2628-1.2964-0.08013-2.2847-0.97542-14.595-1.8707-18.176l-0.44764 17.906c0 0.89529-0.44743 1.5668-1.3427 1.5668h-9.0256"/>
					</g>
					<g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3429">
						<path d="m11.571 47.158v-2.6859m-4.4764 0v2.6859h4.4764"/>
						<path d="m38.429 47.158v-2.6859m4.4764 0v2.6859h-4.4764"/>
						<path d="m33.953 44.473v2.6859h-8.9529m-8.9529-2.6859v2.6859h8.9529"/>
					</g>
					<g fill="none" stroke-linecap="round">
						<path d="m17.166 10.899c2.2382-2.2382 13.429-2.2382 15.668 0" stroke-width="1.3429"/>
						<path d="m14.928 10.899c1.1191-4.4764 4.4764-6.7147 10.101-6.7145 5.5667 1.355e-4 8.924 2.2381 10.043 6.7145" stroke-width="1.7906"/>
					</g>
				</g>
			</svg>
		);
	}
}