import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class OutfitCoverIcon extends React.Component{
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
				<g stroke="#000" stroke-linejoin="round">
					<g transform="matrix(.90525 0 0 .91986 -2.2416 -1.3189)">
						<path d="m30.443 9.6635a5.8503 7.9553 21.989 0 0-6.7433 5.7397 5.8503 7.9553 21.989 0 0 1.2283 8.5048 10.245 18.963 0 0 0-8.7214 18.736 10.245 18.963 0 0 0 0.08888 2.3562h20.31a10.245 18.963 0 0 0 0.09199-2.3562 10.245 18.963 0 0 0-6.9531-17.937 5.8503 7.9553 21.989 0 0 4.9888-5.3939 5.8503 7.9553 21.989 0 0-2.712-9.3972 5.8503 7.9553 21.989 0 0-1.5782-0.25206z" fill="#dcdcdc" stroke-width=".68931"/>
						<path d="m10 5h32.5v40h-32.5z" fill="none" stroke-width="1.1817"/>
					</g>
					<path d="m10.638 40.058v3.7803h29.344v-36.701h-3.7637" fill="none" stroke-width=".71854"/>
					<path d="m13.991 43.75v3.4412h29.344v-36.701h-3.2603" fill="none" stroke-width=".71854"/>
				</g>
			</svg>
		);
	}
}