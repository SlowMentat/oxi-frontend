import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class CompTypeApparelIcon extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let stroke = this.props.stroke || "#000";
		let fill = this.props.stroke || "#000";
		let style = this.props.style || {width:'100%',height:'100%'};
		return(
			<svg 
				width="50mm" 
				height="50mm" 
				version="1.1" 
				viewBox="0 0 50 50" 
				xmlns="http://www.w3.org/2000/svg"
				style={style}
				>
				<g stroke={stroke}>
					<g display="none" opacity=".37821">
						<g fill={fill} stroke-width=".26458px">
							<path d="M 48.75,48.75 25,25"/>
							<path d="M 48.75,1.25 25,25"/>
							<path d="M 1.25,48.75 25,25"/>
							<path d="M 1.25,1.25 25,25 v 23.75"/>
							<path d="M 48.75,25 H 25 V 1.25"/>
							<path d="m25 25h-23.75"/>
							<path d="m48.75 25-23.75 23.75-23.75-23.75 23.75-23.75"/>
							<path d="m25 1.25 23.75 23.75"/>
						</g>
						<rect x="1.25" y="1.25" width="47.5" height="47.5" display="inline" fill-opacity=".16279" opacity="1" stroke-linecap="round" stroke-width=".5"/>
					</g>
					<path d="m25.195 39.412 12.974-1.1e-5h4.7765c5.6217-0.03712 7.0956-6.6187 0.87715-8.7041l-18.628-7.0738-18.628 7.0738c-6.2185 2.0854-4.7445 8.667 0.87716 8.7041l4.7765-3e-6h12.974" fill="none" stroke-linejoin="round" stroke-width="3.8936"/>
					<path d="m25.345 22.495 3e-6 -4.2441s3.1257-1.0036 4.2441-2.1221c1.1184-1.1184 2.1221-2.6624 2.1221-4.2441-3e-6 -1.5817-0.90616-3.2325-2.1221-4.2441-1.1319-0.94165-2.7718-1.2237-4.2441-1.2237-1.4723 0-4.2441 1.2237-4.2441 1.2237" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.8936"/>
				</g>
			</svg>
		);
	}
}