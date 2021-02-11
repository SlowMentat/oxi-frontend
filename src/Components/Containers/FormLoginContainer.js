import { connect } from 'react-redux';
import { 
	/*
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
import FormLogin from '../../Components/Presentations/FormLogin.js';
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

const mapStateToProps = (state, ownProps) => {
	console.log('ownProps = ', ownProps);
	return {
		login: 'username',
		credentials: 'password',
		serviceURL: OxiAppConstants.serviceURL,
		//requestUrl: state.toggleModal.prevRequestUrl || ownProps.requestUrl,
		//requestType: state.toggleModal.prevRequestType || ownProps.requestType,
		requestUrl: state.modalsReducer.byIds[OxiAppConstants.FormType.LOGIN].prevRequestUrl || ownProps.requestUrl,
		requestType: state.modalsReducer.byIds[OxiAppConstants.FormType.LOGIN].prevRequestType || ownProps.requestType,
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
				dispatch(navigateTo(OxiAppConstants.navRequestMap.a.toLowerCase()));
			}
		},
})

/*const mergeProps = (stateProps, dispatchProps, ownProps) => {
	return {
		...stateProps,
		...dispatchProps,
		...ownProps,
	}
}*/

const FormLoginContainer = connect(mapStateToProps, mapDispatchToProps)(FormLogin);
export default withRouter(FormLoginContainer);