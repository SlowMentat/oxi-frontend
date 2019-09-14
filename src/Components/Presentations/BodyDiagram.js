import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Media from "react-media";

//SVG Assets
import FemaleFront from '../../Components/SvgAssets/FemaleFront.js'
import FemaleSide from '../../Components/SvgAssets/FemaleSide.js'
import MaleFront from '../../Components/SvgAssets/MaleFront.js'
import MaleSide from '../../Components/SvgAssets/MaleSide.js'
import MaleSideVertMirrored from '../../Components/SvgAssets/MaleSideVertMirrored.js'
import FemaleSideVertMirrored from '../../Components/SvgAssets/FemaleSideVertMirrored.js'

//Third Party
import fetch from 'cross-fetch'
import axios from 'axios';

//CSS

//Constants
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';



const bodySvgContianerStyles = {
	'overflow-y': 'hidden',
    'height': '100%',
    'width': '50%',
    'display': 'inline-block',
    'vertical-align': 'top',
}

const bodyDiagramContainer_div = {
	'width': '100%',
    'margin': '0px auto auto',
    'height': '100%',
    'vertical-align': 'top',
}

// BodyDiagram
// props:
//    bodyShape
//    selectedField
//    orientation
const BodyDiagram = (props) => {
	return(
		props.orientation === 'left' ?
			<div id='leftBodyDiagramContainer' style={bodyDiagramContainer_div}>
				<div style={bodySvgContianerStyles}>
					{props.bodyShape === 'male' ? <MaleFront allOff={false} selectedField={props.selectedField} strokeWidth="0.8px"/> : <FemaleFront allOff={false} selectedField={props.selectedField} strokeWidth="0.8px"/>}
				</div>
				<div style={bodySvgContianerStyles}>
					{props.bodyShape === 'male' ? <MaleSide allOff={false} selectedField={props.selectedField} strokeWidth="0.8px"/> : <FemaleSide allOff={false} selectedField={props.selectedField} strokeWidth="0.8px"/>}
				</div>
			</div> :
			<div id='rightBodyDiagramContainer' style={bodyDiagramContainer_div}>
				<div style={bodySvgContianerStyles}>
					{props.bodyShape === 'male' ? <MaleFront allOff={false} selectedField={props.selectedField} strokeWidth="0.8px"/> : <FemaleFront allOff={false} selectedField={props.selectedField} strokeWidth="0.8px"/>}
				</div>
				<div style={bodySvgContianerStyles}>
					{props.bodyShape === 'male' ? <MaleSideVertMirrored allOff={false} selectedField={props.selectedField} strokeWidth="0.8px"/> : <FemaleSideVertMirrored allOff={false} selectedField={props.selectedField} strokeWidth="0.8px"/>}
				</div>
			</div>);
}

export default BodyDiagram