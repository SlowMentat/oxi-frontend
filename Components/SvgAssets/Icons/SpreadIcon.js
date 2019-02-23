import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class SpreadIcon extends React.Component{
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
					<g transform="matrix(.7422 .27014 -.27014 .7422 19.886 -.44438)" stroke="#000" stroke-dashoffset="22.677" stroke-linecap="round">
						<rect x="10" y="6.25" width="30" height="37.5" fill="none" stroke-linejoin="round" stroke-width="1.6771"/>
						<rect x="13" y="10" width="24" height="23.75" stroke-width="1.1935"/>
					</g>
				</g>
				<g transform="matrix(.78984 0 0 .78984 5.2541 .93874)" stroke="#000" stroke-dashoffset="22.677" stroke-linecap="round">
					<rect x="10" y="6.25" width="30" height="37.5" fill="#fff" stroke-linejoin="round" stroke-width="1.6771"/>
					<rect x="13" y="10" width="24" height="23.75" stroke-width="1.1935"/>
				</g>
				<g transform="matrix(.78984 0 0 .78984 -1.4332 5.1183)" stroke="#000" stroke-dashoffset="22.677" stroke-linecap="round">
					<rect transform="rotate(-20)" x="-.058188" y="13.293" width="30" height="37.5" fill="#fff" stroke-linejoin="round" stroke-width="1.6771"/>
					<rect transform="rotate(-20)" x="2.9418" y="17.043" width="24" height="23.75" fill="#000006" stroke-width="1.1935"/>
				</g>
			</svg>
		);
	}
}