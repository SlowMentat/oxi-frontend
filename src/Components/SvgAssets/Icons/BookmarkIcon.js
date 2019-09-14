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
		let strokeWidth = this.props.strokeWidth || "1.4";
		let style = this.props.style || {'width':'100%','height':'100%'};

		return(
			<svg 
				width="50mm" 
				height="50mm" 
				version="1.1" 
				viewBox="0 0 50 50" 
				xmlns="http://www.w3.org/2000/svg"				
				style={style}>
				<g>
					<path 
						d="m40.831 48.747v-47.497h-31.665v47.497l15.832-10.555 15.832 10.555" 
						fill={fill} 
						stroke={stroke} 
						stroke-linecap="round" 
						stroke-linejoin="round" 
						stroke-width={strokeWidth}/>
				</g>
			</svg>
		);
	}
}