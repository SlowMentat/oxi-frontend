import { connect } from 'react-redux';
import { 
	/*setFormVisibility, 
	addItem, 
	selectAddedEntity, 
	modifyContent, */
	navigateTo, 
	/*editContentView, 
	disableAddOutfit, 
	removeAddedEntityAndPropogate,
	clearAllAddedEntitiesState,
	clearEdittingI,
	addToEdittingI,
	replaceEdittingI,
	clearEdittingIds,
	addToEdittingIds,
	replaceEdittingIds,
	disableAddContentButton,
	clearClientInvalidation,
	clearSelectMultipleEntity,
	fetchSuggestion*/
} from '../../Components/Actions/indexActions.js';
import LoginForm from '../../Components/Presentations/LoginForm.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';

import { withRouter } from 'react-router-dom';

const requestToBatchedDispatchMap = {
	outfits: {
		get: (dispatch) => {
			//navigate to browse
			dispatch(navigateTo(OxiAppConstants.navRequestMap.a.toLowerCase()));
		},
	}
};

const mapStateToProps = (state, props) => {

	return {
		login: 'username',
		credentials: 'password',
		serviceURL: OxiAppConstants.serviceURL,
		requestUrl: state.toggleModal.prevRequestUrl,
		requestType: state.toggleModal.prevRequestType,
		requestedNav : state.requestedNavigation.location,
	};
}

const mapDispatchToProps = (dispatch) => ({
		afterLoginSuccess:  (requestUrl, requestType) => {
			if(requestUrl !== null && requestUrl !== undefined && requestUrl !== ''){
				requestToBatchedDispatchMap[requestUrl.replace(OxiAppConstants.serviceURL+'/', "").split('?')[0]][requestType](dispatch);
			}
			else{
				//redirected to login from verification email.  Navigate to Measurmeents to complete profile.
				dispatch(navigateTo(OxiAppConstants.navRequestMap.c.toLowerCase()));
			}
		}
})

const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);
export default withRouter(LoginFormContainer);