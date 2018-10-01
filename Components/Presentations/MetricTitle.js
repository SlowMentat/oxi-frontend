import React from 'react';
import MetricStyles from '../../metric.css';
import Metric from './Metric.js'

const MetricTitle = ({ownerName = '', hostName = ''}) => {
	return (
	    <div style={{'height':'calc(5vh + 28px)', 'text-align':'center', 'color':'#737373', 'padding-top':'15px', 'font-size':'3em'}}>
		    {ownerName}
	    </div>
	);
}

export default MetricTitle;