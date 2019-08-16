import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export const FileUploadIcon = (props) => {
	let folderCorner = props.hovered ? "16.25 268.25" : "6.25 258.25"
	let folderCornerOffset = props.hovered ? "11.25 11.25 27.5 -10 " : "1.25 1.25 37.5 0";
	let className = props.className || null;
	let fill = props.fill || OxiAppConstants.iconDefaults.colors.fill;
	let stroke = props.stroke || OxiAppConstants.iconDefaults.colors.stroke;
	let strokeWidth = props.strokeWidth || OxiAppConstants.iconDefaults.dimensions.strokeWidth;;
	let style = props.style;// || {'width':'100%','height':'100%'};


	return(
		<svg 
			width="50mm" 
			height="50mm" 
			version="1.1" 
			viewBox="0 0 50 50" 
			xmlns="http://www.w3.org/2000/svg"		
			style={style ? style : ({})}
			className={className}
			style={style} >

			<g display="none" opacity="0">
				<path d="m6.25 38.75 37.5-27.5h-37.5z" fill={fill} opacity="1"/>
			</g>
			<g transform="translate(0 -247)" stroke={stroke} stroke-linejoin="round">
				<path 
					d="m6.25 282v-29.725c0-1.5374 1.2377-2.7751 2.7751-2.7751h31.95c1.5374 0 2.7751 1.2377 2.7751 2.7751v18.475" 
					fill={fill} 
					fill-rule="evenodd" 
					stroke-dashoffset="85.709" 
					stroke-linecap="round" 
					stroke-width="4"/>
				<path 
					d="m22.938 262.64a5.2116 5.2116 0 0 1-6.3941 3.6634 5.2116 5.2116 0 0 1-3.6654-6.393 5.2116 5.2116 0 0 1 6.3919-3.6674 5.2116 5.2116 0 0 1 3.6693 6.3907" 
					fill={stroke} 
					fill-rule="evenodd" 
					stroke-dashoffset="85.709" 
					stroke-linecap="round" 
					stroke-width={strokeWidth}/>
				<path 
					d="m32.5 268.5c-1.5797 1.5941-3.0007 4.7662-3.5846 6.695-0.09902 0.3271-0.16536 0.55501-0.16536 0.55501s-0.19913-0.13591-0.52193-0.32608c-0.85759-0.50522-2.6614-1.4237-4.4778-1.4237-1.0487 0-2.538 1.9841-4.0974 4.2824-2.1582 3.1808-4.4512 6.9675-5.9025 6.9675-2.5 0-7.5003-2.5001-7.5003-2.5001v8.4749c0 1.5374 1.2376 2.775 2.775 2.775h31.95c1.5374 0 2.775-1.2376 2.775-2.775v-20.975c-1.18e-4 -2.7501-3.2501-4.2501-5.7501-4.2501s-4.25 1.25-5.5 2.5z"
					fill={stroke} 
					stroke-width={strokeWidth}/>
			</g>
		</svg>	
	)
}
