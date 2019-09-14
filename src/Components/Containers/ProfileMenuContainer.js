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
import ProfileMenu from '../../Components/Presentations/ProfileMenu.js'

//Constants
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

//Third party
import fetch from 'cross-fetch'
import axios from 'axios';



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
	modifyProfile: (profile) => {
		dispatch(modifyProfile(profile))
	},
	postProfile: (profile) => {
		dispatch(postProfile(profile))
	},
	getProfileData: () => {
		fetchEntities(OxiAppConstants.EntityTypes.PROFILE, '', '')
	}
})

const ProfileMenuContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);
export default withRouter(ProfileMenuContainer);