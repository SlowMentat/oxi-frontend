import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class OutfitCoverIcon extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		//let stroke = this.props.stroke || "#000";
		//let fill = this.props.fill || "#000";
		let className = this.props.className || null;
		let fill = this.props.fill || OxiAppConstants.iconDefaults.colors.stroke;
		let stroke = this.props.stroke || OxiAppConstants.iconDefaults.colors.stroke;
		let strokeWidth = this.props.strokeWidth || OxiAppConstants.iconDefaults.dimensions.strokeWidth;;
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
				{/*<g>
					<g transform="matrix(.94599 0 0 1 2.3631 0)">
						<g 
							fill={fill} 
							fill-rule="evenodd">
							<circle cx="20" cy="15.191" r="5"/>
							<path 
								d="m20 21.542c-4.1186 0-7.4342 3.3156-7.4342 7.4342v2.7879c0 0.48311 0.04769 0.95433 0.13488 1.4113h14.599c0.08718-0.45695 0.13436-0.92818 0.13436-1.4113v-2.7879c0-4.1186-3.3156-7.4342-7.4342-7.4342z"/>
						</g>
						<path 
							d="m4.1089 2.5h32.141v38.75h-32.141z" 
							fill="none" 
							stroke={stroke} 
							stroke-linecap="round" 
							stroke-linejoin="round" 
							stroke-width={strokeWidth}/>
					</g>
					<path 
						d="m10 47.5h32.5v-40h-5.8449v33.75h-26.655z" 
						fill={fill} 
						stroke={stroke} 
						stroke-linecap="round" 
						stroke-linejoin="round" 
						stroke-width={strokeWidth}/>
				</g>*/}
				<g>
					<path 
						transform="scale(.26458)" 
						d="m137.01 33.07v103.94c0 10.469-8.4291 18.898-18.898 18.898h-66.141v4.7246c0 10.469 8.4272 18.896 18.896 18.896h75.592c10.469 0 18.896-8.4272 18.896-18.896v-108.66c0-10.469-8.4272-18.898-18.896-18.898h-9.4492z" 
						fill={fill} 
						fill-rule="evenodd" 
						stroke="#bebebe" 
						stroke-dashoffset="85.709" 
						stroke-linecap="round" 
						stroke-linejoin="round" 
						stroke-width={strokeWidth}/>
				</g>
				<path 
					d="m11.25 2.5h20c2.77 0 5 2.23 5 5v28.75c0 2.77-2.23 5-5 5h-20c-2.77 0-5-2.23-5-5v-28.75c0-2.77 2.23-5 5-5z" 
					fill="none" 
					stroke={stroke}
					stroke-dashoffset="85.709" 
					stroke-linecap="round" 
					stroke-linejoin="round" 
					stroke-width={strokeWidth}/>
				
				<circle cx="20.98" cy="15" r="5" fill={fill} fill-rule="evenodd"/>
				<path 
					d="m20.98 21.35c-3.8961 0-7.0326 3.3156-7.0326 7.4342v2.7879c0 0.48311 0.04511 0.95433 0.12759 1.4113h13.811c0.08247-0.45695 0.1271-0.92818 0.1271-1.4113v-2.7879c0-4.1186-3.1365-7.4342-7.0326-7.4342z"
					fill={fill} 
					fill-rule="evenodd" />
			</svg>
		);
	}
}