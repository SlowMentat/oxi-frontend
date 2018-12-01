import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../../Util/OxiAppConstants.js'



/*var start = null;
let fileOpenAnimationId = null;
let fileCloseAnimationId = null;



const open = () => {

}

const close = () => {
	
}

export default class FileUploadIcon extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			start: null,
			fileOpenAnimationId: null,
			fileCloseAnimationId: null,
			folderPoint: [1.25, 1.25, 37.5, 0], // animate to:  11.25 11.25 27.5 -10
			shadeOpacity: 0,
		}
		this.step = this.step.bind(this);
		this.animateFolder = this.animateFolder.bind(this);
	}

	step(timestamp){
		if(!start) start = timestamp;
		let elapsedTime = timestamp - start;
		//do animation
		this.animateFolder(this.props.hovered ? true : false)
		if(elapsedTime < this.props.animationDuration){
			window.requestAnimationFrame(this.step);
		}else{
			start = null;
		}
	}

	animateFolder(open){
		let nextPointInc = 10 / this.props.animationDuration;
		let nextOpacityInc = 1 / this.props.animationDuration;
		this.setState(prevState => {
			let nextPoint = prevState.folderPoint.map((val, ind) => open ? (val - nextPointInc) : (val + nextPointInc));
			return({
				...prevState,
				folderPoint: nextPoint,
				shadeOpacity:( open ? prevState.shadeOpacity + nextOpacityInc : prevState.shadeOpacity - nextOpacityInc),
			});
		})
	}

	componentWillUnmount() {
        if(this.state.fileOpenAnimationId !== null) cancelAnimationFrame(this.state.fileOpenAnimationId);
        if(this.state.fileCloseAnimationId !== null) cancelAnimationFrame(this.state.fileCloseAnimationId);
    }

	render(){

		if(this.props.hovered){
			this.state.fileCloseAnimationId === null ? window.requestAnimationFrame(this.step) : window.cancelAnimationFrame(this.state.fileCloseAnimationId)
		}else{
			this.state.fileOpenAnimationId === null ? window.requestAnimationFrame(this.step) : window.cancelAnimationFrame(this.statefileOpenAnimationId)		
		}

		let folderCorner = this.props.hovered ? "16.25 268.25" : "6.25 258.25"
		let folderCornerOffset = this.props.hovered ? "11.25 11.25 27.5 -10 " : "1.25 1.25 37.5 0";
		return(
			<svg 
				width="50mm" 
				height="50mm" 
				version="1.1" 
				viewBox="0 0 50 50" 
				xmlns="http://www.w3.org/2000/svg"				
				style={{'width':'100%','height':'100%'}}>
				<g opacity={this.state.shadeOpacity}>
					<path d="m6.25 40 38.75-28.75h-37.5z" fill="#CDB569" opacity=".7"/>
				</g>
				<g transform="translate(0 -247)">
					<path 
						//TODO:  split inner and outer paths into separate groups to get rid of foldercornerOffset variable
						//d={"m" + folderCorner + "h37.5v22.5c0 3.75-1.25 5-5 5h-32.5zm-1.25-1.25 1e-7 30h33.75c4.5 0 6.25-1.75 6.25-6.25v-27.5h-12.5c-2.5 0-0.75 3.75-3.75 3.75" }
						d={"m5 257 1e-7 30h33.75c4.5 0 6.25-1.75 6.25-6.25v-27.5h-12.5c-2.5 0-0.75 3.75-3.75 3.75zm" + this.state.folderPoint.join(' ') + "v22.5c0 3.75-1.25 5-5 5h-32.5z"}
						color="#000000" 
						color-rendering="auto" 
						dominant-baseline="auto" 
						image-rendering="auto" 
						shape-rendering="auto" 
						solid-color="#000000" 	/>
				</g>
			</svg>
		);
	}
}*/

export const FileUploadIcon = (props) => {
	let folderCorner = props.hovered ? "16.25 268.25" : "6.25 258.25"
	let folderCornerOffset = props.hovered ? "11.25 11.25 27.5 -10 " : "1.25 1.25 37.5 0";


	return(
		<svg 
			width="50mm" 
			height="50mm" 
			version="1.1" 
			viewBox="0 0 50 50" 
			xmlns="http://www.w3.org/2000/svg"				
			style={{'width':'100%','height':'100%'}}>
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
