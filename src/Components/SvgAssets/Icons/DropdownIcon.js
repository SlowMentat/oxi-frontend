import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class DropdownIcon extends React.Component{

	constructor(props){
		super(props);
	}


	render(){
		let className = this.props.className || null;
		let style = this.props.style;// || {'width':'100%','height':'100%'};
		let fill = this.props.fill || "none";
		let stroke = this.props.stroke || "#000";

		return(
			<svg 
				width="50mm" 
				height="50mm" 
				version="1.1" 
				viewBox="0 0 50 50" 
				xmlns="http://www.w3.org/2000/svg"		
				style={style ? (style) : ({'width':'100%','height':'100%'}) }
				className={className} >
				<g>
					<path 
						d="m19.887 6.25c-1.8424 0-3.3256 1.6686-3.3256 3.7416v18.473h-9.0619l17.5 15.146 17.5-15.146h-8.75v-18.473c0-2.0729-1.4832-3.7416-3.3256-3.7416z" 
						fill={fill}
						fill-rule="evenodd" 
						stroke={stroke}
						stroke-dashoffset="85.709" 
						stroke-linecap="round" 
						stroke-linejoin="round" 
						stroke-width="1.5"/>
				</g>
			</svg>
		);
	}
}