import React from 'react';
import PropTypes from 'prop-types';
import MetricStyles from '../../metric.scss';
import Metric from './Metric.js';
import BodyDiagram from './BodyDiagram.js';

import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { camelize, roundTo } from '../../Util/Misc.js';




//const labelContainer_div = {
//	'border-top-style': 'none',
//    'border-width': '20px',
//    'border-color': '#dadada',
//    'position': 'relative',
//}

const upperBodySection_div = {
    'margin': '0px auto 0px 0px',
    //'padding-top': '15px',
    'margin-left': '0px',
    height:'100%',
}

const lowerBodySection_div = {
    'margin': '0px auto auto 0px',
    'padding-top': '15px',
    'margin-left': '0px',
    'display': 'block',
    'padding-bottom': '0%',
    'border-right-style': 'solid',
    'border-right-width': '1px',
    'border-right-color': '#d4d4d4',
}

const BodyFitProjectionCentered = (ownerX, hostX) => {
	//-100 : 0%
	// 100 : 100%

	let ownerAdjX = (((ownerX - hostX) / 2) + 50);
	console.log('ownerAdjX', ownerAdjX);
	let hostAdjX = (((hostX - ownerX) / 2) + 50);
	console.log('hostAdjX', hostAdjX);
	return({
		'ownerValue': ownerAdjX,
		'hostValue': hostAdjX
	});
}

const BodyFitProjectionOwnerAlign = (ownerX, hostX) => {
	let hostAdjX = (ownerX + hostX) === undefined ? 0 : ((hostX - ownerX));
	console.log('hostAdjX', hostAdjX);
	return({
		'ownerValue': 0,
		'hostValue': hostAdjX
	});
}

const Curve = ({props}) => {
	let alterationStyle = {};

	var needsBackdrop = false;

	var {
		alteration,
		isMinTol,
	} = props;

	switch(alteration){
		case 'lcurve':
			needsBackdrop = isMinTol;
			alterationStyle = {
				'border-top-right-radius':'0px',
				'border-top-left-radius':'0px',
				//...(isMinTol ? ({right:'calc(-1*var(--moulding-radius))'}) : ({}) ),
				...(isMinTol ? ({left: '0px'}) : ({right:'calc(-1*var(--moulding-radius))'}) ),
			};
			break;

		case 'rcurve':
			needsBackdrop = isMinTol;
			alterationStyle = {
				'border-bottom-right-radius':'0px',
				'border-bottom-left-radius':'0px',
				...(isMinTol ? ({left: '0px'}) : ({right:'calc(-1*var(--moulding-radius))'}) ),
			};
			break;

		case 'flippedRcurve':
			needsBackdrop = !isMinTol;
			alterationStyle = {
				'border-bottom-right-radius':'0px',
				'border-bottom-left-radius':'0px',
				...(isMinTol ? ({left:'calc(-1*var(--moulding-radius))'}) : ({right: '0px'}) ),
			};
			break;

		case 'jcurve':
			needsBackdrop = !isMinTol;
			alterationStyle = {
				'border-top-right-radius':'0px',
				'border-top-left-radius':'0px',
				...(isMinTol ? ({left:'calc(-1*var(--moulding-radius))'}) : ({right: '0px'}) ),
			};
			break;

		case 'convex':
			alterationStyle = {
				//...(isMinTol ? ({left: '0px'}) : ({right: '0px'}) ),	
				...(isMinTol ? ({left:'calc(-1*var(--moulding-radius))'}) : ({right: 'calc(-1*var(--moulding-radius))'}) ),		// adjusting 1r instead of 2r because creust (width 1r) is expected to be in place here		
			};
			break;

		case 'concave':
			needsBackdrop = true;
			alterationStyle = {
				...(isMinTol ? ({left: '0px'}) : ({right: '0px'}) ),	
				//...(isMinTol ? ({left:'calc(-2*var(--moulding-radius))'}) : ({right: 'calc(-2*var(--moulding-radius))'}) ),				
			};
			break;

		default:
			break;
	}

	const backdrop =
		<div 
			id="backdrop"
			style={{
				//'background-color':'var(--nfz-color)',
				//width: 'var(--moulding-radius)',
				//position: 'absolute',
				//top:'-1px',
				...(isMinTol ? ({left:'0px', top:'-1px'}) : ({right: '0px', top: '-1px'}))
			}}
		>
		</div>

	const curveElement = 
		<React.Fragment>
			{ needsBackdrop ? (backdrop) : null }
			<div 
				id={props.alteration}
				className={props.className}
				style={{
					'background-color':`${props.color}`,
					...alterationStyle
				}} 
			>										
			</div>
		</React.Fragment>;

	return( curveElement );
}

const SCurve = ({props}) => {
	var { fzColor, nfzColor, isMinTol } = props;
	//var posAdjust = isMinTol ? 
	//	({left:'-10px'}) : 
	//	({left:'unset', right:'-10px'});
		//({left:'calc(-2*var(--moulding-radius))'}) : 
		//({left:'unset', right:'calc(-2*var(--moulding-radius))'});


	var posAdjust = isMinTol ? ({left: 'calc(-2*var(--moulding-radius))'}) : ({left:'unset', right: 'calc(-2*var(--moulding-radius))'});

	return(
		<div 
			id="scurve"
			className={MetricStyles.leftCornerMoulding_div}
			style={{
				//width:'20px',
				width:'calc(4*var(--moulding-radius))',
				border: 'unset',	// Needed if MetricStyles debugging is turned on
				...posAdjust,
			}} >
			<div style={{position:'relative', width:'100%', height:'100%'}}>
				<div className={MetricStyles.sCurveBackdropTop_div} style={{'background-color':`${isMinTol ? nfzColor : fzColor }`}}>						
				</div>
				<div className={MetricStyles.sCurveBackdropBottom_div} style={{'background-color':`${isMinTol ? fzColor : nfzColor }`}}>						
				</div>
				<div 
					className={MetricStyles.leftCornerMoulding_div}
					style={{
						top:'0px',
						left:'0px',
						height:'100%',
						width:'50%',
						'background-color':`${isMinTol ? nfzColor : fzColor}`,
						'margin-top':'unset',
						...(isMinTol ? ({'border-bottom-left-radius':'0px'}) : ({})),	// set the corner moulding side that overlaps the fit zone to have a curved bottom left radius.  This will handle edge cases for minimum fitzones.
					}} >
				</div>
				<div
					className={MetricStyles.rightCornerMoulding_div}
					style={{
						right:'0px',
						top:'0px',
						height:'100%',
						width:'50%','background-color':`${isMinTol ? fzColor : nfzColor}`,
						'margin-top':'unset',
						//'border-top-right-radius':'0px',
						...(isMinTol ? ({}) : ({'border-top-right-radius':'0px'})),		// set the corner moulding side that overlaps the fit zone to have a curved top right radius
					}} >
				</div>
			</div>
		</div>
	);	
}

