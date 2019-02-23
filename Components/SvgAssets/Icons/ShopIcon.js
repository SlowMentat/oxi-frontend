import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class ShopIcon extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let stroke = this.props.stroke || "#FFF";
		let fill = this.props.fill || "#FFF";
		let strokeWidth = this.props.strokeWidth || "2";
		return(
			<svg 
				width="50" 
				height="50" 
				version="1.1" 
				viewBox="0 0 50 50"	
				style={{'width':'100%','height':'100%'}}>
				<g stroke-linecap="round">
					<g stroke-dashoffset="85.709">
						<circle 
							cx="21.92" 
							cy="38.51" r="3.4304" 
							fill="none" 
							stroke="#fff" 
							stroke-linejoin="round" 
							stroke-width={strokeWidth}/>
						<path 
							d="m17.584 17.209h22.872c1.5411 0 3.149 0.963 2.7818 2.0846l-2.6694 8.1514c-0.3673 1.1216-1.2407 2.0846-2.7818 2.0846h-18.237c-0.91153 0-1.7104-0.963-2.0777-2.0846l-2.6694-8.1514c-0.60776-1.8559 0.56454-2.0846 2.7818-2.0846z" 
							fill="none" 
							stroke="#fff" 
							stroke-width={strokeWidth}/>
						<rect 
							transform="matrix(1 0 .42141 .90687 0 0)" 
							x="1.8216" 
							y="11.8" 
							width="10.729" 
							height="3.8575" 
							ry="1.0895" 
							fill="#fff" 
							stroke="#fff9ff" 
							stroke-width=".94512"/>
					</g>
					<path 
						d="m17.665 27.923 2.7119 7.1569h16.773" 
						fill="none" 
						stroke="#fff" 
						stroke-linejoin="round" 
						stroke-width={strokeWidth}/>
					<circle 
						cx="36.97" 
						cy="38.51" 
						r="3.4304" 
						fill="none" 
						stroke="#fff" 
						stroke-dashoffset="85.709" 
						stroke-linejoin="round" 
						stroke-width={strokeWidth}/>
				</g>
			</svg>
		);
	}
}