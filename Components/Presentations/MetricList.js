import React from 'react';
import PropTypes from 'prop-types';
import MetricStyles from '../../metric.css';
import Metric from './Metric.js';
import BodyDiagram from './BodyDiagram.js';

import { TransitionGroup, CSSTransition } from 'react-transition-group';




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
	let hostAdjX = ((hostX - ownerX));
	console.log('hostAdjX', hostAdjX);
	return({
		'ownerValue': 0,
		'hostValue': hostAdjX
	});
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

		let labelPosMap = {};

		let output = this.props.sourceMetricIds.map((sourceMetricId, ind, metricList) => {
			console.log('ind = ', ind)
			console.log('yPercentOffset = ', yPercentOffset)
			console.log('yOffsetStart = ', yOffsetStart)
			console.log('sourceMetricIds = ', this.props.sourceMetricIds)
			console.log('sourceMetrics = ', this.props.sourceMetrics)
			console.log('x1:  this.props.sourceMetrics[sourceMetricIds[ind-1]] = ', this.props.sourceMetrics[this.props.sourceMetricIds[ind-1]])
			console.log('x2:  this.props.sourceMetrics[sourceMetricId] = ', this.props.sourceMetrics[sourceMetricId])
			//let labelPosYCss = `calc((${( yOffsetStart + ( ind * ( yPercentOffset )))} / 100) * (100vh))`
			let labelPosYCss = `${( (yOffsetStart*2) + ( (ind) * ( yPercentOffset*2) ) )}%`;
			labelPosMap[sourceMetricId] = labelPosYCss;


			let xScale = 1.65;
			let xOffset = this.props.sourceMetrics[sourceMetricId] >= 0 ? 0 : this.props.sourceMetrics[sourceMetricId];
			return(
				<React.Fragment>
						<div className={MetricStyles.barGraphContainer_div}>
							<div style={{'margin-left':'calc(50% + (' + `${xScale * xOffset}` + '/100)*(300px - 13vh - 31px)/2)'}}>
								<div 
									className={this.props.labelHovered === sourceMetricId ? MetricStyles['graphBar_div--highlight'] : MetricStyles['graphBar_div']} 
									style={{'width':'calc((' + `${xScale * Math.abs(this.props.sourceMetrics[sourceMetricId])}` + '/100)*(300px - 13vh - 30px)/2)'}}>
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
		console.log('this.state.labels.upperBody = ', this.state.labels.upperBody)
		console.log('this.state.labels.lowerBody = ', this.state.labels.lowerBody)
		return (
			<React.Fragment>	
				<div className={MetricStyles.metricGraphContainer_div}>
					<div id='upperBodySection' style={upperBodySection_div}>
						<div>
							<Labels 
								labelToPositionMap={this.state.labels.upperBody} 
								_handleOnHover={(label, event) => this._handleOnHover(label, event)}
								labelHovered={this.state.labelHovered}/>
							<React.Fragment>
								<MetricGraph 
									sourceMetricIds={this.props.ownerUpperBodyMetricIds} 
									sourceMetrics={projectedUpperBodyXCoord === null ? this.props.ownerUpperBodyMetrics : projectedUpperBodyXCoord.hostValues} 
									updateLabelPositions={this.setUpperBodyLabelPosition}
									labelHovered={this.state.labelHovered}
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
					<div id='lowerBodySection' style={upperBodySection_div}>
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
								/>
								{/*<MetricGraph 
									sourceMetricIds={this.props.hostLowerBodyMetricIds} 
									sourceMetrics={projectedLowerBodyXCoord === null ? this.props.hostLowerBodyMetrics : projectedLowerBodyXCoord.hostValues} 
									host={true} 
									lineColor="#212121"
									updateLabelPositions={null}
								/>*/}
							</React.Fragment>
						</div>
					</div>
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