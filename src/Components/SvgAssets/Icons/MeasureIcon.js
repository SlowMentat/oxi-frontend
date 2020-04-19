import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'

import Styles from '../../../root.scss';


export default class MeasureIcon extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let stroke = this.props.stroke || "#000";
		let fill = this.props.fill || "none";	
		let strokeWidth = this.props.strokeWidth || "3";
		let style = this.props.style || {};
		let className = this.props.className || null;
		//#70ccf4 old blue
		//#fdd835 yellow
		return(
			<svg 
				width="50mm" 
				height="50mm" 
				version="1.1" 
				viewBox="0 0 50 50" 
				xmlns="http://www.w3.org/2000/svg"		
				style={style ? style : ({})}
				className={className} 
			>
				<g>
					<g fill={fill} stroke={stroke} stroke-linecap="round">
						<g stroke-width={strokeWidth}>
							<path d="m14 38.5v-13.5"/>
							<path d="m25 38.5v-5.5"/>
							<path d="m36 38.5v-13.5"/>
						</g>
						<rect x="2.5" y="10.679" width="44.99" height="28.641" stroke-dashoffset="85.709" stroke-linejoin="round" stroke-width={strokeWidth}/>
					</g>
				</g>
			</svg>
		);
	}
}