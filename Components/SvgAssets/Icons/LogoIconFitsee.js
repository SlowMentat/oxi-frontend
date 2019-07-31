import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class LogoIconFitsee extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let stroke = this.props.stroke || "#000";
		let fill = this.props.fill || "none";
		let strokeWidth = this.props.strokeWidth || "2";
		return(
			<svg 
				width="50mm" 
				height="50mm" 
				version="1.1" 
				viewBox="0 0 50 50" 
				xmlns="http://www.w3.org/2000/svg"
				style={this.props.style} >
				<g>
					<rect x="10.532" y="18.942" width="15.762" height="7.5392" ry="2.007" fill="none" stroke="#70ccf4" stroke-dashoffset="85.709" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
					<rect x="9.9066" y="3.6042" width="37.012" height="10.33" ry="2.4574" fill="#fdd835" fill-rule="evenodd" stroke-opacity="0"/>
					<g fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path d="m16.839 35.5h2.5" stroke="#fff" stroke-width="2"/>
						<path d="m20 40.5c0 3.75 3.75 3.75 5 3.75m-12.5-6v2.25c0 2.1839 0.56224 3.6342 2.5 3.75m5-3.75v-7.5" stroke="#fffffe" stroke-width="3"/>
						<path d="m25 44.25h4.5583 0.5s2.5 0 2.5-2.25-2.5-2.25-2.5-2.25h-1s-2.5 0-2.5-2.25 2.5-2.25 2.5-2.25l0.5 2e-6h2.7348" stroke="#fff" stroke-width="3"/>
					</g>
					<g fill="#fff" stroke="#fff" stroke-linecap="round" stroke-linejoin="round">
						<rect x="11.75" y="32.75" width="1.5588" height="2" ry=".77941" fill-rule="evenodd" stroke-dashoffset="85.709" stroke-width="1.334"/>
						<g transform="matrix(.98378 0 0 1.1184 -1.5322 -1.4224)" stroke-width="1.4777" aria-label="e e">
							<path d="m47.054 36.566v0.68727h-6.4603c0.06109 0.96727 0.35127 1.7054 0.87054 2.2145 0.52436 0.504 1.2524 0.756 2.184 0.756 0.53963 0 1.0614-0.06618 1.5654-0.19854 0.50909-0.13236 1.0131-0.33091 1.512-0.59563v1.3287c-0.504 0.21382-1.0207 0.37672-1.5502 0.48872s-1.0665 0.168-1.6113 0.168c-1.3644 0-2.4462-0.39709-3.2454-1.1913-0.79418-0.79418-1.1913-1.8684-1.1913-3.2225 0-1.4 0.37672-2.5098 1.1302-3.3294 0.75854-0.82472 1.7793-1.2371 3.0622-1.2371 1.1505 0 2.0593 0.37163 2.7262 1.1149 0.672 0.73818 1.008 1.7436 1.008 3.0163zm-1.4051 0.13046c0.62456-0.72219 0.04675-1.8242-0.3758-2.2824-0.41745-0.45818-0.91946-0.78808-1.938-0.78808-0.784 0-1.4127 0.22145-1.8862 0.66436-0.46836 0.44291-1.179 1.5628-0.80945 2.4137z" fill="#fff" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4777"/>
						</g>
						<g transform="matrix(.98378 0 0 1.1184 10.282 -1.4224)" stroke-width="1.4777" aria-label="e e">
							<path d="m47.054 36.566v0.68727h-6.4603c0.06109 0.96727 0.35127 1.7054 0.87054 2.2145 0.52436 0.504 1.2524 0.756 2.184 0.756 0.53963 0 1.0614-0.06618 1.5654-0.19854 0.50909-0.13236 1.0131-0.33091 1.512-0.59563v1.3287c-0.504 0.21382-1.0207 0.37672-1.5502 0.48872s-1.0665 0.168-1.6113 0.168c-1.3644 0-2.4462-0.39709-3.2454-1.1913-0.79418-0.79418-1.1913-1.8684-1.1913-3.2225 0-1.4 0.37672-2.5098 1.1302-3.3294 0.75854-0.82472 1.7793-1.2371 3.0622-1.2371 1.1505 0 2.0593 0.37163 2.7262 1.1149 0.672 0.73818 1.008 1.7436 1.008 3.0163zm-1.4051 0.13046c0.62456-0.72219 0.04675-1.8242-0.3758-2.2824-0.41745-0.45818-0.91946-0.78808-1.938-0.78808-0.784 0-1.4127 0.22145-1.8862 0.66436-0.46836 0.44291-1.179 1.5628-0.80945 2.4137z" fill="#fff" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4777"/>
						</g>
					</g>
				</g>
			</svg>
		);
	}
}