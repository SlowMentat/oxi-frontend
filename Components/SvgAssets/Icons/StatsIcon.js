import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class StatsIcon extends React.Component{
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
					<path d="m7.5 42.5 8.1001-13.976 12.221 7.0507 11.516-27.498 7.9908 6.3457" fill="none" stroke="#6e6e6e" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
				</g>
				<g stroke="#000" stroke-linecap="round">
					<circle cx="39.413" cy="8.2338" r="3.3784" stroke-dashoffset="85.709" stroke-width="1.6676"/>
					<path d="m47.328 47.326h-44.655v-44.655" fill="none" stroke-width="2"/>
					<circle cx="27.824" cy="35.42" r="3.3784" stroke-dashoffset="85.709" stroke-width="1.6676"/>
					<circle cx="15.368" cy="28.921" r="3.3784" stroke-dashoffset="85.709" stroke-width="1.6676"/>
				</g>
			</svg>
		);
	}
}