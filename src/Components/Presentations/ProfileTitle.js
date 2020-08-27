import React from 'react';
import MetricStyles from '../../metric.scss';
import Metric from './Metric.js';
import {SvgIcon} from '../SvgAssets/SvgIcon.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import { getImageURL } from '../../Util/Misc.js';
import Styles from '../../root.scss';

const metricTitleContainer_div = {
	'height': 'calc(5vh + 28px)',
    'height': '45px',
    'color': 'rgb(115, 115, 115)',
    'margin': '10px 0px 80px 20px',
    'font-size': '2em',
}

const defaultPpIconStyles = {
	'border-width': '0px',
}

const ligatureStyles = {};

export const PpIcon = (props) => {
	const {
		base64Image,
		isMobile,
		customStyle,
		customDefaultStyle,
		onClick,
		imageName,
	} = props;

	return(
		imageName ?
			(<img 
				//src={base64Image === null ? (OxiAppConstants.ContentDirectories.IMAGES + "/no_image.svg") : (base64Image) }
				src={getImageURL(imageName)}
				className={Styles.ppIcon_img}
				style={{
					'width': 'calc(100%)',
    				'height': 'calc(100%)',
    				'border-radius': '48px',
    				'cursor':'pointer',
    				//'padding-top': '2px',
    				//'padding-left': '2px',
    				//'border-radius':'calc(var(--default-pic-icon-size)/2)',
    				...customStyle,
				}}
				onClick={(e) => {
					e.stopPropagation();
					onClick ? onClick(e) : null;
				}}
			/>) :
			(<i 
				class="material-icons" 
				style={customDefaultStyle 
					//isMobile ? 
					//isDevice ?
					//	({
					//		'font-size':'7.2rem', 
        			//		'border':'solid 5px #f9f9f9',
        			//		//'color':'var(--color-01-tint-02)',
        			//		'background-color': '#f9f9f9',
    				//		color: 'var(--color-01-tint-02)',
					//	}) : 
					//	({ 
					//		'background-color':'#f9f9f9', 
					//		'font-size':'4.8rem', 
					//		//'color': 'var(--color-mobile-icon-bg)',
					//		//'background-color': 'var(--color-01-tint-01)',
        			//		'background-color': '#f9f9f9',
    				//		color: 'var(--color-01-tint-02)',
					//		...customDefaultStyle, 
					//	}) 
				}
				onClick={(e) => {
					e.stopPropagation();
					onClick ? onClick(e) : null;
				}}
			> 
				account_circle 
			</i>)
	);
}

class ProfileTitle extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			//base64Image: null,
		};

		//this._handleImageReceived = this._handleImageReceived.bind(this);
	}
	/*
	componentDidMount(){
		//if coverpic filename exists, call get request for content coverpic data
		console.log("small = ", this.props.ownerpicuri)
		if(this.props.ownerpicuri !== null  && this.props.ownerpicuri !== undefined) this.props.getCoverPic(this.props.ownerpicuri, this._handleImageReceived, 'small');
	}

	componentDidUpdate(prevProps){
		if(this.props.ownerpicuri !== prevProps.ownerpicuri){
			this.props.getCoverPic(this.props.ownerpicuri, this._handleImageReceived, 'small');
		}
	}

	_handleImageReceived(event, data){
		this.setState({
			base64Image: 'data:image/jpeg;base64,' + data
		});
	}*/

	render(){
		//methods
		const {
			openProfilePicForm
		} = this.props;
	
		//variables
		const {
			ownerName,
			hostName,
			isMobile,
			webAppView,
			location,
			//ownerpicuri,
			base64Image,
			imageName,
			style,
		} = this.props;

		const customStyle = {
			'font-size':'calc(var(--details-container-height))',
			color: 'var(--color-01-tint-02)',
			'background-color': 'none',
			border: 'solid 0px #FFF',
		}

		const customDefaultStyle = {
			...customStyle
		}
	
		const pathArray = location.pathname.split('/');
		var name = 'unknown';
		var URI = pathArray[pathArray.length - 1];

		var props = {
			//base64Image,
			imageName,
			isMobile,
			customStyle,
			customDefaultStyle,
			onClick: (e) => openProfilePicForm(),
		}
	
		if(webAppView === OxiAppConstants.navRequestMap.b.toLowerCase() && URI){
			name = URI;
		}else{
			name = ownerName;
		}
	
		return (
			<div 
				className={MetricStyles.metricsDataHeader_div}
				style={style}
			>
				<div className={MetricStyles.profilePicContainer_div}>
					<div 
						className={MetricStyles.profilePic_div}
					>
						<PpIcon 
							{...props}
							/*base64Image={base64Image} 
							isMobile={isMobile} 
							customStyle={customStyle}
							customDefaultStyle={customDefaultStyle}
							onClick={(e) => {
								//dispatch ProfilePic form
								openProfilePicForm();
							}}*/
						/>
						{/*
							base64Image ?
								(<img 
									src={base64Image === null ? (OxiAppConstants.ContentDirectories.IMAGES + "/no_image.svg") : (base64Image) }
									style={{
										'width': 'calc(100% - 2px)',
    									'height': 'calc(100% - 2px)',
    									'border-radius': '24px',
    									'padding-top': '2px',
    									'padding-left': '2px',
									}}
								/>) :
								(<i class="material-icons" style={ isMobile ? ({'font-size':'48px', 'color':'#ffffff5c'}) : ({'font-size':'48px', 'color': 'var(--color-mobile-icon-bg)'}) }> account_circle </i>)
						*/}
		    		</div>
		    	</div>
		    	<div className={MetricStyles.profileDetails_div}>
			    	<div className={MetricStyles.profileOwnerName_div}>
			    		{name}
			    	</div>
			    	<div className={MetricStyles.followingContainer_div}>
			    		<div className={MetricStyles.followingStats_div}>
			    			<div className={MetricStyles.followingValue_div}> 
			    			 50M
			    			</div>
			    			<div className={MetricStyles.followingIcon_div}>
			    				<i class="material-icons" style={ligatureStyles}> group </i>
			    			</div>
			    		</div>
			    		{
			    			ownerName !== hostName ? 
			    				(<div className={MetricStyles.followingBtn_div}>
			    					
			    					{/*<SvgIcon name="FollowIcon" stroke='#666' strokeWidth={2} />*/}
			    				</div>) :
			    				null
			    		}
			    	</div>
			    </div>
		    </div>
		);
	}
}

export default ProfileTitle;