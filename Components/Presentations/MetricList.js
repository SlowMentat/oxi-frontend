import React from 'react';
import PropTypes from 'prop-types';
import MetricStyles from '../../metric.css';
import Metric from './Metric.js';
import BodyDiagram from './BodyDiagram.js';

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

	switch(props.alteration){
		case 'lcurve':
			alterationStyle = {
				'border-top-right-radius':'0px',
				'border-top-left-radius':'0px'
			};
			break;

		case 'rcurve':
			alterationStyle = {
				'border-bottom-right-radius':'0px',
				'border-bottom-left-radius':'0px'
			};
			break;

		case 'flippedRcurve':
			alterationStyle = {
				'border-bottom-right-radius':'0px',
				'border-bottom-left-radius':'opx',
			};
			break;

		case 'jcurve':
			alterationStyle = {
				'border-top-right-radius':'0px',
				'border-top-left-radius':'0px'
			};
			break;

		default:
			break;
	}

	return(
		<div 
			id={props.alteration}
			className={props.className}
			style={{
				'background-color':`${props.color}`,
				...alterationStyle
			}} >										
		</div>
	);
}

//const ConvexCurve = ({props}) => {
//	let alteration = {};
//
//	switch(props.alteration){
//		case 'flippedRcurve':
//			alterationStyle = {
//				'border-bottom-right-radius':'0px',
//				'border-bottom-left-radius':'opx'
//			};
//		case 'jcurve':
//			alterationStyle = {
//				'border-top-right-radius':'0px',
//				'border-top-left-radius':'0px'
//			};
//		default:
//			break;
//	}
//
//	return(
//		<div 
//			className={props.className}
//			style={{
//				'background-color':`${props.convexColor}`,
//				...alteration
//			}} >										
//		</div>
//	);
//}

