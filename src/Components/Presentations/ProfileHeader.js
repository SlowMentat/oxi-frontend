import React from 'react';
import OutfitStyles from '../../outfit.scss';
import outfitCoverBtnStyle from '../../makeOutfitCoverBtn.css';
import Styles from '../../root.scss';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import { SvgIcon } from '../SvgAssets/SvgIcon.js';
import ProfileTitleContainer from '../../Components/Containers/ProfileTitleContainer.js';
import { PpIcon } from '../../Components/Presentations/ProfileTitle.js';


//const container1_div = {
//	'height': '100%',
//    'padding-left': '200px',
//    'padding-right': '200px',	
//}
//
//const container2_div = {
//	'width': '900px',
//    'margin': 'auto',
//    'height': '100%',
//}

export default class ProfileHeader extends React.Component{
	constructor(props){
		super(props);

		var {
			coverpic,
		} = props;

		this.state = {
			base64Image: null,
		};

		this._handleImageReceived = this._handleImageReceived.bind(this);
		this.getProfileData = this.getProfileData.bind(this);
		this.getCoverpicFromUri = this.getCoverpicFromUri.bind(this);
	}	

	async componentDidMount(){		
		const doesUriExist = (uri) => (uri !== null && uri !== undefined);
		await this.getCoverpicFromUri((uri) => doesUriExist(uri));
	}

	async componentDidUpdate(prevProps){
		const {
			profile,
			username,
		} = prevProps;

		var {
			stats,
			picture,
		} = profile ? this.getProfileData(profile.owner, profile.host, username) : null;

		var prevCoverpicuri = picture ? picture.smalluri : null;		
		const checkDifference = (curVar, prevVar) => (curVar !== prevVar);
		await this.getCoverpicFromUri((curVar) => checkDifference(curVar, prevCoverpicuri));
	}

	_handleImageReceived(event, coverpicData){
		this.setState(prevState => ({
			...prevState,
			base64Image: coverpicData ? ('data:image/jpeg;base64,' + coverpicData) : prevState.base64Image,
		}));
	}

	async getCoverpicFromUri(shouldGetCoverpic){
		// Methods
		const {
			getCoverPic,
		} = this.props;

		// Variables
		const {
			profile,
		} = this.props;

		const {
			owner,
			host,
		} = profile ? profile : ({});

		var {
			stats,
			picture,
		} = this.getProfileData(owner, host);

		//const coverpicuri = owner.pictureDto ? owner.pictureDto.smalluri : null;
		const coverpicuri = picture ? picture.smalluri : null;
		var profilePicData = null;
		var coverpicData = null

		const updateCoverpicData = (event, data) => {coverpicData = data;}

		if(shouldGetCoverpic(coverpicuri)) await getCoverPic(coverpicuri, updateCoverpicData, 'small');

		if(coverpicData) this._handleImageReceived(null, coverpicData);
	}

	// Username parameter is for update events, where the callee can passe prevProps.username
	// Otherwise username is used form current props.
	getProfileData(owner, host, username){
		
		username = username ? username : this.props.username;
		var stats = {};
		var picture = {};
		//var username = null;
		var result = {stats, picture};

		const getStats = (stats) => (stats ? stats : ({}));
		const getPicture = (picture) => (picture ? picture : ({}));

		const getProfileProperties = (target) => {
			var stats = getStats(target.profileStatsDto);
			var picture = getPicture(target.pictureDto);

			return ({stats, picture});
		}

		// Extract stats object either from owner or host profiles.

		// Owner profile selected via outfit tile in browse viestate
		if(owner && owner.username === username){
			result = getProfileProperties(owner);
		}
		// Host profile selected via outfit tile in brows viewstate
		else if(host && host.username === username){
			result = getProfileProperties(host);
		}
		// Owner profile is selected via Profile navigation tab 
		else if(owner){
			result = getProfileProperties(owner);
		}
		else{
			// Illegal state
			console.log('Illegal data received by profile header');
		}

		return ({ ...result });
	}

	render(){

		const {
			base64Image,
		} = this.state;

		const {
			profile,
			isProfileView,
			username,		// The username of the selected profile (taken from the URI)
		} = this.props;

		const {
			owner,
			host,
		} = profile ? profile : ({});

		var {
			stats,
			picture,
		} = this.getProfileData(owner, host);

		const ppIconStyle = {
			'font-size':'var(--icon-width)',
			color: 'var(--color-01-tint-02)',
			'background-color':'#f9f9f9',
			'border-radius': 'calc(var(--icon-width)/2)',
			height:'100%',
			width:'100%',
			'border-color': 'var(--color-desktop-01)',
			'cursor':'unset',
		}

		const ppIconDefaultStyle = {
			...ppIconStyle,
		}

		return(
			<div className={OutfitStyles.outfitMenuHeader_div} style={isProfileView ? ({}) : ({display:'none', left: '-100vw'})}>
				<div className={OutfitStyles.profileStatsContainer_div}>
					<div className={OutfitStyles.profileIcon_div}>
						<PpIcon 
							base64Image={base64Image} 
							//isMobile={isMobile} 
							customStyle={ppIconStyle}
							customDefaultStyle={ppIconDefaultStyle}
							onClick={(e) => {
							}}
						/>
					</div>
					<div className={OutfitStyles.profileStats_div}>
						<div className={OutfitStyles.statUsername_div}>
							<span className={OutfitStyles.statUsername_span}>
								{ username }
							</span>
						</div>
						<div className={OutfitStyles.statCommonVal_span} style={{'margin-left':'4px'}}>
							{
								Object.keys(stats).map(key => (
									key === 'lastUpdated' || key === 'id' ? 
									(null) :
									(<div className={OutfitStyles.statCommon_div}>
										<span className={OutfitStyles.statCommon_span}>
											 { key }
										</span>
										<span className={OutfitStyles.statCommonVal_span}>
											{ stats[key] }
										</span>
									</div>)
								))
							}
						</div>
					</div>
				</div>
				<div style={{
					height: 'calc(100% - var(--icon-width) - 5px)',
					'padding-left': 'calc(var(--icon-width) + 24px)',
				}}>

				</div>
			</div>
		);
	}
}