import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class FilterIcon extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let slideStroke = this.props.slideStroke || "#6d6d6d";
		let knobStroke = this.props.knobStroke || "#6d6d6d";
		let slideFill = this.props.slideFill || "#6d6d6d";
		let knobFill = this.props.knobFill || "#FFF";
		let strokeWidth = this.props.strokeWidth || "2";
		return(
			<svg 
				width="50" 
				height="50" 
				version="1.1" 
				viewBox="0 0 50 50"	
				style={{'width':'100%','height':'100%'}}>
				
				<g stroke="#000" stroke-dashoffset="15.118" stroke-linecap="round" stroke-linejoin="round">
					<g>
			

	</g>

					<g 
						stroke-width={strokeWidth}
						fill={slideFill}
						stroke={slideStroke}>
						<rect x="2.5" y="22.5" width="43.75" height="5" />
						<rect x="2.5" y="5.5" width="43.75" height="5" />
						<rect x="2.5" y="39.5" width="43.75" height="5" />

					</g>
					<g 
						stroke-width={strokeWidth}
						fill={knobFill}
						stroke={knobStroke}>
						<rect x="7.2" y="17.5" width="9.05" height="15" stroke-dashoffset="15.118" stroke-linecap="round" stroke-linejoin="round" />
						<rect x="21.25" y=".5" width="10" height="15" stroke-dashoffset="15.118" stroke-linecap="round" stroke-linejoin="round" />
						<rect x="31.25" y="34.5" width="10" height="15" stroke-dashoffset="15.118" stroke-linecap="round" stroke-linejoin="round" />
					</g>
				</g>
			</svg>
		);
	}
}