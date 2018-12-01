import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class TypeShirtLong extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let stroke = this.props.stroke || "#000";
		let fill = this.props.stroke || "000";
		return(
			<svg 
				width="50mm" 
				height="50mm" 
				version="1.1" 
				viewBox="0 0 50 50" 
				xmlns="http://www.w3.org/2000/svg"				
				style={{'width':'100%','height':'100%'}}>
				<g 
					stroke={stroke}
					fill={fill} >
					<path 
						transform="scale(.26458)" 
						d="m66.141 23.621c-7.0866 0-19.84 6.69e-4 -28.344 14.174l-28.348 42.521v36.85l37.795 37.943 16.258-13.377-11.531-17.48-17.01-25.512 17.01-25.512v38.396l22.059 33.342-22.059 18.148v2.2383h42.516 0.001953 42.516v-2.2383l-22.059-18.148 22.059-33.342v-38.396l17.01 25.512-17.01 25.512-11.531 17.48 16.258 13.377 37.795-37.943v-36.85l-28.348-42.521c-8.5039-14.173-21.257-14.174-28.344-14.174h-7.0879c0 2.8346-4.2513 7.0859-7.0859 7.0859h-14.172-0.001953-14.172c-2.8346 6e-6 -7.0859-4.2513-7.0859-7.0859h-7.0879z" 
						stroke-linejoin="round" 
						stroke-width="1.5005"/>
					<path 
						d="m19.375 6.2499h11.25" 
						fill={fill} 
						stroke-width=".3975"/>
				</g>
			</svg>
		);
	}
}