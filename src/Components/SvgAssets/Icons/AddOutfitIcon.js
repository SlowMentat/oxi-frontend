import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class AddOutfitIcon extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let fill = this.props.fill || '#4a4547';
		let stroke = this.props.stroke || '';
		let className = this.props.className || null;
		let style = this.props.style;// || {'width':'100%','height':'100%'};
		return(
			<svg 
				width="50mm" 
				height="50mm" 
				version="1.1" 
				viewBox="0 0 50 50" 	
				style={style ? style : ({})}
				className={className} >
				<g>
					<path 
						d="m25 2.5c-10.856 0-19.657 8.8006-19.657 19.657 4e-7 5.428 2.2004 10.342 5.7575 13.899 3.5571 3.5571 13.899 12.734 13.899 12.734s10.342-9.1769 13.899-12.734c3.5571-3.5571 5.7575-8.471 5.7575-13.899 0-10.856-8.8006-19.657-19.657-19.657zm-0.03309 8.9112a2.2467 2.2467 0 0 1 2.2795 2.2771v6.1778h6.1778a2.2467 2.2467 0 1 1 0 4.4933h-6.1778v6.1778a2.2467 2.2467 0 1 1-4.4927 0v-6.1778h-6.1778a2.2467 2.2467 0 1 1 0-4.4933h6.1778v-6.1778a2.2467 2.2467 0 0 1 2.2133-2.2771z" 
						fill={fill}
						fill-rule="evenodd" 
						stroke-width="0" />				
				</g>
			</svg>
		);
	}
}