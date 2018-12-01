
import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class DiscardIcon extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let crossColor = this.props.hovered ? "#ff8080" : "#000";
		return(
			<svg 
				width="50mm" 
				height="50mm" 
				version="1.1" 
				viewBox="0 0 50 50" 
				xmlns="http://www.w3.org/2000/svg"				
				style={{'width':'100%','height':'100%'}}>	
				<g stroke="#000" stroke-linejoin="round">
					<path 
						d="m33.95 9.6635a5.8503 7.9553 21.989 0 0-6.7433 5.7397 5.8503 7.9553 21.989 0 0 1.2283 8.5048 10.245 18.963 0 0 0-8.7214 18.736 10.245 18.963 0 0 0 0.08888 2.3562h20.31a10.245 18.963 0 0 0 0.09199-2.3562 10.245 18.963 0 0 0-6.9531-17.937 5.8503 7.9553 21.989 0 0 4.9888-5.3939 5.8503 7.9553 21.989 0 0-2.712-9.3972 5.8503 7.9553 21.989 0 0-1.5782-0.25206z" 
						fill="#dcdcdc" 
						stroke-width=".68931"/>
					<rect x="10" y="5" width="32.5" height="40" fill="none" stroke-width="1.1817"/>
				</g>
				<g>
					<path 
						d="m16.099 24.39 3.5207-3.5207c-1.9566-1.9566-3.9132-3.9132-5.8698-5.8698 1.9566-1.9566 3.9132-3.9132 5.8698-5.8698l-3.5207-3.5207c-1.9566 1.9566-3.9132 3.9132-5.8698 5.8698-1.9566-1.9566-3.9132-3.9132-5.8698-5.8698l-3.5207 3.5207c1.9566 1.9566 3.9132 3.9132 5.8698 5.8698-1.9566 1.9566-3.9132 3.9132-5.8698 5.8698l3.5207 3.5207 5.8698-5.8698z" 
						stroke="#000" 
						stroke-linejoin="round" 
						stroke-width=".63516"
						fill={crossColor}/>
				</g>
			</svg>
		);
	}
}

/*		
				<g fill="none" opacity=".827" stroke="#000" stroke-width=".26458px">
						<path d="m11.75 35c8.75 1.25 17.75 1.25 26.5 0" opacity="1"/>
						<path d="m11.25 30c9.25 0.5 18.25 0.5 27.5 0" opacity="1"/>
						<path d="m10.5 25h29" opacity="1"/>
						<path d="m18.75 41.25-1.25-30.75" opacity="1"/>
						<path d="m25 41.75v-31.25" opacity="1"/>
						<path d="m31.25 41.25 1.25-30.75" opacity="1"/>
						<path d="m10 20c10-0.75 20-0.75 30 0" opacity="1"/>
						<path d="m9.25 15c12-1.25 19.5-1.25 31.5 0" opacity="1"/>
						<path d="m9 12.5c11-1.25 21-1.25 32 0" opacity="1"/>
				</g>
				<g>
					<path d="m12.5 40-3.75-28.75c11.25-1.25 21.25-1.25 32.5 0l-3.75 28.75c-8.75 2.5-16.25 2.5-25 0z" fill="none" stroke="#000" stroke-width="1.3"/>
				</g>*/