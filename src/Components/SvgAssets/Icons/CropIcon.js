
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
		let className = this.props.className || null;
		let style = this.props.style;// || {'width':'100%','height':'100%'};
		return(
			<svg 
				width="50mm" 
				height="50mm" 
				version="1.1" 
				viewBox="0 0 50 50" 
				xmlns="http://www.w3.org/2000/svg"	
				style={style ? style : ({})}
				className={className} >
				<g transform="translate(0 -247)" fill="none" opacity=".984" stroke="#000">
					<path d="m0 263.31h35v33.698" opacity=".827" stroke-width="5.3825"/>
					<path d="m17.548 247v33.75h32.452" opacity=".827" stroke-dasharray="5.19230762,5.19230762" stroke-dashoffset="10.385" stroke-width="5.1923"/>
				</g>
			</svg>
		);
	}
}