/*
*	fzColor: fitZone background-color
*	nfzColor: non-fitZone background-color
*/
const ZCurve = ({props}) => {
	var { fzColor, nfzColor, isMinTol } = props;
	//var posAdjust = isMinTol ? ({left:'-10px'}) : ({left:'unset', right:'-10px'});
	var posAdjust = isMinTol ? ({left: 'calc(-2*var(--moulding-radius))'}) : ({left:'unset', right: 'calc(-2*var(--moulding-radius))'});

	return(
		<div 
			id="zcurve"
			className={MetricStyles.leftCornerMoulding_div}
			style={{
				//width:'20px',
				width:'calc(4*var(--moulding-radius))',
				border: 'unset',	// Needed if MetricStyles debugging is turned on
				...posAdjust,
			}} >
			<div style={{position:'relative', width:'100%', height:'100%'}}>
				<div className={MetricStyles.zCurveBackdropTop_div} style={{'background-color':`${isMinTol ? fzColor : nfzColor }`}}>						
				</div>
				<div className={MetricStyles.zCurveBackdropBottom_div} style={{'background-color':`${isMinTol ? nfzColor : fzColor }`}}>						
				</div>
				<div 
					className={MetricStyles.leftCornerMoulding_div}
					style={{
						top:'0px', 
						left:'0px', 
						height:'100%', 
						width:'50%','background-color':`${isMinTol ? nfzColor : fzColor}`,
						'margin-top':'unset',
						//'border-top-left-radius':'0px',
						...(isMinTol ? ({'border-top-left-radius':'0px'}) : ({})),

					}} >
				</div>
				<div
					className={MetricStyles.rightCornerMoulding_div}
					style={{
						top:'0px', 
						right:'0px', 
						height:'100%', 
						width:'50%','background-color':`${isMinTol ? fzColor : nfzColor}`,
						'margin-top':'unset',
						//'border-bottom-right-radius':'0px',
						...(isMinTol ? ({}) : ({'border-bottom-right-radius':'0px'})),
					}} >
				</div>
			</div>
		</div>
	);	
}

class MetricGraph extends React.Component{
	constructor(props){
		super(props);

		this.prevDeltaX = props.sourceMetricIds.reduce((accum, id) => ({
			...accum,
			[id]: 0,
		}),{});
	}

	shouldComponentUpdate(nextProps, nextState){
		let sourceMetricIdsDiff = nextProps.sourceMetricIds !== this.props.sourceMetricIds;
		let sourceMetricsDiff = nextProps.sourceMetrics !== this.props.sourceMetrics;
		let hostDiff = nextProps.host !== this.props.host;
		let lineColorDiff = nextProps.lineColor !== this.props.lineColor;
		
		return sourceMetricIdsDiff | sourceMetricsDiff | hostDiff | lineColorDiff;
	}

