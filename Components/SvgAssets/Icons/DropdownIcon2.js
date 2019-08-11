import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class DropdownIcon2 extends React.Component{

	constructor(props){
		super(props);
	}


	render(){
		let className = this.props.className || null;
		let style = this.props.style;// || {'width':'100%','height':'100%'};
		let fill = this.props.fill || "none";
		let stroke = this.props.stroke || "#000";
		let strokeWidth = this.props.strokeWidth || "5.6693";

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
						transform="scale(.26458) translate(0,-50)" 
						d="m21.449 128.09v35.09l73.039 18.738 73.039-18.738v-35.09l-73.039 18.738-73.039-18.738z" 
						fill={fill} 
						fill-rule="evenodd" 
						stroke={stroke}
						stroke-dashoffset="85.709" 
						stroke-linecap="round" 
						stroke-linejoin="round" 
						stroke-width={strokeWidth}/>
				</g>
			</svg>
		);
	}
}