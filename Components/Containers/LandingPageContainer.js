import { connect } from 'react-redux';
import { 
	setFormVisibility, 
	setWebAppView, 
	fetchEntities, 
	showProfileMenu, 
	createUser, 
	addProfile, 
	modifyProfile, 
	postProfile,
	navigateTo,
	setCreateAccountView
} from '../../Components/Actions/indexActions.js';

import { withRouter } from 'react-router-dom';

//Presentation Components
import LandingPage from '../../Components/Presentations/LandingPage.js'

//Constants
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

//Third party
import fetch from 'cross-fetch'
import axios from 'axios';

const filterProfileFields = (profileById, filter) => {
	if(!(Object.keys(profileById).length === 0 && profileById.constructor === Object)){
		switch(filter){
			case 'female':
				return Object.keys(profile);
			case 'male':
				return Object.keys(profile)
			default:
				return Object.keys(profile).filter(field => field != 'id').filter(field => field != 'height').filter(field => field != 'bodyShape').filter(field => field != 'apparelInterest').filter(field => field != 'username');
		}		
	}
}

const mapStateToProps = (state, props) => {
	return {
		profileMenu : state.landingPage.profileMenu, //TODO: What does this do?
		profile :  state.entitiesReducer.profile.byIds.owner,
		addedProfileId: state.addedEntitiesReducer.profile.allIds[0],
		addedProfile: state.addedEntitiesReducer.profile.byIds[state.addedEntitiesReducer.profile.allIds[0]],//getVisibleProfileFields(state.addEntitiesReducer.profile, 0)
		createAccountView: state.landingPage.createAccountView,
		/*//props passed by React-Router
		match: props.match,
		location: props.location,
		history: props.history,*/
	};
}

const mapDispatchToProps = (dispatch) => ({
	createUser: (email, password, username) => {
		dispatch(createUser(email, password, username));
	},
	modifyProfile: (profile) => {
		dispatch(modifyProfile(profile))
	},
	postProfile: (profile) => {
		dispatch(postProfile(profile))
	},
	navStateToBrowse : (handlePortalSelect, isOwnerProfileEntityPresent) => {
		//location.pathname = "/shop/profile";
		handlePortalSelect(OxiAppConstants.toPortals.consumer);
		dispatch(navigateTo(OxiAppConstants.navRequestMap.home.toLowerCase(), isOwnerProfileEntityPresent));
	},
	navToCreatAccount : (accountType) => {
		dispatch(setCreateAccountView(accountType))
	}
	/*,
	toggleRadio: (bodyShape) => dispatch(selectBodyShape(bodyShape)),
	checkBox: (boxChecked) => dispatch(selectApparelInterest())*/
})

const LandingPageContainer = connect(mapStateToProps, mapDispatchToProps)(LandingPage);
export default withRouter(LandingPageContainer);