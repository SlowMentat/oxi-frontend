import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'

import Styles from '../../../root.scss';


export default class MeasureIcon extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let stroke = this.props.stroke || "var(--mdc-theme-primary)";
		let fill = this.props.fill || "none";	
		let strokeWidth = this.props.strokeWidth || (isSafari ? "2" : "4");
		let style = this.props.style || {};
		let className = this.props.className || null;
		//#70ccf4 old blue
		//#fdd835 yellow
		return( 

			<svg 
				version="1.1" 
				viewBox="0 0 50 50" 
				//xml:space="preserve" 
				xmlns="http://www.w3.org/2000/svg"
				shape-rendering="crispEdges"
			>
				{/*<g>
					<g 
						fill-rule="evenodd" 
						stroke={stroke}
						stroke-dashoffset="85.709"
						stroke-linecap="square" 
						stroke-miterlimit="4"
					>
						<path 
							d="m20.434 32.503c-6.61 0-11.931 5.3099-11.931 11.906v103.18c0 6.5957 5.3214 11.906 11.931 11.906h151.13c6.61 0 11.931-5.3099 11.931-11.906v-103.18c0-6.5957-5.3214-11.906-11.931-11.906zm-3.9771 7.9371h159.09v111.12h-159.09z" 
							stroke-width={strokeWidth}
						/>
						<rect 
							x="52.305" 
							y="96.305" 
							width="7.3898" 
							height="55.39" 
							stroke-width={strokeWidth}
						/>
						<rect 
							x="132.31" 
							y="96.305" 
							width="7.3898"
							height="55.39" 
							stroke-width={strokeWidth}
						/>
						<rect 
							x="92.218" 
							y="124.22" 
							width="7.5645" 
							height="27.564" 
							stroke-width={strokeWidth}
						/>
					</g>
				</g>*/}

				<g>
					<g fill={fill} stroke={stroke} stroke-linecap="square">
						<g stroke-width="4">
							<path d="m14 38.5v-13.5"/>
							<path d="m25 38.5v-5.5"/>
							<path d="m36 38.5v-13.5"/>
						</g>
						<rect 
							x="2.5" 
							y="10.679" 
							width="44.99" 
							height="28.641" 
							stroke-dashoffset="85.709" 
							stroke-width={strokeWidth}
						/>
					</g>
				</g>
			</svg>
		);
	}
}