	render(){
		const range = 10;
		let width = 50;
		let height = width;
		var nextOverallFitResults = OxiAppConstants.fitResultValues.a; //Set to Fit
		var fitResults = {};
		var naLabels = {};
		
		const{
			setFitResult,
			updateLabelPositions,
		} = this.props;

		let {
			tolerances, 
			userMetricsDto,
			fitResult,
			sourceMetricIds,
			sourceMetrics,
		} = this.props;

		let yPercentOffset = ( 100 / (2 * sourceMetricIds.length) );
		let pointRadius = 3;
		let yOffsetStart = ( (yPercentOffset - pointRadius*2) / 2);
		let labelPosMap = {};

		var debugTable = sourceMetricIds.reduce((accum, val) => ({...accum, [val]:{}}), {});

		let output = sourceMetricIds.map((sourceMetricId, ind, metricList) => {
			const MIN_TOLERANCE = true;
			const MAX_TOLERANCE = !MIN_TOLERANCE;

			let labelPosYCss = `${( (yOffsetStart*2) + ( (ind) * ( yPercentOffset*2) ) )}%`;
			labelPosMap[sourceMetricId] = labelPosYCss;
			var fzColor = 'var(--fz-color)';
			var nfzColor = 'var(--nfz-color)';

			//
			var concaveColor = fzColor;
			var convexColor = nfzColor;

			let xScale = 1;// 1.65;
			let xOffset = Math.abs(sourceMetrics[sourceMetricId]) >= 0 ? 0 : sourceMetrics[sourceMetricId];

			var deltaX = sourceMetrics[sourceMetricId] !== undefined ?
				 (xScale * (/*Math.abs*/(sourceMetrics[sourceMetricId])) / (range/2)) :
				 undefined;

			//grab the current tolerance values
			var toleranceMinId = `min${sourceMetricId[0].toUpperCase() + sourceMetricId.slice(1)}`;
			var toleranceMaxId = `max${sourceMetricId[0].toUpperCase() + sourceMetricId.slice(1)}`;
			var prevToleranceMinId = undefined;
			var prevToleranceMaxId = undefined;
			var nextToleranceMinId = undefined;
			var nextToleranceMaxId = undefined;

			if(ind !== 0){
				//grab the min/max tolerance value from the previous iteration
				prevToleranceMinId = `min${metricList[ind-1][0].toUpperCase() + metricList[ind-1].slice(1)}`;
				prevToleranceMaxId = `max${metricList[ind-1][0].toUpperCase() + metricList[ind-1].slice(1)}`;
			}
			if(ind !== metricList.length - 1){
				//grab the min/max tolerance value from the next iteration
				nextToleranceMinId = `min${metricList[ind+1][0].toUpperCase() + metricList[ind+1].slice(1)}`;
				nextToleranceMaxId = `max${metricList[ind+1][0].toUpperCase() + metricList[ind+1].slice(1)}`;
			}

			var roundedUserMetric = roundTo(userMetricsDto[metricList[ind]]);
			var roundedPrevUserMetric = ind > 0 ? roundTo(userMetricsDto[metricList[ind - 1]]) : undefined;
			var roundedNextUserMetric = ind < metricList.length - 1 ? roundTo(userMetricsDto[metricList[ind + 1]]) : undefined;
			/*
			//var toleranceMinDelta = (tolerances[toleranceMinId] - roundedUserMetric);
			var toleranceMinDelta = tolerances[toleranceMinId] - userMetricsDto[metricList[ind]];
			var prevToleranceMinDelta = prevToleranceMinId ? (tolerances[prevToleranceMinId] - roundedPrevUserMetric) : undefined;
			var nextToleranceMinDelta = nextToleranceMinId ? (tolerances[nextToleranceMinId] - roundedNextUserMetric) : undefined;

			//var toleranceMaxDelta = (tolerances[toleranceMaxId] - roundedUserMetric) ;
			var toleranceMaxDelta = tolerances[toleranceMaxId] - userMetricsDto[metricList[ind]];
			var prevToleranceMaxDelta = prevToleranceMaxId ? (tolerances[prevToleranceMaxId] - roundedPrevUserMetric)  : undefined;
			var nextToleranceMaxDelta = nextToleranceMaxId ? (tolerances[nextToleranceMaxId] - roundedNextUserMetric)  : undefined;			
			*/
			
			//var toleranceMinDelta = (tolerances[toleranceMinId] - roundedUserMetric);
			var toleranceMinDelta = parseFloat(roundTo(tolerances[toleranceMinId] - userMetricsDto[metricList[ind]]));
			var prevToleranceMinDelta = prevToleranceMinId ? parseFloat(roundTo((tolerances[prevToleranceMinId] - roundedPrevUserMetric))) : undefined;
			var nextToleranceMinDelta = nextToleranceMinId ? parseFloat(roundTo((tolerances[nextToleranceMinId] - roundedNextUserMetric))) : undefined;

			//var toleranceMaxDelta = (tolerances[toleranceMaxId] - roundedUserMetric) ;
			var toleranceMaxDelta = parseFloat(roundTo(tolerances[toleranceMaxId] - userMetricsDto[metricList[ind]]));
			var prevToleranceMaxDelta = prevToleranceMaxId ? parseFloat(roundTo((tolerances[prevToleranceMaxId] - roundedPrevUserMetric)))  : undefined;
			var nextToleranceMaxDelta = nextToleranceMaxId ? parseFloat(roundTo((tolerances[nextToleranceMaxId] - roundedNextUserMetric)))  : undefined;
			

			debugTable[metricList[ind]] = {
				'min prev delta': prevToleranceMinDelta,
				'min current delta': toleranceMinDelta,
				'min next delta': nextToleranceMinDelta,
				'max prev delta': prevToleranceMaxDelta,
				'max current delta': toleranceMaxDelta,
				'max next delta': nextToleranceMaxDelta,
				'MIN TOL': tolerances[toleranceMinId],
				'MAX TOL': tolerances[toleranceMaxId],
				'userMetric' : userMetricsDto[metricList[ind]],	
			}

			var toleranceId = sourceMetrics[sourceMetricId] >= 0 ? toleranceMinId : toleranceMaxId;

			//get the fit zone dimensions, position
			/*
			var fitZoneWidth = 100*(Math.abs(tolerances[toleranceMinId] - tolerances[toleranceMaxId]))/10;
			var fitZonePosition = 100*((userMetricsDto ? tolerances[toleranceMinId] - roundedUserMetric + (range/2) : (range/2) )) / range;
			*/

			var fitZoneWidth = 100*(Math.abs(parseFloat(roundTo(tolerances[toleranceMinId])) - parseFloat(roundTo(tolerances[toleranceMaxId])) )) / range; 
			fitZonePosition = fitZoneWidth === 0 ? 1 : fitZoneWidth;
			var fitZonePosition = 100*((userMetricsDto ? parseFloat(roundTo(tolerances[toleranceMinId])) - parseFloat(roundTo(userMetricsDto[metricList[ind]])) + (range/2) : (range/2) )) / range;

			//var fitZonePosition = 100*((userMetricsDto ? roundTo(tolerances[toleranceMinId] - roundedUserMetric) + (range/2) : (range/2) )) / range;
			var fzLeftCrust = '0px';
			var fzRightCrust = '0px';

			/*
			* Get corner moulding curvature:  < 0: concave,  = 0: straight, > 0: convex
			* Where concave and straight correspond to white background-color
			* And convex correspond to gray background-color of the left/rightMoulding_divs
			*/
			var leftEdgeCurvature;
			var rightEdgeCurvature;

			switch(true){
				//Too loose
				case deltaX > toleranceMaxDelta:
					fitResults[sourceMetricId] = OxiAppConstants.fitResultValues.b;
					nextOverallFitResults = OxiAppConstants.fitResultValues.b;
					break;

				//Too tight
				case deltaX < toleranceMinDelta:
					fitResults[sourceMetricId] = OxiAppConstants.fitResultValues.b;
					nextOverallFitResults = OxiAppConstants.fitResultValues.b;
					break;

				//Fit
				case deltaX >= toleranceMinDelta && deltaX <= toleranceMaxDelta:
					fitResults[sourceMetricId] = OxiAppConstants.fitResultValues.a;

				default:
					break;
			}

			const zone = {
				NFZ_L: 0,		// non-fit zone left
				NFZ_R: 1,		// non-fit zone right
				FZ: 2,			// fit zone
				NFZ_L_FZ: 3,	// in-between non-fit zone left and fit zone
				FZ_NFZ_R: 4,	// in-between fit zone and non-fit zone right
				NZ: 5,			// no zone 
			};

			const stackup = {
				S_CURVE: 0,
				CONCAVE: 1,
				Z_CURVE: 2,
				CONVEX: 3,
				J_CURVE: 4,
				L_CURVE: 5,
				R_CURVE: 6,
				FR_CURVE: 7,	// flipped R_CURVE
				STRAIGHT: 8,
			}

			const stackupName = {
				0: 'S_CURVE',
				1: 'CONCAVE',
				2: 'Z_CURVE',
				3: 'CONVEX',
				4: 'J_CURVE',
				5: 'L_CURVE',
				6: 'R_CURVE',
				7: 'FR_CURVE',
				8: 'STRAIGHT',
			}

			/*	Zones
			*
			*	    0   3   2   4   1
			*	|///////|	    |///////|
			*/
			const mirroredZone = {
				0:1,
				1:0,
				2:2,
				3:4,
				4:3,
				5:5,	//no zone
			}

			const mirroredCurvature = {
				0:2,	//SCurve : ZCurve
				1:1,	//Concave : Concave
				2:0,	//ZCurve : SCurve
				3:3,	//Convex : Convex
				4:5,	//JCurve : LCuve
				5:4,	//LCurve : JCurve
				6:7,	//RCurve : Flipped RCurve
				7:6,	//Flipped RCurve : RCurve
				8:8,	//Straignt: Straight
			}	

			const curvatures = {
				0: (isMinTol) => ( 
						<SCurve props={{ 
							fzColor:fzColor, 
							nfzColor:nfzColor, 
							isMinTol 
						}} /> 
				),
				1: (isMinTol) => ( 
						<Curve props={{ 
							className:(isMinTol ? MetricStyles.leftCornerMoulding_div : MetricStyles.rightCornerMoulding_div), 
							color: concaveColor,
							alteration: 'concave',
							isMinTol,
						}} /> 
				),
				2: (isMinTol) => ( 
						<ZCurve props={{ 
							fzColor:fzColor, 
							nfzColor:nfzColor, 
							//'isLeftEdge':isMinTol,
							isMinTol,
						}} /> 
				),
				3: (isMinTol) => ( 
						<Curve props={{ 
							className: (isMinTol ? MetricStyles.leftCornerMoulding_div : MetricStyles.rightCornerMoulding_div), 
							color: convexColor,
							alteration: 'convex',
							isMinTol,
						}} /> 
				),
				4: (isMinTol) => ( 
						<Curve props={{ 
							className: (isMinTol ? MetricStyles.leftCornerMoulding_div : MetricStyles.rightCornerMoulding_div), 
							color: (isMinTol ? convexColor : concaveColor), 
							alteration: 'jcurve',
							isMinTol,
						}} /> 
				),
				5: (isMinTol) => ( 
						<Curve props={{ 
							className: (isMinTol ? MetricStyles.leftCornerMoulding_div : MetricStyles.rightCornerMoulding_div), 
							color: (isMinTol ? concaveColor : convexColor),
							alteration: 'lcurve',
							isMinTol,
						}} /> 
				),
				6: (isMinTol) => ( 
						<Curve props={{ 
							className: (isMinTol ? MetricStyles.leftCornerMoulding_div : MetricStyles.rightCornerMoulding_div), 
							color: (isMinTol ? concaveColor : convexColor),
							alteration: 'rcurve',
							isMinTol,
						}} /> 
				),
				7: (isMinTol) => ( 
						<Curve props={{ 
							className: (isMinTol ? MetricStyles.leftCornerMoulding_div : MetricStyles.rightCornerMoulding_div), 
							color: (isMinTol ? convexColor : concaveColor),
							alteration: 'flippedRcurve',
							isMinTol
						}} /> 
				),
				8: (isMinTol) => null,
			}

			/*
			* Determines in which zone the tolerance delta (td) exists.  The refernece can either be
			* the row above or the row below td.
			*
			* td (number):  tolerance delta
			* ref ({string : number}):  the previous or next set of tolerances with which to compare tolerance delta.
			*
			*        |///////| <--LTD        RTD--> |/////////|
			*        |////|   <--td          td--> |//////////|
			*
			*                        -OR-
			*
			*        |////|   <--td          td--> |//////////|
			*        |///////| <--LTD        RTD--> |/////////|
			*
			*/
			const getZone = (td, ref={LTD:0, RTD:0}) => {
				var result = undefined;
				var { LTD, RTD } = ref;

				// Exact match to body measurement
				//if(td === 0){
				//}
				// Start zone or end zones of the Graph
				if(LTD === undefined || RTD === undefined){
					result = zone.NZ;
				}
				else{
					switch(true){
						case td > LTD && td < RTD:
							result = zone.FZ;
							break;
		
						case td < LTD:
							result = zone.NFZ_L;
							break;
		
						case td > RTD:
							result = zone.NFZ_R;
							break;
	
						case td === LTD:
							result = zone.NFZ_L_FZ;
							break;
	
						case td === RTD:
							result = zone.FZ_NFZ_R;
							break;
		
						default:
							break;
					}
				}

				return result;
			}

			/*
			* Get the stackup curvature of the min talerance boundary.
			* This function can also be used to fine the right stack-up curvature after a mirroring operation is performed.
			*
			*		  NFZ_L    FZ     NFZ_R
			*		|///////|	   |////////|	topZone
			*		|////|			   |////|
			*		|//////////|	     |//|	bottomZone
			*/
			const getLeftStackup = (topZone, bottomZone) => {
				var result = undefined;

				switch(true){
					// S_CURVE
					case (
						//topZone === zone.FZ_NFZ_R && bottomZone === zone.FZ_NFZ_R ||
						topZone === zone.NFZ_L && bottomZone === zone.NZ ||
						topZone === zone.NFZ_R && bottomZone === zone.NZ ||
						topZone === zone.FZ_NFZ_R && bottomZone === zone.NZ ||
						topZone === zone.NFZ_L && bottomZone === zone.FZ ||
						topZone === zone.NFZ_R && bottomZone === zone.FZ ||
						topZone === zone.FZ_NFZ_R && bottomZone === zone.FZ
					):
						result = 0;
						break;

					// CONCAVE
					case (
						topZone === zone.NFZ_L && bottomZone === zone.NFZ_R ||
						topZone === zone.NFZ_L && bottomZone === zone.NFZ_L ||
						topZone === zone.NFZ_L && bottomZone === zone.FZ_NFZ_R ||
						topZone === zone.NFZ_R && bottomZone === zone.NFZ_L ||
						topZone === zone.FZ_NFZ_R && bottomZone === zone.NFZ_L ||
						topZone === zone.FZ_NFZ_R && bottomZone === zone.NFZ_R ||
						topZone === zone.NFZ_R && bottomZone === zone.NFZ_R ||
						topZone === zone.NFZ_R && bottomZone === zone.FZ_NFZ_R //||
						//topZone === zone.FZ_NFZ_R && bottomZone === zone.FZ_NFZ_R 
					):
						result = 1;
						break;

					// Z_CURVE
					case (
						topZone === zone.FZ && bottomZone === zone.NFZ_L ||
						topZone === zone.FZ && bottomZone === zone.NFZ_R ||
						topZone === zone.FZ && bottomZone === zone.FZ_NFZ_R ||
						topZone === zone.NZ && bottomZone === zone.NFZ_L ||
						topZone === zone.NZ && bottomZone === zone.NFZ_R ||
						topZone === zone.NZ && bottomZone === zone.FZ_NFZ_R ||
						topZone === zone.NZ && bottomZone === zone.NFZ_L ||
						topZone === zone.NZ && bottomZone === zone.NFZ_R ||
						topZone === zone.NZ && bottomZone === zone.FZ_NFZ_R 
					):
						result = 2;
						break;

					// CONVEX
					case ( 
						topZone === zone.FZ && bottomZone === zone.FZ ||
						topZone === zone.NZ && bottomZone === zone.FZ ||
						topZone === zone.FZ && bottomZone === zone.NZ 
					):
						result = 3;
						break;

					// J_CURVE
					case ( 
						topZone === zone.NFZ_L_FZ && bottomZone === zone.FZ ||
						topZone === zone.NFZ_L_FZ && bottomZone === zone.NZ 
					):
						result = 4;
						break;

					// L_CURVE
					case (
						topZone === zone.NFZ_L_FZ && bottomZone === zone.NFZ_L ||
						topZone === zone.NFZ_L_FZ && bottomZone === zone.NFZ_R ||
						topZone === zone.NFZ_L_FZ && bottomZone === zone.FZ_NFZ_R 
					):
						result = 5;
						break;

					// R_CURVE
					case (
						topZone === zone.NFZ_R && bottomZone === zone.FZ ||
						topZone === zone.FZ_NFZ_R && bottomZone === zone.NFZ_L_FZ ||
						topZone === zone.NFZ_L && bottomZone === zone.NFZ_L_FZ ||
						topZone === zone.NZ && bottomZone === zone.FZ_NFZ_R 
					):
						result = 6;
						break;

					// FR_CURVE
					case ( 
						topZone === zone.FZ && bottomZone === zone.NFZ_L_FZ ||
						topZone === zone.NZ && bottomZone === zone.NFZ_L_FZ 
					):
						result = 7;
						break;

					// STAIGHT
					case (
						topZone === zone.NFZ_L_FZ && bottomZone === zone.NFZ_L_FZ ||
						topZone === zone.FZ_NFZ_R && bottomZone === zone.FZ_NFZ_R 
					):
						result = 8;
						break;

					default:
						break; 
				}

				return result;
			}

			const getRightStackup = (topZone, bottomZone) => {
				var mirroredTopZone = mirroredZone[topZone];
				var mirroredBottomZone = mirroredZone[bottomZone];
				return getLeftStackup(mirroredTopZone, mirroredBottomZone);
			}

			const getCurvature = (su, isMinTol) => {
				var result = undefined;

				switch(true){
					case su === stackup.S_CURVE:
						curvature[stackup.S]
						break;
					case su === stackup.Z_CURVE:
						break;
					case su === stackup.CONCAVE:
						break;
					case su === stackup.CONVEX:
						break;
				}

				return result;
			}

			// Determin the top and bottom zones that the current tolerance delta occupies.
			// Use the top and bottom zone data to get the stackup key, then use the stackup key
			// to determin the curvature.

			var leftTopZone = getZone(toleranceMinDelta, { LTD: prevToleranceMinDelta, RTD: prevToleranceMaxDelta });
			var leftBottomZone = getZone(toleranceMinDelta, { LTD: nextToleranceMinDelta, RTD: nextToleranceMaxDelta });
			var leftStackupKey = getLeftStackup(leftTopZone, leftBottomZone);

			var rightTopZone = getZone(toleranceMaxDelta, { LTD: prevToleranceMinDelta, RTD: prevToleranceMaxDelta });
			var rightBottomZone = getZone(toleranceMaxDelta, { LTD: nextToleranceMinDelta, RTD: nextToleranceMaxDelta });
			var rightStackupKey = mirroredCurvature[ getRightStackup(rightTopZone, rightBottomZone) ];

			leftEdgeCurvature = leftStackupKey !== undefined ? curvatures[leftStackupKey](MIN_TOLERANCE) : null;
			rightEdgeCurvature = rightStackupKey !== undefined ? curvatures[rightStackupKey](MAX_TOLERANCE) : null;

			debugTable[metricList[ind]] = {
				...debugTable[metricList[ind]],
				'L stackup':(stackupName[leftStackupKey] ? stackupName[leftStackupKey] : `lsuk = ${leftStackupKey}`),
				'R stackup':(stackupName[rightStackupKey] ? stackupName[rightStackupKey] : `rsuk = ${rightStackupKey}`),
			}			
			
			// Fit zone crusts are extentions to the left and right fit zone area.
			// Their purpose is to fill the background of mouldings with negative curvature (wrt fit zone area).
			// Cursts have the same background-color as the fit zone background-color.
			var isLeftCrust = (
				leftStackupKey === stackup.CONVEX ||
				leftStackupKey === stackup.J_CURVE ||
				leftStackupKey === stackup.FR_CURVE //||
			//	leftStackupKey === stackup.Z_CURVE ||
			//	leftStackupKey === stackup.S_CURVE
			);

			var isRightCrust = (
				rightStackupKey === stackup.CONVEX ||
				rightStackupKey === stackup.R_CURVE ||
				rightStackupKey == stackup.L_CURVE //||
			//	rightStackupKey === stackup.Z_CURVE ||
			//	rightStackupKey === stackup.S_CURVE 
			);
//
			/*
			switch(true){
				case (
					leftStackupKey === stackup.R_CURVE || 
					leftStackupKey === stackup.L_CURVE || 
					leftStackupKey === stackup.CONCAVE 
				):
					fzLeftCrust = 'calc(-1*var(--moulding-radius))';
					//fzLeftCrust = `calc(-1*${deltaX/2}px)`;
					break;

				case (
					leftStackupKey === stackup.J_CURVE || 
					leftStackupKey === stackup.FR_CURVE || 
					leftStackupKey === stackup.CONVEX 
				):
					fzLeftCrust = 'var(--moulding-radius)';
					//fzLeftCrust = `calc(${deltaX/2}px)`;
					break;

				case leftStackupKey === stackup.STRAIGHT:
					fzLeftCrust = '0px';
					break;

				case (
					leftStackupKey === stackup.Z_CURVE ||
					leftStackupKey === stackup.S_CURVE
				):
					fzLeftCrust = 'var(--moulding-radius)';


				default:
					break;
			}

			switch(true){
				case (
					rightStackupKey === stackup.R_CURVE || 
					rightStackupKey === stackup.L_CURVE || 
					rightStackupKey === stackup.CONVEX 
				):
					fzRightCrust = 'var(--moulding-radius)';
					//fzRightCrust = `calc(${deltaX/2}px)`;
					break;

				case (
					rightStackupKey === stackup.J_CURVE || 
					rightStackupKey === stackup.FR_CURVE || 
					rightStackupKey === stackup.CONCAVE 
				):
					fzRightCrust = 'calc(-1*var(--moulding-radius))';
					//fzRightCrust = `calc(-1*${deltaX/2}px)`;
					break;

				case rightStackupKey === stackup.STRAIGHT:
					fzRightCrust = '0px';
					break;

				default:
					break;
			}
			*/
//

			var isAvailable = (deltaX !== undefined);
			var transNegToPos = this.prevDeltaX[sourceMetricId] < 0 && deltaX > 0;
			var transPosToNeg = this.prevDeltaX[sourceMetricId] > 0 && deltaX < 0;
			this.prevDeltaX[sourceMetricId] = deltaX;

			//console.log('transNegToPos = ', transNegToPos);
			//console.log('transPosToNeg = ', transPosToNeg);

			const createBar = (isLeftOfAxis) => {
				var transitionDelay = null;

				switch(true){

					// Transition accross axis from pos to neg deltaX
					case transPosToNeg:
						transitionDelay = isLeftOfAxis ? 
							({
								'transition-delay': '200ms',
								'transition-property': 'width'
							}) : 
							null;
						break;

					// Transition accross axis from neg to pos deltaX
					case transNegToPos:
						transitionDelay = !isLeftOfAxis ? 
							({
								'transition-delay': '200ms',
								'transition-property': 'width'
							}) : 
							null;
						break;

					default:
						break;
				}

				return (
					<div 
						className={
							MetricStyles.graphBar_div
							//this.props.labelHovered !== sourceMetricId ? 
							//	MetricStyles['graphBar_div'] :
							//	fitResults[sourceMetricId] !== OxiAppConstants.fitResultValues.b ? 
							//		MetricStyles['graphBar_div--highlight'] : 
							//		MetricStyles['graphBarNoFit_div--highlight']
						} 
						style={
							isAvailable ? 
								({
									...(
										isLeftOfAxis ? 
											({
												'border-right': 'unset',
												//'right': '0px',
												right: 'calc(var(--dot-height)/2)',
											}) : 
											({
												'border-left':'unset',
												//'left': '0px',
												left: 'calc(var(--dot-height)/2)',
											})
									),
									//'text-align': (isLeftOfAxis ? "right" : "unset"),
									...transitionDelay,
									width: (((deltaX < 0 && isLeftOfAxis) || (deltaX >= 0 && !isLeftOfAxis)) ? `calc((${Math.abs(deltaX)} / (${range/2}))*var(--x-axis-range)/2 - var(--dot-height))` : '0px'),
									//'left': (deltaX > 0 ? 'unset' : `calc((50% + (${xScale * xOffset}/100) * (var(--x-axis-range) + 1px)/2 + ${deltaX}*var(--x-axis-range)/2))`),
									...(fitResults[sourceMetricId] === OxiAppConstants.fitResultValues.b ? 
										({'--bar-fill-color':'#b1b1b1ad', '--bar-border-color':'var(--color-mobile-icon-bg)'}) : 
										({}) ),
								}) : 
								({
									display:'none',
								})
						} >
					</div>
				);
			}

			return(
				<React.Fragment>
						<div className={MetricStyles.barGraphContainer_div}>
							<div 
								className={MetricStyles.fitZone_div}
								style={{
									//width: `calc(${fitZoneWidth}%  + ${fzLeftCrust} + ${fzRightCrust})`,
									//left: `calc(${fitZonePosition}% - ${fzLeftCrust})`,
									width: `calc(${fitZoneWidth}%  + ${isLeftCrust ? 'var(--moulding-radius)' : '0px'} + ${isRightCrust ? 'var(--moulding-radius)' : '0px'})`,
									left: `calc(${fitZonePosition}% - ${isLeftCrust ? 'var(--moulding-radius)' : '0px'})`,
								}}
							>
								<div 
									style={{
										position:'relative',
										width:'100%',
										height:'100%',
									}}
								> 
									{ leftEdgeCurvature }
									{ rightEdgeCurvature }
								</div>
							</div>
							{/*<div 
								style={{
									'margin-left':'calc(50% + (' + `${xScale * xOffset}` + '/100) * (var(--x-axis-range) + 1px)/2)',
								}}>
								<div 
									className={
										this.props.labelHovered !== sourceMetricId ? 
											MetricStyles['graphBar_div'] :
											fitResults[sourceMetricId] !== OxiAppConstants.fitResultValues.b ? 
												MetricStyles['graphBar_div--highlight'] : 
												MetricStyles['graphBarNoFit_div--highlight']
									} 
									style={
										isAvailable ? 
											({
												'width':`calc((${ Math.abs(deltaX) })*var(--x-axis-range)/2)`,
												'left': (deltaX > 0 ? 'unset' : `calc((50% + (${xScale * xOffset}/100) * (var(--x-axis-range) + 1px)/2 + ${deltaX}*var(--x-axis-range)/2))`),
												...(fitResults[sourceMetricId] === OxiAppConstants.fitResultValues.b ? 
													({'--bar-fill-color':'#b1b1b1ad', '--bar-border-color':'#929292'}) : 
													({}) ),
											}) : 
											({
												display:'none',
											})
									} >
								</div>
							</div>*/}

							<div id="negativeDeltaWRTOwner" className={MetricStyles.graphBarContainer_div} style={{'text-align': 'right'}}>
								{createBar(true)}
							</div>
							<div id="positiveDeltaWRTOwner" className={MetricStyles.graphBarContainer_div} style={{left: '50%'}}>
								{createBar(false)}
							</div>
							<div 
								className={MetricStyles.hostDot_div}
								style={{
									//left: 'calc(50% - (4/5)*var(--x-axis-range)/2 - var(--dot-height)/2)'
									left: '50%',
									transform: `translateX(calc(${deltaX < 0 ? "-" : ""}1*(${Math.abs(deltaX)} / (${range}))*var(--x-axis-range) - var(--dot-height)/2))`,
								}}
							>
							</div>
							<div className={MetricStyles.ownerDot_div}>
								<div style={{position:'relative', width:'100%'}}>
									<div className={MetricStyles.ownerDotIndicator_div}>
									</div>
								</div>
							</div>
						</div>
	
					{/*<line 
					x1 = {(ind != 0) ? `${sourceMetrics[sourceMetricIds[ind-1]] + pointRadius}%` : 0}
					y1 = {(ind != 0) ? `${( (yOffsetStart*2) + ( (ind - 1) * ( yPercentOffset*2 + pointRadius/2 ) ) )}%` : 0}
					x2 = {(ind != 0) ? `${sourceMetrics[sourceMetricId]+ pointRadius}%` : 0}
					y2 = {(ind != 0) ? `${( (yOffsetStart*2) + ( (ind) * ( yPercentOffset*2 + pointRadius/2 ) ) )}%` : 0}
					//lineColor = {this.props.lineColor | 'black'}
					stroke = {this.props.lineColor ? this.props.lineColor : '#bcbcbc'}
					stroke-width = "1%"
					/>
					{
						ind !== 0 ? (<circle 
										cx={`${sourceMetrics[sourceMetricIds[ind-1]] + pointRadius}%`} 
										cy={`${( (yOffsetStart*2) + ( (ind-1) * ( yPercentOffset*2 + pointRadius/2 ) ) )}%`} 
										r="2%" 
										fill="#fdfdfd" 
										stroke="black" 
										stroke-width="0.5%"
									/>) : null
					}
					{
						ind === (sourceMetricIds.length-1) ? (<circle 
							cx={`${sourceMetrics[sourceMetricIds[ind]] + pointRadius}%`} 
							cy={`${( (yOffsetStart*2) + ( (ind) * ( yPercentOffset*2 + pointRadius/2 ) ) )}%`} 
							r="2%" 
							fill="#fdfdfd" 
							stroke="black" 
							stroke-width="0.5%"
						/>) : null			    					
					}*/}
				</React.Fragment>
			);

		});

		console.table(debugTable);

		console.log('labelPosMap = ', labelPosMap);
		if(updateLabelPositions !== null && updateLabelPositions !== undefined){
			updateLabelPositions(labelPosMap)
		}else{
			null
		}

		if(nextOverallFitResults !== fitResult){
			setFitResult(nextOverallFitResults);
		}

		console.log('fitResults = ', fitResults);

		return(
			<div 
				className={MetricStyles.metricGraphBarsContainer_div}
				style={{'--moulding-radius': `calc(var(--x-axis-range)/${4*range})`}}	// Sets moulding radius to the min fit zone width to half the distance between tick count (defined as 2*range)
			>
				{output}
				{/*
					true ? null :
					<svg viewBox='0 0 100 auto'  
						preserveAspectRatio="none" 
						style={{
							'position':'absolute', 
							'height':'100%', 
							'width':'100%', 
							'left':'0', 
							'top':'0',
							'padding-top':`${pointRadius*2}%`,
							'padding-bottom':`${pointRadius*2}%`,
							'padding-left':`${pointRadius*2}%`,
							'padding-right':`${pointRadius*2}%`
						}}>
						{
							output
						}
					</svg>
				*/}
				<div className={MetricStyles.toleranceBoundsMin_div}>
				</div>
				<div className={MetricStyles.toleranceBoundsMax_div}>
				</div>
			</div>
		);
	}
}

