import React from 'react';
import MetricStyles from '../../metric.css';
import Metric from './Metric.js'

const metricTitleContainer_div = {
	'height': 'calc(5vh + 28px)',
    'height': '45px',
    'color': 'rgb(115, 115, 115)',
    'margin': '8px 0px 20px 20px',
    'font-size': '3em',
}

const MetricTitle = ({ownerName = '', hostName = ''}) => {
	return (
	    <div style={metricTitleContainer_div}>
	    	<div style={{
				'display': 'inline-block',
    			'vertical-align': 'top',
    			'width': '50px',
	    	}}>
	    		<div style={{
	    			'width': '45px',
    				'height': '45px',
    				'border-style': 'solid',
    				'border-radius': '6px',
    				'border-color': '#70ccf4',
    				'left': '25px',
    			}}>
	    		</div>
	    	</div>
	    	<div style={{
				'display': 'inline-block',
    			'vertical-align': 'top',
    			'margin-left': '10px',
	    	}}>
		    	<div style={{
    				'display': 'inline',
    				'right': '25%',
    				'height': '45px',
    				'font-size': '100%',
    				'vertical-align': 'top',
		    	}}>
		    		{ownerName}
		    	</div>
		    </div>
	    </div>
	);
}

export default MetricTitle;