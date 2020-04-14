import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'

import Styles from '../../../root.scss';


export default class LogoIconFitsee extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let stroke = this.props.stroke || "#000";
		let fill = this.props.fill || "none";
		let strokeWidth = this.props.strokeWidth || "2";
		//#70ccf4 old blue
		//#fdd835 yellow
		return(
			<svg 
				width="50mm" 
				height="50mm" 
				version="1.1" 
				viewBox="0 0 50 50" 
				xmlns="http://www.w3.org/2000/svg"
				style={this.props.style}
				className={Styles.logo_svg}
				id="Layer_1" 
				data-name="Layer 1" 
				xmlns="http://www.w3.org/2000/svg" 
				viewBox="0 0 91.7 92.64" >

				<title>logo_svgfile</title>
				<path 
					fill='#304244'
					d="M55.29,18.19a30.52,30.52,0,0,0-30.51,30v1h91.7v-31Z" 
					transform="translate(-24.78 -18.19)"/>
				<path 
					fill='#fbb040' 
					d="M85.29,80.25v0" 
					transform="translate(-24.78 -18.19)"/>
				<path 
					fill='#304244'
					d="M24.81,86v24.84h30A30.52,30.52,0,0,1,24.81,86Z" 
					transform="translate(-24.78 -18.19)"/>
				<rect 
					fill='#fbb040' 
					x="30.54" 
					y="62.07" 
					width="29.98"/>
				<rect 
					fill='#fbb040' 
					x="0.03" 
					y="62.07" 
					width="30.5"/>
				<path 
					fill='#bb8558' 
					d="M24.78,79.8V86a30.54,30.54,0,0,0,30,24.84h.52v-31Z" 
					transform="translate(-24.78 -18.19)" />
				<rect 
					fill='#d1c6c3' 
					y="31.04" 
					width="30.57" 
					height="30.57"/>
				<rect 
					fill='#ece0dc' 
					x="61.12" 
					y="31.04" 
					width="30.57" 
					height="30.57"/>
				<path 
					fill='#d1c6c3' 
					d="M85.89,29.53A33.05,33.05,0,0,0,55.31,49.23h61.16A33.05,33.05,0,0,0,85.89,29.53Z" 
					transform="translate(-24.78 -18.19)"/>
				<path 
					fill='#d1c6c3' 
					d="M55.31,79.8v31C72,110.55,85.49,97.39,85.88,81V79.8Z" 
					transform="translate(-24.78 -18.19)"/>
				<polygon 
					fill='#bb8558' 
					points="61.13 61.59 61.13 31.04 30.57 31.04 30.57 31.04 61.12 61.59 61.13 61.59"/>
				<polygon 
					fill='#304244' 
					points="30.57 31.04 30.57 61.59 61.12 61.59 30.57 31.04"/>
			</svg>
		);
	}
}