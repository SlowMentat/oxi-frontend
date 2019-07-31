import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class OutfitCoverIcon extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let stroke = this.props.stroke || "#000";
		let fill = this.props.fill || "#000";
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
				<path d="m11.633 40.912h32.117v-30.767" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"/>
				<g fill-rule="evenodd">
					<circle cx="20" cy="13.942" r="5"/>
					<path d="m20 16.058c-4.1186 0-7.4342 3.3156-7.4342 7.4342v2.7879c0 0.48311 0.04769 0.95433 0.13488 1.4113h14.599c0.08718-0.45695 0.13436-0.92818 0.13436-1.4113v-2.7879c0-4.1186-3.3156-7.4342-7.4342-7.4342z"/>
				</g>
				<path d="m36.25 47.692h-27.5c-6.25 0-6.25-13.75 0-13.75h27.5v-31.442h-28.75" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
				{/*<g stroke="#000" stroke-linejoin="round">
					<g transform="matrix(.90525 0 0 .91986 -2.2416 -1.3189)">
						<path d="m30.443 9.6635a5.8503 7.9553 21.989 0 0-6.7433 5.7397 5.8503 7.9553 21.989 0 0 1.2283 8.5048 10.245 18.963 0 0 0-8.7214 18.736 10.245 18.963 0 0 0 0.08888 2.3562h20.31a10.245 18.963 0 0 0 0.09199-2.3562 10.245 18.963 0 0 0-6.9531-17.937 5.8503 7.9553 21.989 0 0 4.9888-5.3939 5.8503 7.9553 21.989 0 0-2.712-9.3972 5.8503 7.9553 21.989 0 0-1.5782-0.25206z" fill="#dcdcdc" stroke-width=".68931"/>
						<path d="m10 5h32.5v40h-32.5z" fill="none" stroke-width="1.1817"/>
					</g>
					<path d="m10.638 40.058v3.7803h29.344v-36.701h-3.7637" fill="none" stroke-width=".71854"/>
					<path d="m13.991 43.75v3.4412h29.344v-36.701h-3.2603" fill="none" stroke-width=".71854"/>
				</g>*/}
			</svg>
		);
	}
}