class Labels extends React.Component{
	constructor(props){
		super(props);
	}

	render(){

		const {
			_handleOnHover,
		} = this.props;

		var{
			naLabels,
			projectedValues,
			labelToPositionMap,
			labelHovered
		} = this.props;

		console.log('labelToPositionMap = ', labelToPositionMap)
		console.log('keys of labelToPositionMap = ', Object.keys(labelToPositionMap))
		return(
			<div 
				className={MetricStyles.axisLabelUpperBody}
				onMouseLeave={() => _handleOnHover(null)}>
					{
						Object.keys(labelToPositionMap).map((label, ind) => {
							//var isApplicable = naLabels[label] === undefined;
							var isApplicable = projectedValues[label] !== undefined;

							return(
										<div 
											className={label === labelHovered ? MetricStyles['labelFormatting_div--hovered'] : MetricStyles['labelFormatting_div']}
											style={ isApplicable ? ({}) : ({color:'var(--color2)'}) }
											onMouseEnter={ isApplicable ? () => _handleOnHover(label) : null}>
											{label}
										</div>
							);
						})
					}
			</div>
		);
	}
}

class MetricList extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			labelHovered: '',
			ownerValues: {},
			hostValues: {},
			//fitResult: null,
			labels:{
				upperBody:{},
				lowerBody:{}
			},
		}
		this.projectGraphState = this.projectGraphState.bind(this);
		this.setUpperBodyLabelPosition = this.setUpperBodyLabelPosition.bind(this);
		this.setLowerBodyLabelPosition = this.setLowerBodyLabelPosition.bind(this);
		this.areObjectsDifferent = this.areObjectsDifferent.bind(this);
		this._handleOnHover = this._handleOnHover.bind(this);
		//this.setFitResult = this.setFitResult.bind(this);
	}

	areObjectsDifferent(objectA, objectB){
		let objectValDiff = false;
		for(let key of Object.keys(objectA)){
			objectValDiff |= objectA[key] !== objectB[key]
		}
		return objectValDiff;
	}

	//Only call render if 
	shouldComponentUpdate(nextProps, nextState){
		let labelHoveredDiff = nextState.labelHovered !== this.state.labelHovered;
		//Owner
		let ownerUpperBodyMetricsDiff = this.areObjectsDifferent(nextProps.ownerUpperBodyMetrics, this.props.ownerUpperBodyMetrics);
		let ownerLowerBodyMetricsDiff = this.areObjectsDifferent(nextProps.ownerLowerBodyMetrics, this.props.ownerLowerBodyMetrics);
		//Host
		let hostUpperBodyMetricsDiff = this.areObjectsDifferent(nextProps.hostUpperBodyMetrics, this.props.hostUpperBodyMetrics);
		let hostLowerBodyMetricsDiff = this.areObjectsDifferent(nextProps.hostLowerBodyMetrics, this.props.hostLowerBodyMetrics);
		//check if state label positions have been altered calls to setUpperBodyLabelPosition() and setLowerBodyLabelPosition()
		let upperBodyState = this.areObjectsDifferent(nextState.labels.upperBody, this.state.labels.upperBody);		
		let lowerBodyState = this.areObjectsDifferent(nextState.labels.lowerBody, this.state.labels.lowerBody);

		let shouldUpdate = upperBodyState | lowerBodyState | ownerUpperBodyMetricsDiff | ownerLowerBodyMetricsDiff | hostUpperBodyMetricsDiff | hostLowerBodyMetricsDiff | labelHoveredDiff;
		console.log('shouldUpdate = ', shouldUpdate);
		return shouldUpdate;
	}

	projectGraphState(projection, ownerMetrics, hostMetrics){
		console.log('in projectGraphState');
		let ownerStateResult = {};
		let hostStateResult = {};
		let ownerMetricIds = Object.keys(ownerMetrics);
		let hostMetricIds = Object.keys(hostMetrics);

		console.log('hostMetrics',hostMetrics);
		console.log('ownerMetrics',ownerMetrics);
		
		const checkIfStringAndConvert = (value) => typeof value === 'string' ? parseInt(value, 10) : value;

		if(!(ownerMetricIds.length === 0 && ownerMetrics.constructor === Object) && !(hostMetricIds.length === 0 && hostMetrics.constructor === Object)){
			
			for(let key of hostMetricIds){
				console.log('ownerMetrics[', key, '] = ', ownerMetrics[key]);
				console.log('hostMetrics[', key, '] = ', hostMetrics[key]);

				var hostMetric = hostMetrics[key];

				//Get the average of hostMetrics[key] min/max measurments if applicable.  These will be provided by retaielrs
				if(typeof hostMetrics[key] === 'object'){
						
					switch(hostMetrics[key].min && hostMetrics[key].max){
			
						case (hostMetrics[key].min && hostMetrics[key].max):
							var min = checkIfStringAndConvert(hostMetrics[key].min);
							var max = checkIfStringAndConvert(hostMetrics[key].max);				
							hostMetric = min + (Math.abs(max - min) / 2);
							break;
			
						case hostMetrics[key].min:
							hostMetric = (checkIfStringAndConvert(hostMetrics[key].min));
							break;
			
						case hostMetrics[key].max:
							hostMetric = (checkIfStringAndConvert(hostMetrics[key].max));
							break;
			
						default:
							break;
					}
				}

				let projectedValues = projection(ownerMetrics[key], hostMetric);
				console.log('projectedValues = ', projectedValues);
				ownerStateResult = Object.assign(ownerStateResult, {[key]: projectedValues.ownerValue});
				hostStateResult = Object.assign(hostStateResult, {[key]: projectedValues.hostValue});
			}

			console.log('ownerStateResult = ', ownerStateResult);
			console.log('hostStateResult = ', hostStateResult);
			/*this.setState({
				ownerValues: ownerStateResult,
				hostValues: hostStateResult
			});*/
			return({
				ownerValues: ownerStateResult,
				hostValues: hostStateResult
			});
		}
		else{
			return null;
		}
	}

	setUpperBodyLabelPosition(labelPositions){
		this.setState(prevState => ({
			...prevState,
			labels : {
				...prevState.labels,
				upperBody: {
					...prevState.labels.upperBody,
					...labelPositions
				}
			}
		}))
	}

	setLowerBodyLabelPosition(labelPositions){
		this.setState(prevState => ({
			...prevState,
			labels : {
				...prevState.labels,
				lowerBody: {
					...prevState.labels.lowerBody,
					...labelPositions
				}
			}
		}))
	}

	_handleOnHover(label, event){
		this.setState(prevState => ({
			labelHovered: label,
		}));
	}

	//setFitResult(result){
	//	this.setState(prevState => ({
	//		...prevState,
	//		fitResult: result,
	//	}));
	//}

	render(){

		const {
			setFitResult
		} = this.props;

		var {
			tolerances,
			userMetricsDto,
			fitResult,
			ownerUpperBodyMetricIds,
			ownerLowerBodyMetricIds,
			ownerBodyShape,
			hostBodyShape,
			ownerLowerBodyMetrics,
			ownerUpperBodyMetrics,
			hostUpperBodyMetrics,
			hostLowerBodyMetrics,
		} = this.props;
		/*
		console.log('ownerMetrics');
		console.log(this.props.ownerMetrics);
		console.log('ownerMetricIds');
		console.log(this.props.ownerMetricIds);
		*/
		//let projectedXCoord = this.projectGraphState(BodyFitProjection);

		//let projectedUpperBodyXCoord = this.projectGraphState(BodyFitProjectionCentered, this.props.ownerUpperBodyMetrics, this.props.hostUpperBodyMetrics);
		//let projectedLowerBodyXCoord = this.projectGraphState(BodyFitProjectionCentered, this.props.ownerLowerBodyMetrics, this.props.hostLowerBodyMetrics);

		let projectedUpperBodyXCoord = this.projectGraphState(BodyFitProjectionOwnerAlign, ownerUpperBodyMetrics, hostUpperBodyMetrics);
		let projectedLowerBodyXCoord = this.projectGraphState(BodyFitProjectionOwnerAlign, ownerLowerBodyMetrics, hostLowerBodyMetrics);

		//let projectedValues = projectedUpperBodyXCoord === null || projectedLowerBodyXCoord === null ?
		//	({...ownerUpperBodyMetrics, ...ownerLowerBodyMetrics}) :
		//	({...projectedUpperBodyXCoord.hostValues, ...projectedLowerBodyXCoord.hostValues});

		let projectedValues = ({
			...(projectedUpperBodyXCoord !== null ? (projectedUpperBodyXCoord.hostValues) : ({})), 
			...(projectedLowerBodyXCoord !== null ? (projectedLowerBodyXCoord.hostValues) : ({})),
		});

		/*console.log('projectedUpperBodyXCoord = ',projectedUpperBodyXCoord)
		console.log('projectedLowerBodyXCoord = ',projectedLowerBodyXCoord)
		console.log('ownerLowerBodyMetricIds = ', ownerLowerBodyMetricIds)
		console.log('this.props.hostLowerBodyMetricIds = ', this.props.hostLowerBodyMetricIds)*/
		let yPercentOffset = ( 100 / (2 * ownerUpperBodyMetricIds.length) );
		let yOffsetStart = 0//( yPercentOffset );
		let pointRadius = '3';
		let absYOffset = (true ? absYOffset = (ownerUpperBodyMetricIds.length * 13) : 0);

		let yPercentOffsetLow = ( 100 / (2 * ownerLowerBodyMetricIds.length) );
		let yOffsetStartLow = 0//( yPercentOffset );
		let pointRadiusLow = '3';
		let absYOffsetLow = (true ? absYOffset = (ownerLowerBodyMetricIds.length * 13) : 0);

		var sourceMetricIds = [...ownerUpperBodyMetricIds, ...ownerLowerBodyMetricIds];

		//console.log('this.state.labels.upperBody = ', this.state.labels.upperBody)
		//console.log('this.state.labels.lowerBody = ', this.state.labels.lowerBody)
		return (
			<React.Fragment>	
				<div className={MetricStyles.metricGraphContainer_div}>
					<div id='upperBodySection' style={upperBodySection_div}>
						<div style={{height:'100%'}}>
							<Labels 
								labelToPositionMap={{...this.state.labels.upperBody, ...this.state.labels.lowerBody}} 
								_handleOnHover={(label, event) => this._handleOnHover(label, event)}
								labelHovered={this.state.labelHovered}
								naLabels={this.state.naLabels}
								projectedValues={projectedValues} />

								<React.Fragment>
									<MetricGraph 
										sourceMetricIds={[...ownerUpperBodyMetricIds, ...ownerLowerBodyMetricIds]} 
										sourceMetrics={ projectedValues }
										updateLabelPositions={this.setUpperBodyLabelPosition}
										labelHovered={this.state.labelHovered}
										tolerances={tolerances}
										userMetricsDto={userMetricsDto}
										setFitResult={setFitResult}
										fitResult={fitResult}
									/>
									{/*<MetricGraph 
										sourceMetricIds={this.props.hostUpperBodyMetricIds} 
										sourceMetrics={projectedUpperBodyXCoord === null ? this.props.hostUpperBodyMetrics : projectedUpperBodyXCoord.hostValues} 
										host={true} 
										lineColor="#212121"
										updateLabelPositions={null}
									/>*/}
								</React.Fragment>

						</div>
					</div>
					{
						/*<div id='lowerBodySection' style={upperBodySection_div}>
							<div> 
								<Labels 
									labelToPositionMap={this.state.labels.lowerBody} 
									_handleOnHover={(label, event) => this._handleOnHover(label, event)}
									labelHovered={this.state.labelHovered}/>
								<React.Fragment>
									<MetricGraph 
										sourceMetricIds={ownerLowerBodyMetricIds} 
										sourceMetrics={projectedLowerBodyXCoord === null ? this.props.ownerLowerBodyMetrics : projectedLowerBodyXCoord.hostValues}
										updateLabelPositions={this.setLowerBodyLabelPosition} 
										labelHovered={this.state.labelHovered}
										tolerances={this.props.tolerances}
										userMetricsDto={this.props.userMetricsDto}
									/>
									{
										//<MetricGraph 
										//	sourceMetricIds={this.props.hostLowerBodyMetricIds} 
										//	sourceMetrics={projectedLowerBodyXCoord === null ? this.props.hostLowerBodyMetrics : projectedLowerBodyXCoord.hostValues} 
										//	host={true} 
										//	lineColor="#212121"
										//	updateLabelPositions={null}/>
									}
								</React.Fragment>
							</div>
						</div>*/
					}
				</div>
	
				<div className={MetricStyles.mbodyDiagramContainer_div}>
					<div style={{'height':'100%'}}>
						<BodyDiagram 
							bodyShape={
								hostBodyShape !== null ? 
									hostBodyShape : 
									ownerBodyShape !== null ? 
										ownerBodyShape : 
										ownerBodyShape 
							} 
							selectedField={this.state.labelHovered} 
							orientation='left' />
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default MetricList;