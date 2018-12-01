
import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class EditIcon extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let writingColor = this.props.writingColor || "#505050";
		let penColor = this.props.penColor || "#000001";
		let borderColor = this.props.borderColor || "#000";
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
						<rect x="1.25" y="1.25" width="47.5" height="47.5" ry="4.75" fill={borderColor} fill-opacity=".065116" stroke={borderColor} stroke-linejoin="round" stroke-width=".8"/>
					</g>	
					
					<g fill={writingColor} stroke={writingColor} stroke-linejoin="round" stroke-width="1.2929">
						<path transform="scale(.26458)" d="m23.885 27.023v15.262h85.363c5.0872-5.0873 10.174-10.174 15.262-15.262h-100.63z"/>
						<path transform="scale(.26458)" d="m23.885 64.889v15.262h47.498l15.262-15.262h-62.76zm137.65 0c-5.0873 5.0873-10.174 10.174-15.262 15.262h18.672v-15.262h-3.4102z"/>
						<path transform="scale(.26458)" d="m23.885 103.46v15.264h18.551l8.5273-15.264h-27.078zm99.074 0-15.264 15.264h57.246v-15.264h-41.982z"/>
						<path transform="scale(.26458)" d="m23.885 140.89v11.043l6.1699-11.043h-6.1699zm56.484 0-27.322 15.262h111.89v-15.262h-84.572z"/>
					</g>
					<g stroke={penColor} stroke-linejoin="round" stroke-width="1.153">
						<path d="m22.883 33.509 6.3926-6.3926c3.5526-3.5526 7.1052-7.1053 10.658-10.658l-6.3926-6.3926c-3.5526 3.5526-7.1052 7.1053-10.658 10.658l-6.3926 6.3926z" fill={penColor} fill-opacity=".98605"/>
						<path d="m14.885 28.723 6.3926 6.3926-14.483 8.0903z" fill={penColor} fill-opacity=".98605"/>
						<path d="m37.829 5.7785-2.7006 2.7001 6.3929 6.3929 2.7001-2.7006z" fill={penColor} fill-opacity=".98605"/>
					</g>
				</svg>
			</div>
		);
	}
}