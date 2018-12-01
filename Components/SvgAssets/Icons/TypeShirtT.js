import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class TypeShirtT extends React.Component{
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
				<g 
					stroke={stroke} 
					stroke-width=".3975">
					<path 
						d="m17.5 6.2496c-1.875 0-5.2495 1.59e-4 -7.4995 3.7501l-7.5003 11.25 6.7499 4.8749 4.5005-6.7499v24.375h22.499v-24.375l4.5005 6.7499 6.7499-4.8749-7.5003-11.25c-2.25-3.75-5.6245-3.7501-7.4995-3.7501h-1.8751c0 0.75-1.1251 1.8751-1.8751 1.8751h-7.5003c-0.75 1.5e-6 -1.8751-1.1251-1.8751-1.8751z" 
						stroke-linejoin="round"
						fill={fill}/>
					<path 
						d="m19.375 6.2499h11.25" 
						fill={"none"}/>
				</g>
			</svg>
		);
	}
}