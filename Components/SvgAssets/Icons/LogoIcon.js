import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class LogoIcon extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let stroke = this.props.stroke || "#000";
		let fill = this.props.fill || "none";
		let strokeWidth = this.props.strokeWidth || "2";
		return(
			<svg 
				width="75" 
				height="40" 
				version="1.1" 
				viewBox="0 0 75 40"	
				style={this.props.style}>	
				<g transform="translate(0,-10)">
					<path d="m0.9588 11.539 36.542 37.197 36.543-37.197h-54.814z" fill="none" stroke="#ffca00" stroke-width=".54225"/>
				</g>
				<g transform="translate(0,-10)">
					<g stroke="#53464c" stroke-dashoffset="15.118" stroke-linecap="round" stroke-linejoin="round">
						<rect transform="matrix(-.70713 -.70708 -.70708 .70713 0 0)" x="-56.769" y="-26.806" width="10.515" height="10.515" ry="1.894" fill="#6dd7b4" stroke-width=".39862"/>
						<rect transform="matrix(-.70786 .70635 .70635 .70786 0 0)" x="-13.817" y="34.13" width="7.4102" height="22.627" ry=".83804" fill="#feffff" stroke-width=".49076"/>
						<rect transform="matrix(-.70786 .70635 .70635 .70786 0 0)" x="-4.0014" y="24.336" width="7.4102" height="22.627" ry=".83804" fill="#70ccf4" stroke-width=".49076"/>
					</g>
					{/*<path d="m0.86128 11.487h18.567l-9.2363 9.4016z" fill="#ffca00" stroke="#ffca00" stroke-width=".19359px"/>*/}
				</g>
				{/*<g transform="translate(0,-10)">
					<g transform="matrix(.91629 0 0 .91629 18.173 7.496)" stroke="#53464c" stroke-dashoffset="15.118" stroke-linecap="round" stroke-linejoin="round">
						<rect transform="matrix(-.70711 .70711 .70711 .70711 0 0)" x="-24.684" y="36.352" width="15.684" height="15.684" ry="2.8251" fill="#6dd7b4" stroke-width=".59457"/>
						<rect transform="matrix(-.70711 .70711 .70711 .70711 0 0)" x="-5.9684" y="18.038" width="11.053" height="33.75" ry="1.25" fill="#feffff" stroke-width=".732"/>
						<rect transform="matrix(-.70711 .70711 .70711 .70711 0 0)" x="8.2853" y="3.7847" width="11.053" height="33.75" ry="1.25" fill="#70ccf4" stroke-width=".732"/>
					</g>
				</g>*/}
			</svg>
		);
	}
}