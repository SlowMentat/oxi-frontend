
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
		let style = this.props.style;// || {'width':'100%','height':'100%'};

		return(
			<div style={style}>
				<svg 
					width="50mm" 
					height="50mm" 
					version="1.1" 
					viewBox="0 0 50 50" 
					xmlns="http://www.w3.org/2000/svg"				
					style={style}>

					<g stroke={penColor} stroke-linejoin="round">
						<path 
							d="m15.854 40.832 11.267-11.267c6.2616-6.2616 12.523-12.523 18.785-18.785l-6.3926-6.3926c-6.2616 6.2616-12.523 12.523-18.785 18.785l-11.267 11.267z" 
							stroke-width="1.5307"
							fill={penColor} />
						<path 
							d="m6.9724 36.472 6.736 6.736-9.4528 2.7168z" 
							fill={penColor} 
							fill-opacity=".98605" 
							stroke-width=".86903"/>
					</g>
				</svg>
			</div>
		);
	}
}