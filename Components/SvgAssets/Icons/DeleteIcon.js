
import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class DeleteIcon extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		//let crossColor = this.props.hovered ? "#ff8080" : "#000";
		let crossColor = this.props.crossColor || "#000";
		let strokeWidth = this.props.strokeWidth || ".31216";
		return(
			<div style={{height:'100%', width:'100%'}}>
				<svg 
					width="50mm" 
					height="50mm" 
					version="1.1" 
					viewBox="0 0 50 50" 
					xmlns="http://www.w3.org/2000/svg"				
					style={{'width':'100%','height':'100%'}}>
					<g>
						<path 
							d="m23.27 25c-5.6732-5.6732-11.346-11.346-17.02-17.02l1.7303-1.7303c5.6732 5.6732 11.346 11.346 17.02 17.02 5.6732-5.6732 11.346-11.346 17.02-17.02l1.7303 1.7303c-5.6732 5.6732-11.346 11.346-17.02 17.02 5.6732 5.6732 11.346 11.346 17.02 17.02l-1.7303 1.7303c-5.6732-5.6732-11.346-11.346-17.02-17.02l-17.02 17.02-1.7303-1.7303 17.02-17.02z" 
							stroke={crossColor}
							fill={crossColor}
							stroke-linejoin="round" 
							stroke-width={strokeWidth}/>
					</g>
				</svg>
			</div>
		);
	}
}
/*
					<g>
						<rect x="1.25" y="1.25" width="47.5" height="47.5" ry="4.75" fill="#f4f9f3" fill-opacity=".065116" stroke="#000" stroke-linejoin="round" stroke-width=".8"/>
					</g>
					<g>
						<rect x="3.2292" y="3.2292" width="43.542" height="43.542" ry="4.3542" fill="none" stroke="#000" stroke-linejoin="round" stroke-opacity=".16744" stroke-width="1.2"/>
					</g>
					*/