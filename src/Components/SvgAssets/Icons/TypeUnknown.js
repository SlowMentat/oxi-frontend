import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class TypeUnknown extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let stroke = this.props.stroke || "#FFF";
		let fill = this.props.stroke || "FFF";
		return(
			<svg 
				width="50mm" 
				height="50mm" 
				version="1.1" 
				viewBox="0 0 50 50" 
				xmlns="http://www.w3.org/2000/svg"				
				style={{'width':'100%','height':'100%'}}>
				<g 
					stroke-width="1.41" 
					stroke={stroke}
					fill={fill}
					aria-label="?">
					<path 
						d="m21.825 38.615h5.5903v6.9948h-5.5903zm5.4251-4.0482h-5.2599v-4.2409q0-2.7814 0.77108-4.5714t3.2496-4.1583l2.4785-2.4509q1.5697-1.4595 2.2582-2.7539 0.716-1.2943 0.716-2.6437 0-2.4509-1.8175-3.9656-1.79-1.5146-4.7642-1.5146-2.1755 0-4.654 0.96385-2.4509 0.96385-5.1222 2.8089v-5.1773q2.5886-1.5697 5.2323-2.3408 2.6712-0.77108 5.5077-0.77108 5.0671 0 8.1239 2.6712 3.0843 2.6712 3.0843 7.0499 0 2.0929-0.99139 3.9931-0.99139 1.8726-3.4699 4.2409l-2.4234 2.3683q-1.2943 1.2943-1.8451 2.0379-0.52323 0.716-0.74354 1.4045-0.16523 0.57831-0.24785 1.4045-0.08262 0.82616-0.08262 2.2582z" 
						stroke-width="1.41"/>
				</g>
			</svg>
		);
	}
}