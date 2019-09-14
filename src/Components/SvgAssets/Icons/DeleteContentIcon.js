
import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class DeleteContentIcon extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<svg 
				width="50mm" 
				height="50mm" 
				version="1.1" 
				viewBox="0 0 50 50" 
				xmlns="http://www.w3.org/2000/svg"				
				style={{'width':'100%','height':'100%'}}>

				<g display="none" opacity=".37821" stroke="#000">
					<g fill="none" stroke-width=".26458px">
						<path d="M 48.75,48.75 25,25"/>
						<path d="M 48.75,1.25 25,25"/>
						<path d="M 1.25,48.75 25,25"/>
						<path d="M 1.25,1.25 25,25 v 23.75"/>
						<path d="M 48.75,25 H 25 V 1.25"/>
						<path d="m25 25h-23.75"/>
						<path d="m48.75 25-23.75 23.75-23.75-23.75 23.75-23.75"/>
						<path d="m25 1.25 23.75 23.75"/>
					</g>
					<rect 
						x="1.25" y="1.25" 
						width="47.5" 
						height="47.5" 
						display="inline" 
						fill-opacity=".16279" 
						opacity="1" 
						stroke-linecap="round" 
						stroke-width=".5"/>
				</g>
				<g transform="matrix(.5632 -.5632 .5632 .5632 -4.0848 25)">
					<path 
						d="m32.536 39.432 6.8968-6.8968-8.0062-8.0062 11.499-11.499-6.8968-6.8968-11.499 11.499-11.499-11.499-6.8968 6.8968 11.499 11.499-11.499 11.499 6.8968 6.8968 11.499-11.499z" 
						fill="none" 
						stroke="#000" 
						stroke-linejoin="round" 
						stroke-width="1.888"/>
				</g>
				<path 
					d="m40.376 21.376 4.6758 3.5932-4.7072 3.6584z" 
					stroke="#000" 
					stroke-linecap="round" 
					stroke-linejoin="round" 
					stroke-width="1.7339"/>
			</svg>
		);
	}
}