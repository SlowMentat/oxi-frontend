import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export default class TypeDress extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let stroke = this.props.stroke || "#000";
		let fill = this.props.stroke || "#000";
		return(
			<svg 
				width="50mm" 
				height="50mm" 
				version="1.1" 
				viewBox="0 0 50 50" 
				xmlns="http://www.w3.org/2000/svg"				
				style={{'width':'100%','height':'100%'}}>
				<g>
					<path 
						d="m18.014 1.2502c-0.09314 2.7941-0.27896 7.8233-0.27896 8.3822 0 1.3971 0.27922 2.7943 0.83804 4.1914 0.55883 1.3971 1.0045 2.8037 0.83804 4.1908-0.15132 1.2609-1.0871 2.8731-1.6761 6.7061-0.73212 5.6031-0.55908 15.368-0.55908 24.029h15.647c0-8.6618 0.17304-18.426-0.55908-24.029-0.58894-3.833-1.5248-5.4452-1.6761-6.7061-0.16647-1.3871 0.27922-2.7937 0.83804-4.1908 0.55883-1.3971 0.83804-2.7943 0.83804-4.1914 0-0.55882-0.1864-5.588-0.27954-8.3822h-1.3965v2.7937c0 1.3971-1.3972 2.7942-2.7942 2.7942h-5.5885c-1.3971 0-2.7942-1.3972-2.7942-2.7942v-2.7937z" 
						stroke={stroke} 
						fill={fill}
						stroke-width=".29571px"/>
				</g>
			</svg>
		);
	}
}