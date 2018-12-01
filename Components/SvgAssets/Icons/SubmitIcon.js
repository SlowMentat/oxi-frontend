import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class SubmitIcon extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let folderCorner = this.props.hovered ? "16.25 268.25" : "6.25 258.25"
		let fill = this.props.hovered ? "#6dd7b4" : "#6dd7b400";
		return(
			<svg 
				width="50mm" 
				height="50mm" 
				version="1.1" 
				viewBox="0 0 50 50" 
				xmlns="http://www.w3.org/2000/svg"				
				style={{'width':'100%','height':'100%'}}>
				<g transform="translate(0 -247)" opacity=".984">
					<path d="m12 275.42 9.1868 6.0633c2.6548 1.5695 5.0568 3.1346 7.1657 0.36748l14.148-18.374-5.8796-4.5934-11.943 15.618-8.2682-5.5121z" fill={fill} stroke="#000c00" stroke-width=".73495"/>
				</g>
			</svg>
		);
	}
}