import React from 'react';
import PropTypes from 'prop-types';

import {OxiAppConstants} from '../../Util/OxiAppConstants.js'


export default class ToleranceBoundary extends React.Component{
	constructor(props){
		super(props);

		let { curveRadius } = this.props;
		this.boundaryPath = this.props.isMinTolerance ?  "M 0 100 L 0 0 " : "M 100 100 L 100 0";
		this.curveRD = `q ${curveRadius} 0, ${curveRadius} ${curveRadius}`;
		this.curveDL = `q 0 ${curveRadius}, -${curveRadius} ${curveRadius}`;
		this.curveLD = `q -${curveRadius} 0, -${curveRadius} ${curveRadius}`;
		this.curveDR = `q 0 ${curveRadius}, ${curveRadius} ${curveRadius}`;

		this.constructBoundaryPath = this.constructBoundaryPath.bind(this);
	}

	constructBoundaryPath(){
		{ 
			tolerances, 
			userMetricDtos, 
			souceMetricIds,
			isMinTolerance,
			curveRadius,
			barHieght
		} = this.props;

		let deltaY = barHieght - 2*curveRadius;

		souceMetricIds.map((sourceMetricId, ind, metricList) => {

			var prevToleranceId = undefined;
			var nextToleranceId = undefined;
			var toleranceId = isMinTolerance ? 
				`min${sourceMetricId[0].toUpperCase() + sourceMetricId.slice(1)}` : 
				`max${sourceMetricId[0].toUpperCase() + sourceMetricId.slice(1)}`;
	
			if(ind !== 0){
				//grab the min/max tolerance value from the previous iteration
				prevToleranceId = isMinTolerance ? 
					`min${metricList[ind-1][0].toUpperCase() + metricList[ind-1].slice(1)}` : 
					`max${metricList[ind-1][0].toUpperCase() + metricList[ind-1].slice(1)}`;
			}
			if(ind !== metricList.length - 1){
				//grab the min/max tolerance value from the next iteration
				nextToleranceId = isMinTolerance ? 
					`min${metricList[ind+1][0].toUpperCase() + metricList[ind+1].slice(1)}` :
					`max${metricList[ind+1][0].toUpperCase() + metricList[ind+1].slice(1)}`;
			}

			if(isMinTolerance){
				switch(true){
					//first bar
					case prevToleranceId === undefined:
						this.boundaryPath = 
							`${this.boundaryPath} l 0 
							${100*(5 - Math.abs(tolerances[toleranceId] - userMetricDtos[sourceMetricId])/5) - curveRadius} 
							${this.curveRD} l 0 ${deltaY}`
						break;
					//step down left to right
					case tolerances[toleranceId] > tolerances[prevToleranceId] && tolerances[toleranceId] <  tolerances[nextToleranceId]:
						
					default:
						break;
				}
			}

		})
	}

	render(){
		return(
			<svg version="1.1" viewBox="0 0 195 431.54" xmlns="http://www.w3.org/2000/svg">
			</svg>
		);
	}
}