const SCurve = ({props}) => {
	var { fzColor, nfzColor, isLeftEdge } = props;
	var posAdjust = isLeftEdge ? ({left:'-10px'}) : ({left:'unset', right:'-10px'});
	return(
		<div 
			id="scurve"
			className={MetricStyles.leftCornerMoulding_div}
			style={{
				width:'20px',
				...posAdjust,
			}} >
			<div style={{position:'relative', width:'100%', height:'100%'}}>
				<div style={{height:'50%', 'background-color':`${isLeftEdge ? nfzColor : fzColor }`}}>						
				</div>
				<div style={{height:'50%', 'background-color':`${isLeftEdge ? fzColor : nfzColor }`}}>						
				</div>
				<div 
					className={MetricStyles.leftCornerMoulding_div}
					style={{
						top:'0px',
						left:'0px',
						height:'100%',
						width:'50%',
						'background-color':`${isLeftEdge ? nfzColor : fzColor}`,
						'margin-top':'unset',
						'border-bottom-left-radius':'0px',
					}} >
				</div>
				<div
					className={MetricStyles.rightCornerMoulding_div}
					style={{
						right:'0px',
						top:'0px',
						height:'100%',
						width:'50%','background-color':`${isLeftEdge ? fzColor : nfzColor}`,
						'margin-top':'unset',
						'border-top-right-radius':'0px',
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
	var { fzColor, nfzColor, isLeftEdge } = props;
	var posAdjust = isLeftEdge ? ({left:'-10px'}) : ({left:'unset', right:'-10px'});
	return(
		<div 
			id="zcurve"
			className={MetricStyles.leftCornerMoulding_div}
			style={{
				width:'20px',
				...posAdjust,
			}} >
			<div style={{position:'relative', width:'100%', height:'100%'}}>
				<div style={{height:'50%', 'background-color':`${isLeftEdge ? fzColor : nfzColor }`}}>						
				</div>
				<div style={{height:'50%', 'background-color':`${isLeftEdge ? nfzColor : fzColor }`}}>						
				</div>
				<div 
					className={MetricStyles.leftCornerMoulding_div}
					style={{
						top:'0px', 
						left:'0px', 
						height:'100%', 
						width:'50%','background-color':`${isLeftEdge ? nfzColor : fzColor}`,
						'margin-top':'unset',
						'border-top-left-radius':'0px',
					}} >
				</div>
				<div
					className={MetricStyles.rightCornerMoulding_div}
					style={{
						top:'0px', 
						right:'0px', 
						height:'100%', 
						width:'50%','background-color':`${isLeftEdge ? fzColor : nfzColor}`,
						'margin-top':'unset',
						'border-bottom-right-radius':'0px',
					}} >
				</div>
			</div>
		</div>
	);	
}

class MetricGraph extends React.Component{
	constructor(props){
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState){
		let sourceMetricIdsDiff = nextProps.sourceMetricIds !== this.props.sourceMetricIds;
		let sourceMetricsDiff = nextProps.sourceMetrics !== this.props.sourceMetrics;
		let hostDiff = nextProps.host !== this.props.host;
		let lineColorDiff = nextProps.lineColor !== this.props.lineColor;
		
		return sourceMetricIdsDiff | sourceMetricsDiff | hostDiff | lineColorDiff;
	}

	render(){
		let width = 50;
		let height = width;
		let yPercentOffset = ( 100 / (2 * this.props.sourceMetricIds.length) );
		let pointRadius = 3;
		let yOffsetStart = ( (yPercentOffset - pointRadius*2) / 2);
		let {tolerances, userMetricsDto} = this.props;
		let labelPosMap = {};

		let output = this.props.sourceMetricIds.map((sourceMetricId, ind, metricList) => {
			//console.log('ind = ', ind)
			//console.log('yPercentOffset = ', yPercentOffset)
			//console.log('yOffsetStart = ', yOffsetStart)
			//console.log('sourceMetricIds = ', this.props.sourceMetricIds)
			//console.log('this.props.sourceMetrics = ', this.props.sourceMetrics)
			//console.log('x1:  this.props.sourceMetrics[sourceMetricIds[ind-1]] = ', this.props.sourceMetrics[this.props.sourceMetricIds[ind-1]])
			//console.log('x2:  this.props.sourceMetrics[sourceMetricId] = ', this.props.sourceMetrics[sourceMetricId])
			//let labelPosYCss = `calc((${( yOffsetStart + ( ind * ( yPercentOffset )))} / 100) * (100vh))`
			const MIN_TOLERANCE = true;
			const MAX_TOLERANCE = !MIN_TOLERANCE;

			let labelPosYCss = `${( (yOffsetStart*2) + ( (ind) * ( yPercentOffset*2) ) )}%`;
			labelPosMap[sourceMetricId] = labelPosYCss;

			var fzColor = 'var(--fz-color)';
			var nfzColor = 'var(--nfz-color)';
			var concaveColor = fzColor;
			var convexColor = nfzColor;
			let xScale = 1;// 1.65;
			let xOffset = this.props.sourceMetrics[sourceMetricId] >= 0 ? 0 : this.props.sourceMetrics[sourceMetricId];
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

			var toleranceMinDelta = (tolerances[toleranceMinId] - roundedUserMetric);
			var prevToleranceMinDelta = prevToleranceMinId ? (tolerances[prevToleranceMinId] - roundedPrevUserMetric) : undefined;
			var nextToleranceMinDelta = nextToleranceMinId ? (tolerances[nextToleranceMinId] - roundedNextUserMetric) : undefined;

			var toleranceMaxDelta = (tolerances[toleranceMaxId] - roundedUserMetric) ;
			var prevToleranceMaxDelta = prevToleranceMaxId ? (tolerances[prevToleranceMaxId] - roundedPrevUserMetric)  : undefined;
			var nextToleranceMaxDelta = nextToleranceMaxId ? (tolerances[nextToleranceMaxId] - roundedNextUserMetric)  : undefined;

			var toleranceId = this.props.sourceMetrics[sourceMetricId] >= 0 ? toleranceMinId : toleranceMaxId;
			//get the fit zone dimensions, position
			var fitZoneWidth = 100*(Math.abs(tolerances[toleranceMinId] - tolerances[toleranceMaxId]))/10;
			var fitZonePosition = 100*((userMetricsDto ? tolerances[toleranceMinId] - roundedUserMetric + 5 : 5))/10;
			var leftCurveAlign = 'var(--moulding-radius)';
			var rightCurveAlign = 'var(--moulding-radius)';
			//get corner moulding curvature:  < 0: concave,  = 0: straight, > 0: convex
			//where concave and straight correspond to white background-color
			//and convex correspond to gray background-color of the left/rightMoulding_divs
			var leftEdgeCurvature;
			var rightEdgeCurvature;

			const zone = {
				NFZ_L: 0,		//non-fit zone left
				NFZ_R: 1,		//non-fit zone right
				FZ: 2,			//fit zone
				NFZ_L_FZ: 3,	//in-between non-fit zone left and fit zone
				FZ_NFZ_R: 4,	//in-between fit zone and non-fit zone right
				NZ: 5,			//no zone 
			};

			const stackup = {
				S_CURVE: 0,
				CONCAVE: 1,
				Z_CURVE: 2,
				CONVEX: 3,
				J_CURVE: 4,
				L_CURVE: 5,
				R_CURVE: 6,
				FR_CURVE: 7,	//flipped R_CURVE
				STRAIGHT: 8,
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
				0: (isMinTol) => ( <SCurve props={{ fzColor:fzColor, nfzColor:nfzColor, 'isLeftEdge':isMinTol }}/> ),
				1: (isMinTol) => ( 
						<Curve props={{ 
							className:(isMinTol ? MetricStyles.leftCornerMoulding_div : MetricStyles.rightCornerMoulding_div), 
							color: concaveColor 
						}} /> 
				),
				2: (isMinTol) => ( <ZCurve props={{ fzColor:fzColor, nfzColor:nfzColor, 'isLeftEdge':isMinTol }}/> ),
				3: (isMinTol) => ( 
						<Curve props={{ 
							className: (isMinTol ? MetricStyles.leftCornerMoulding_div : MetricStyles.rightCornerMoulding_div), 
							color: convexColor 
						}} /> 
				),
				4: (isMinTol) => ( 
						<Curve props={{ 
							className: (isMinTol ? MetricStyles.leftCornerMoulding_div : MetricStyles.rightCornerMoulding_div), 
							color: (isMinTol ? convexColor : concaveColor), 
							alteration: 'jcurve'
						}} /> 
				),
				5: (isMinTol) => ( 
						<Curve props={{ 
							className: (isMinTol ? MetricStyles.leftCornerMoulding_div : MetricStyles.rightCornerMoulding_div), 
							color: (isMinTol ? concaveColor : convexColor),
							alteration: 'lcurve'
						}} /> 
				),
				6: (isMinTol) => ( 
						<Curve props={{ 
							className: (isMinTol ? MetricStyles.leftCornerMoulding_div : MetricStyles.rightCornerMoulding_div), 
							color: (isMinTol ? concaveColor : convexColor),
							alteration: 'rcurve'
						}} /> 
				),
				7: (isMinTol) => ( 
						<Curve props={{ 
							className: (isMinTol ? MetricStyles.leftCornerMoulding_div : MetricStyles.rightCornerMoulding_div), 
							color: (isMinTol ? convexColor : concaveColor),
							alteration: 'flippedRcurve'
						}} /> 
				),
				8: (isMinTol) => null,
			}

			/*
			*	td (number):  tolerance delta
			*	ref ({string : number}):  the previous or next set of tolerances with which to compare tolerance delta.
			*
			*        |///////| <--LTD        RTD--> |/////////|
			*        |////|   <--td          td--> |//////////|
			*
			*                        -OR-
			*
			*        |////|   <--td          td--> |//////////|
			*        |///////| <--LTD        RTD--> |/////////|
			*
			*	isMinTD (boolean):  indicates if tolerance delta is a min or max tolerance indicating left or right edge respectively
			*/
			const getZone = (td, ref={LTD:0, RTD:0}) => {
				var result = undefined;
				var { LTD, RTD } = ref;

				//Start zone or end zones of the Graph
				if(LTD === undefined || RTD === undefined){
					result = zone.NZ;
				}else{
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
			*		  NFZ_L    FZ     NFZ_R
			*		|///////|	   |////////|	topZone
			*		|////|			   |////|
			*		|//////////|	     |//|	bottomZone
			*/
			const getLeftStackup = (topZone, bottomZone) => {
				var result = undefined;

				switch(true){
					//S_CURVE
					case (
						topZone === zone.FZ_NFZ_R && bottomZone === zone.FZ_NFZ_R ||
						topZone === zone.NFZ_L && bottomZone === zone.NZ ||
						topZone === zone.NFZ_R && bottomZone === zone.NZ ||
						topZone === zone.FZ_NFZ_R && bottomZone === zone.NZ ||
						topZone === zone.NFZ_L && bottomZone === zone.FZ ||
						topZone === zone.NFZ_R && bottomZone === zone.FZ ):
						result = 0;
						break;

					//CONCAVE
					case (
						topZone === zone.NFZ_L && bottomZone === zone.NFZ_R ||
						topZone === zone.NFZ_L && bottomZone === zone.NFZ_L ||
						topZone === zone.NFZ_L && bottomZone === zone.FZ_NFZ_R ||
						topZone === zone.NFZ_R && bottomZone === zone.NFZ_L ||
						topZone === zone.FZ_NFZ_R && bottomZone === zone.NFZ_L ||
						topZone === zone.FZ_NFZ_R && bottomZone === zone.NFZ_R ||
						topZone === zone.NFZ_R && bottomZone === zone.NFZ_R ||
						topZone === zone.NFZ_R && bottomZone === zone.FZ_NFZ_R ||
						topZone === zone.FZ_NFZ_R && bottomZone === zone.FZ_NFZ_R ):
						result = 1;
						break;

					//Z_CURVE
					case (
						topZone === zone.FZ && bottomZone === zone.NFZ_L ||
						topZone === zone.FZ && bottomZone === zone.NFZ_R ||
						topZone === zone.FZ && bottomZone === zone.FZ_NFZ_R ||
						topZone === zone.NZ && bottomZone === zone.NFZ_L ||
						topZone === zone.NZ && bottomZone === zone.NFZ_R ||
						topZone === zone.NZ && bottomZone === zone.FZ_NFZ_R ||
						topZone === zone.NZ && bottomZone === zone.NFZ_L ||
						topZone === zone.NZ && bottomZone === zone.NFZ_R ||
						topZone === zone.NZ && bottomZone === zone.FZ_NFZ_R ):
						result = 2;
						break;

					//CONVEX
					case ( 
						topZone === zone.FZ && bottomZone === zone.FZ ||
						topZone === zone.NZ && bottomZone === zone.FZ ||
						topZone === zone.FZ && bottomZone === zone.NZ ):
						result = 3;
						break;

					//J_CURVE
					case ( 
						topZone === zone.NFZ_L_FZ && bottomZone === zone.FZ ||
						topZone === zone.NFZ_L_FZ && bottomZone === zone.NZ ):
						result = 4;
						break;

					//L_CURVE
					case (
						topZone === zone.NFZ_L_FZ && bottomZone === zone.NFZ_L ||
						topZone === zone.NFZ_L_FZ && bottomZone === zone.NFZ_R ||
						topZone === zone.NFZ_L_FZ && bottomZone === zone.FZ_NFZ_R ):
						result = 5;
						break;

					//R_CURVE
					case (
						topZone === zone.NFZ_R && bottomZone === zone.FZ ||
						topZone === zone.FZ_NFZ_R && bottomZone === zone.NFZ_L_FZ ||
						topZone === zone.NFZ_L && bottomZone === zone.NFZ_L_FZ ):
						result = 6;
						break;

					//FR_CURVE
					case ( 
						topZone === zone.FZ && bottomZone === zone.NFZ_L_FZ ||
						topZone === zone.NZ && bottomZone === zone.NFZ_L_FZ ):
						result = 7;
						break;

					//STAIGHT
					case ( topZone === zone.NFZ_L_FZ && bottomZone === zone.NFZ_L_FZ ):
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

			var leftTopZone = getZone(toleranceMinDelta, { LTD: prevToleranceMinDelta, RTD: prevToleranceMaxDelta });
			var leftBottomZone = getZone(toleranceMinDelta, { LTD: nextToleranceMinDelta, RTD: nextToleranceMaxDelta });
			var leftStackupKey = getLeftStackup(leftTopZone, leftBottomZone);

			var rightTopZone = getZone(toleranceMaxDelta, { LTD: prevToleranceMinDelta, RTD: prevToleranceMaxDelta });
			var rightBottomZone = getZone(toleranceMaxDelta, { LTD: nextToleranceMinDelta, RTD: nextToleranceMaxDelta });
			var rightStackupKey = mirroredCurvature[ getRightStackup(rightTopZone, rightBottomZone) ];

			leftEdgeCurvature = curvatures[leftStackupKey](MIN_TOLERANCE);
			rightEdgeCurvature = curvatures[rightStackupKey](MAX_TOLERANCE);
			
			
			//adjustments made to align corner moldings in some edge cases
			switch(true){
				case (
					leftStackupKey === stackup.R_CURVE || 
					leftStackupKey === stackup.L_CURVE || 
					leftStackupKey === stackup.CONCAVE ):
					leftCurveAlign = 'calc(-1*var(--moulding-radius))';
					break;

				case (
					leftStackupKey === stackup.J_CURVE || 
					leftStackupKey === stackup.FR_CURVE || 
					leftStackupKey === stackup.CONVEX ):
					leftCurveAlign = 'var(--moulding-radius)';
					break;

				case leftStackupKey === stackup.STRAIGHT:
					leftCurveAlign = '0px';
					break;

				default:
					break;
			}

			switch(true){
				case (
					rightStackupKey === stackup.R_CURVE || 
					rightStackupKey === stackup.L_CURVE || 
					rightStackupKey === stackup.CONVEX ):
					rightCurveAlign = 'var(--moulding-radius)';
					break;

				case (
					rightStackupKey === stackup.J_CURVE || 
					rightStackupKey === stackup.FR_CURVE || 
					rightStackupKey === stackup.CONCAVE ):
					rightCurveAlign = 'calc(-1*var(--moulding-radius))';
					break;

				case rightStackupKey === stackup.STRAIGHT:
					rightCurveAlign = '0px';
					break;

				default:
					break;
			}

			return(
				<React.Fragment>
						<div className={MetricStyles.barGraphContainer_div}>
							<div 
								className={MetricStyles.fitZone_div}
								style={{
									width: `calc(${fitZoneWidth}%  + ${leftCurveAlign} + ${rightCurveAlign})`,
									left: `calc(${fitZonePosition}% - ${leftCurveAlign})`,
								}}>
								<div style={{
									position:'relative',
									width:'100%',
									height:'100%',
								}}> 
									{ leftEdgeCurvature }
									{ rightEdgeCurvature }
								</div>
							</div>
							<div style={{'margin-left':'calc(50% + (' + `${xScale * xOffset}` + '/100) * (var(--x-axis-range) + 1px)/2)'}}>
								<div 
									className={this.props.labelHovered === sourceMetricId ? MetricStyles['graphBar_div--highlight'] : MetricStyles['graphBar_div']} 
									style={{
										'width':`calc((${xScale * Math.abs(this.props.sourceMetrics[sourceMetricId])}/100)*var(--x-axis-range)/2)`
										//'width':`calc((${xScale * Math.abs(this.props.sourceMetrics[sourceMetricId])}/100))`
									}}>
								</div>
							</div>
						</div>
	
					{/*<line 
					x1 = {(ind != 0) ? `${this.props.sourceMetrics[this.props.sourceMetricIds[ind-1]] + pointRadius}%` : 0}
					y1 = {(ind != 0) ? `${( (yOffsetStart*2) + ( (ind - 1) * ( yPercentOffset*2 + pointRadius/2 ) ) )}%` : 0}
					x2 = {(ind != 0) ? `${this.props.sourceMetrics[sourceMetricId]+ pointRadius}%` : 0}
					y2 = {(ind != 0) ? `${( (yOffsetStart*2) + ( (ind) * ( yPercentOffset*2 + pointRadius/2 ) ) )}%` : 0}
					//lineColor = {this.props.lineColor | 'black'}
					stroke = {this.props.lineColor ? this.props.lineColor : '#bcbcbc'}
					stroke-width = "1%"
					/>
					{
						ind !== 0 ? (<circle 
										cx={`${this.props.sourceMetrics[this.props.sourceMetricIds[ind-1]] + pointRadius}%`} 
										cy={`${( (yOffsetStart*2) + ( (ind-1) * ( yPercentOffset*2 + pointRadius/2 ) ) )}%`} 
										r="2%" 
										fill="#fdfdfd" 
										stroke="black" 
										stroke-width="0.5%"
									/>) : null
					}
					{
						ind === (this.props.sourceMetricIds.length-1) ? (<circle 
							cx={`${this.props.sourceMetrics[this.props.sourceMetricIds[ind]] + pointRadius}%`} 
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

		console.log('labelPosMap = ', labelPosMap);
		if(this.props.updateLabelPositions !== null && this.props.updateLabelPositions !== undefined){
			this.props.updateLabelPositions(labelPosMap)
		}else{
			null
		}

		return(
			<div className={MetricStyles.metricGraphBarsContainer_div}>
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
		console.log('this.props.labelToPositionMap = ', this.props.labelToPositionMap)
		console.log('keys of this.props.labelToPositionMap = ', Object.keys(this.props.labelToPositionMap))
		return(
			<div 
				className={MetricStyles.axisLabelUpperBody}
				onMouseLeave={() => this.props._handleOnHover(null)}>
					{
						Object.keys(this.props.labelToPositionMap).map((label, ind) => {
							console.log('label = ', label)
							return(
										<div 
											className={label === this.props.labelHovered ? MetricStyles['labelFormatting_div--hovered'] : MetricStyles['labelFormatting_div']}
											onMouseEnter={() => this.props._handleOnHover(label)}>
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
			labels:{
				upperBody:{},
				lowerBody:{}
			}
		}
		this.projectGraphState = this.projectGraphState.bind(this);
		this.setUpperBodyLabelPosition = this.setUpperBodyLabelPosition.bind(this);
		this.setLowerBodyLabelPosition = this.setLowerBodyLabelPosition.bind(this);
		this.areObjectsDifferent = this.areObjectsDifferent.bind(this);
		this._handleOnHover = this._handleOnHover.bind(this);
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
		if(!(ownerMetricIds.length === 0 && ownerMetrics.constructor === Object) && !(hostMetricIds.length === 0 && hostMetrics.constructor === Object)){
			for(let key of hostMetricIds){
				console.log('ownerMetrics[', key, '] = ', ownerMetrics[key]);
				console.log('hostMetrics[', key, '] = ', hostMetrics[key]);
				let projectedValues = projection(ownerMetrics[key], hostMetrics[key]);
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
		}else{
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
			...prevState,
			labelHovered: label,
		}))
	}

	render(){
		/*
		console.log('ownerMetrics');
		console.log(this.props.ownerMetrics);
		console.log('ownerMetricIds');
		console.log(this.props.ownerMetricIds);
		*/
		//let projectedXCoord = this.projectGraphState(BodyFitProjection);

		//let projectedUpperBodyXCoord = this.projectGraphState(BodyFitProjectionCentered, this.props.ownerUpperBodyMetrics, this.props.hostUpperBodyMetrics);
		//let projectedLowerBodyXCoord = this.projectGraphState(BodyFitProjectionCentered, this.props.ownerLowerBodyMetrics, this.props.hostLowerBodyMetrics);

		let projectedUpperBodyXCoord = this.projectGraphState(BodyFitProjectionOwnerAlign, this.props.ownerUpperBodyMetrics, this.props.hostUpperBodyMetrics);
		let projectedLowerBodyXCoord = this.projectGraphState(BodyFitProjectionOwnerAlign, this.props.ownerLowerBodyMetrics, this.props.hostLowerBodyMetrics);

		let projectedValues = projectedUpperBodyXCoord === null || projectedLowerBodyXCoord === null ?
			({...this.props.ownerUpperBodyMetrics, ...this.props.ownerLowerBodyMetrics}) :
			({...projectedUpperBodyXCoord.hostValues, ...projectedLowerBodyXCoord.hostValues});

		/*console.log('projectedUpperBodyXCoord = ',projectedUpperBodyXCoord)
		console.log('projectedLowerBodyXCoord = ',projectedLowerBodyXCoord)
		console.log('this.props.ownerLowerBodyMetricIds = ', this.props.ownerLowerBodyMetricIds)
		console.log('this.props.hostLowerBodyMetricIds = ', this.props.hostLowerBodyMetricIds)*/
		let yPercentOffset = ( 100 / (2 * this.props.ownerUpperBodyMetricIds.length) );
		let yOffsetStart = 0//( yPercentOffset );
		let pointRadius = '3';
		let absYOffset = (true ? absYOffset = (this.props.ownerUpperBodyMetricIds.length * 13) : 0);

		let yPercentOffsetLow = ( 100 / (2 * this.props.ownerLowerBodyMetricIds.length) );
		let yOffsetStartLow = 0//( yPercentOffset );
		let pointRadiusLow = '3';
		let absYOffsetLow = (true ? absYOffset = (this.props.ownerLowerBodyMetricIds.length * 13) : 0);
		//console.log('this.state.labels.upperBody = ', this.state.labels.upperBody)
		//console.log('this.state.labels.lowerBody = ', this.state.labels.lowerBody)
		return (
			<React.Fragment>	
				<div className={MetricStyles.metricGraphContainer_div}>
					<div id='upperBodySection' style={upperBodySection_div}>
						<div>
							<Labels 
								labelToPositionMap={{...this.state.labels.upperBody, ...this.state.labels.lowerBody}} 
								_handleOnHover={(label, event) => this._handleOnHover(label, event)}
								labelHovered={this.state.labelHovered}/>
							<React.Fragment>
								<MetricGraph 
									sourceMetricIds={[...this.props.ownerUpperBodyMetricIds, ...this.props.ownerLowerBodyMetricIds]} 
									sourceMetrics={ projectedValues }
									updateLabelPositions={this.setUpperBodyLabelPosition}
									labelHovered={this.state.labelHovered}
									tolerances={this.props.tolerances}
									userMetricsDto={this.props.userMetricsDto}
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
										sourceMetricIds={this.props.ownerLowerBodyMetricIds} 
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
	
				<div className={MetricStyles.bodyDiagramContainer_div}>
					<div style={{'height':'100%'}}>
						<BodyDiagram 
							bodyShape={
								this.props.hostBodyShape !== null ? 
									this.props.hostBodyShape : 
									this.props.ownerBodyShape !== null ? 
										this.props.ownerBodyShape : 
										this.props.ownerBodyShape 
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