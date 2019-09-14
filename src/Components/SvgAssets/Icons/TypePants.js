import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class TypePants extends React.Component{
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
				<g>
					<path 
						d="m14.383 4.75v2.6543h9.29v1.858h-9.29v38.488h9.29v-29.198h2.6544v29.198h9.29v-38.488h-9.29v-1.858h9.29v-2.6543h-10.617z" 
						stroke={stroke}
						fill={fill}
						stroke-width=".28092px"/>
				</g>
			</svg>
		);
	}
}