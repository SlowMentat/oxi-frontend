import { connect } from 'react-redux';
import { setFormVisibility, setWebAppView, fetchEntities, showProfileMenu, createUser, addProfile } from '../../Components/Actions/indexActions.js';

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

const mapStateToProps = state => {
	return {
		profileMenu : state.landingPage.profileMenu,
		profile: state.addedEntitiesReducer.profile.byIds[state.addedEntitiesReducer.profile.allIds[0]]//getVisibleProfileFields(state.addEntitiesReducer.profile, 0)
	};
}

const mapDispatchToProps = (dispatch, props) => ({
	createProfile: (email, password, username) => {
		dispatch(createUser(email, password, username));
	}/*,
	toggleRadio: (bodyShape) => dispatch(selectBodyShape(bodyShape)),
	checkBox: (boxChecked) => dispatch(selectApparelInterest())*/
})

const LandingPageContainer = connect(mapStateToProps, mapDispatchToProps)(LandingPage);
export default LandingPageContainer;