import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'


export const FileUploadIcon = (props) => {
	let folderCorner = props.hovered ? "16.25 268.25" : "6.25 258.25"
	let folderCornerOffset = props.hovered ? "11.25 11.25 27.5 -10 " : "1.25 1.25 37.5 0";
	let className = props.className || null;
	let style = props.style;// || {'width':'100%','height':'100%'};


	return(
		<svg 
			width="50mm" 
			height="50mm" 
			version="1.1" 
			viewBox="0 0 50 50" 
			xmlns="http://www.w3.org/2000/svg"		
			style={style ? style : ({})}
			className={className} >
			<g opacity={props.hovered ? ('1') : ('0')}>
				<path d="m6.25 40 38.75-28.75h-37.5z" fill="#CDB569" opacity=".7"/>
			</g>
			<g transform="translate(0 -247)">
				<path 
					//TODO:  split inner and outer paths into separate groups to get rid of foldercornerOffset variable
					//d={"m" + folderCorner + "h37.5v22.5c0 3.75-1.25 5-5 5h-32.5zm-1.25-1.25 1e-7 30h33.75c4.5 0 6.25-1.75 6.25-6.25v-27.5h-12.5c-2.5 0-0.75 3.75-3.75 3.75" }
					d={"m5 257 1e-7 30h33.75c4.5 0 6.25-1.75 6.25-6.25v-27.5h-12.5c-2.5 0-0.75 3.75-3.75 3.75zm" + folderCornerOffset + "v22.5c0 3.75-1.25 5-5 5h-32.5z"}
					color="#000000" 
					color-rendering="auto" 
					dominant-baseline="auto" 
					image-rendering="auto" 
					shape-rendering="auto" 
					solid-color="#000000"/>
			</g>
		</svg>	
	)
}
