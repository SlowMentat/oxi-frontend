import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class BookmarkIcon extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let stroke = this.props.stroke || "#000";
		let fill = this.props.fill || "none";
		return(
			<svg 
				width="50mm" 
				height="50mm" 
				version="1.1" 
				viewBox="0 0 50 50" 
				xmlns="http://www.w3.org/2000/svg"				
				style={{'width':'100%','height':'100%'}}
				onClick={this.props.onClick}>
				<g>
					<path 
						d="m37.5 43.75v-37.5h-25v37.5l12.5-8.3334 12.5 8.3334" 
						fill={fill} 
						stroke={stroke} 
						stroke-linecap="round" 
						stroke-linejoin="round" 
						stroke-width="1.4"/>
				</g>
			</svg>
		);
	}
}