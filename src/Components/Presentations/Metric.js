import React from 'react';
import MetricStyles from '../../metric.scss';
import {OxiAppConstants} from  '../../Util/OxiAppConstants.js'



export class Metric extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		//console.log(this.props.value);
		//console.log(this.props.yAdjust);
		//console.log(`calc((${this.props.yPercentOffset} / 100) * (100vh - 80px - 40px) - ${this.props.yAdjust}px)`);
		let cssTopOffset = `calc((${this.props.yPercentOffset} / 100) * (100vh) - ${this.props.yAdjust}px - ${this.props.absYOffset}px)`
		this.props.bufferToMap !== null ? this.props.bufferToMap(this.props.id, cssTopOffset) : null
		return(	
			<div 
				className={MetricStyles.metricNodeBlock} 
				style={{
					//'height':`${this.props.pointRadius*2}%`,
					'width': `${this.props.pointRadius*2}%`,
					'left':`calc(${this.props.value}% - 3px)`, 
					'top':`calc((${this.props.yPercentOffset} / 100) * (100vh - 80px - 40px - 5vh - 28px) - ${this.props.yAdjust}px - ${this.props.absYOffset}px)`
				}}
			>
	    		<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{'height':'100%', 'width':'100%'}}>	
					<circle cx="50" cy="50" r="40" fill="#fdfdfd" stroke="black" stroke-width="15px"/>	
				</svg>	
			</div>
		);
	}
}

export default Metric;