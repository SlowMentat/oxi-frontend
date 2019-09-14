import { connect } from 'react-redux';
import { 
	setFormVisibility, 
	setWebAppView, 
	fetchEntities, 
	replaceProfile, 
	navigateTo,
	removeAllEntities,
	selectEntity,
	getSavedItems,
	unsetPreviewFocus,
	setPreviewFocus,
} from '../../Components/Actions/indexActions.js';
import {OxiAppConstants} from '../../Util/OxiAppConstants.js';
import WebAppView from '../../Components/Presentations/WebAppView.js';
import fetch from 'cross-fetch'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, props ) => {
	return {
		webAppView: state.appView.webAppView,
		browseSelection: state.browseState.browseSelection,
		viewState: state.contentViewState.viewState,
		isFocusedPreview: state.contentViewState.isFocusedPreview,
		/*hostProfile: state.entitiesReducer.profile.byIds.host,*/
		owner: state.entitiesReducer.profile.byIds.owner,
		formType: state.toggleModal.modal,
		requestUrl: state.toggleModal.prevRequestUrl,
		requestType: state.toggleModal.prevRequestType,
		savedItemMap: state.cache.savedItemMap,
		buttonDisabled: state.buttonState.addOutfit.disabled,


		//Router location state
  		pathname: state.router.location.pathname,
  		search: state.router.location.search,
  		hash: state.router.location.hash,		
	};
}

const mapDispatchToProps = (dispatch, props) => ({
	getSavedItems : () => dispatch(getSavedItems()),
	navEventCallbacks : {
		//Browse
		a : (isOwnerProfileEntityPresent) => {
			dispatch(navigateTo(OxiAppConstants.navRequestMap.a.toLowerCase(), isOwnerProfileEntityPresent));
		},
		//Profil e
		b : (profileId) => {
			dispatch(navigateTo(OxiAppConstants.navRequestMap.b.toLowerCase()));
		},
		//Fitting
		c : (isOwnerProfileEntityPresent) => {
			dispatch(navigateTo(OxiAppConstants.navRequestMap.c.toLowerCase(), isOwnerProfileEntityPresent));
		},
		search : () => {
			dispatch(setWebAppView("search"))
		},
		logout : () => {
			axios.post(OxiAppConstants.apiBaseURL + '/logout', null, {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'conentType': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			})
		}
	},
	setPreviewFocus: () => dispatch(setPreviewFocus()),
	unsetPreviewFocus: () => dispatch(unsetPreviewFocus()),
})

const AppView = connect(mapStateToProps, mapDispatchToProps)(WebAppView);
export default withRouter(AppView);