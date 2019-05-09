import React from 'react';
import MetricStyles from '../../metric.css';
import Metric from './Metric.js';
import {SvgIcon} from '../SvgAssets/SvgIcon.js';

const metricTitleContainer_div = {
	'height': 'calc(5vh + 28px)',
    'height': '45px',
    'color': 'rgb(115, 115, 115)',
    'margin': '10px 0px 80px 20px',
    'font-size': '2em',
}

const MetricTitle = ({ownerName = '', hostName = ''}) => {
	return (
	    <div className={MetricStyles.metricsDataHeader_div}>
	    	<div className={MetricStyles.profilePicContainer_div}>
	    		<div className={MetricStyles.profilePic_div}>
	    		</div>
	    	</div>
	    	<div className={MetricStyles.profileDetails_div}>
		    	<div className={MetricStyles.profileOwnerName_div}>
		    		{ownerName}
		    	</div>
		    	<div className={MetricStyles.followingContainer_div}>
		    		<div className={MetricStyles.followingStats_div}>
		    			<div className={MetricStyles.followingHeader_div}>
		    			Following
		    			</div>
		    			<div className={MetricStyles.followingValue_div}> 
		    			 50M
		    			</div>
		    		</div>
		    		{
		    			ownerName !== hostName ? 
		    				(<div className={MetricStyles.followingBtn_div}>
		    					<SvgIcon name="FollowIcon" stroke='#666' strokeWidth={2} />
		    				</div>) :
		    				null
		    		}
		    	</div>
		    </div>
	    </div>
	);
}

export default MetricTitle;