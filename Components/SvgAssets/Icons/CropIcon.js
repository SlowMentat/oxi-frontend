
import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class CropIcon extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let folderCorner = this.props.hovered ? "16.25 268.25" : "6.25 258.25"
		let folderCornerOffset = this.props.hovered ? "11.25 11.25 27.5 -10 " : "1.25 1.25 37.5 0";
		return(
			<svg 
				width="50mm" 
				height="50mm" 
				version="1.1" 
				viewBox="0 0 50 50" 
				xmlns="http://www.w3.org/2000/svg"				
				style={{'width':'100%','height':'100%'}} >
				<g opacity=".827">
					<path d="m5 5h40v40h-40z" fill="none" stroke="#000" stroke-width="1.7"/>
				</g>
				<g opacity=".74679">
					<path transform="scale(.26458)" d="m18.898 18.898v151.18h151.18v-151.18h-151.18zm66.141 37.795h61.418v94.488h-61.418v-94.488z" fill="#7a7878" opacity=".657" stroke-width="0"/>
				</g>
				<g transform="translate(0 -247)" opacity=".984">
					<path d="m22.5 262h16.25v25h-16.25z" fill="none" stroke="#000" stroke-dasharray="1.59999999,0.8" stroke-width=".8"/>
				</g>
			</svg>
		);
	}
}
