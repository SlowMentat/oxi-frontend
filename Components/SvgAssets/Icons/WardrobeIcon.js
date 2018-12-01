import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class WardrobeIcon extends React.Component{
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
				style={{'width':'100%','height':'100%'}}>
				<g>
					<path d="m16.627 7.0438v-2.0538c-1.1414 1.2e-6 -2.2828 1.2e-6 -3.4242 2.5e-6 -1e-6 -1.1414-1e-6 -2.2828-1e-6 -3.4242l-2.0538 1.2e-6c0 1.1414 1e-6 2.2828 1e-6 3.4242-1.1414 0-2.2828 0-3.4242 1.2e-6l1.3e-6 2.0538h3.4242c0 1.1414 0 2.2828 1e-6 3.4242h2.0538v-3.4242z" fill-opacity=".98605" stroke="#000" stroke-linejoin="round" stroke-width=".080046"/>
					<g fill={fill} stroke={stroke}>
						<g stroke-linecap="round" stroke-width="1.1291">
							<path d="m33.073 9.4401v14.748"/>
							<path d="m36.045 9.4401v14.748"/>
							<path d="m39.017 9.4401v14.748"/>
						</g>
						<path 
							d="m22.673 6.7586h17.83" 
							stroke-width="2.2583"/>
						<g 
							stroke-linecap="round" 
							stroke-width="1.1291">
							<path d="m30.102 9.4401v21.452"/>
							<path d="m27.13 9.4401v21.452"/>
							<path d="m24.158 9.4401v21.452"/>
						</g>
					</g>
					<path 
						d="m41.988 48.322h2.9718v-47.072h-26.745v47.072h2.9718l1.63e-4 -5.363c0.59433-1.877 2.9716-3.2178 5.9433-4.0222h8.9149c2.9716 0.80445 5.349 2.1452 5.9433 4.0222zm-20.737-44.245h20.737v33.519h-20.737z" 
						fill-opacity=".98605" 
						stroke={stroke} 
						stroke-width=".29875px"/>
					<g aria-label="1">
						<path 
							d="m1.3896 12.213v-1.683h2.5827v-6.515l-2.2492 1.2409-0.62047-1.5434 3.2187-1.6985h1.59v8.516h2.2259v1.683z" 
							stroke-width=".33092"/>
					</g>
				</g>
			</svg>
		);
	}
}