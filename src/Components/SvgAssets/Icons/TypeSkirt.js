import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class TypeSkirt extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let stroke = this.props.stroke || "#000";
		let fill = this.props.stroke || "#000";
		return(
			<svg 
				width="50mm" 
				height="50mm" 
				version="1.1" 
				viewBox="0 0 50 50" 
				xmlns="http://www.w3.org/2000/svg"				
				style={{'width':'100%','height':'100%'}}>
				<g>
					<path 
						transform="scale(.26458)" 
						d="m67.986 10.164s-0.50976 4.25-0.75977 12.562c-0.25002 8.3125-0.19336 13.68-0.19336 13.68 0 5.2802 1.0539 10.56 3.166 15.84 2.1121 5.2802 3.7971 10.597 3.168 15.84-0.57192 4.7655-4.11 10.859-6.3359 25.346-2.7671 21.177-2.1133 22.833-2.1133 55.57h59.141c0-32.737 0.65379-34.393-2.1133-55.57-2.2259-14.487-5.764-20.58-6.3359-25.346-0.62919-5.2426 1.0559-10.56 3.168-15.84 2.1121-5.2802 3.168-10.56 3.168-15.84 0 0 0.05471-5.3672-0.19531-13.68-0.25002-8.3125-0.5625-12.562-0.5625-12.562h-53.201zm5.6875 5.75h41.826c0 2e-6 0.125 1.9375 0.3125 7.375l0.21094 13.117c0 5.2802-1.0559 10.56-3.168 15.84-2.1121 5.2802-3.7971 10.597-3.168 15.84h-30.398c0.62918-5.2426-1.0559-10.56-3.168-15.84-2.1121-5.2802-3.166-10.56-3.166-15.84l0.40625-13.117c0.1875-5.4375 0.3125-7.375 0.3125-7.375z" 
						stroke={stroke}
						fill={fill}
						stroke-linecap="round" 
						stroke-linejoin="round" 
						stroke-width="1.1187"/>
				</g>
			</svg>
		);
	}
}